// Headless tests: everything that can be checked without a DOM.
//
//   node --test test/            (from this folder's parent)
//
// The dialog itself is verified by opening demo/index.html — see
// docs/EXTENDING.md. What is covered here is the part that silently rots:
// the accept grammar, the metadata conventions, the path boundary, and the
// full open/save/metadata round trip through a provider.

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  compileAccept, categoryOf, registerCategory, listCategories, isTextual,
} from '../src/categories.js';
import {
  normalizeSchema, coerceValue, validateValues, resolveMetadataConfig,
  DCSPAD_METADATA_FIELDS, fieldTarget, emptyValue,
} from '../src/metadata.js';
import {
  normalizePath, parentPath, joinPath, isWithin, fileNameProblem, formatBytes,
} from '../src/util/paths.js';
import {
  sharePointProvider, resolveSharePointContext, findSharePointContext, directUrlForPath,
  toFormValue, fromItemValue, neutralTypeFor,
} from '../src/providers/sharepoint.js';
import { memoryProvider } from '../src/providers/memory.js';
import {
  createFileBroker, localProvider as publicLocalProvider,
  sharePointProvider as publicSharePointProvider, loadSiteCatalog as publicLoadSiteCatalog,
  resolveSharePointContext as publicResolveSharePointContext,
  findSharePointContext as publicFindSharePointContext,
} from '../src/file-broker.js';
import { defineProvider } from '../src/provider.js';
import { normalizeSiteCatalog, loadSiteCatalog } from '../src/site-catalog.js';
import { createRecall, createMemoryStore, createLocalStore } from '../src/storage.js';
import { FILE_BROKER_THEMES } from '../src/styles.js';

// ---------------------------------------------------------------- categories

test('categories: the requested set is present and classifies files', () => {
  const ids = listCategories().map((c) => c.id);
  for (const id of ['web', 'office', 'text', 'data', 'code', 'image', 'video', 'audio']) {
    assert.ok(ids.includes(id), `missing category ${id}`);
  }
  assert.equal(categoryOf('index.html'), 'web');
  assert.equal(categoryOf('theme.css'), 'web');
  assert.equal(categoryOf('report.docx'), 'office');
  assert.equal(categoryOf('notes.md'), 'text');
  assert.equal(categoryOf('rows.csv'), 'data');
  assert.equal(categoryOf('main.ts'), 'code');
  assert.equal(categoryOf('photo.JPEG'), 'image');
  assert.equal(categoryOf('clip.mp4'), 'video');
  assert.equal(categoryOf('take.wav'), 'audio');
  assert.equal(categoryOf('mystery'), '');
});

test('accept: categories, extensions, mime, wildcards and predicates', () => {
  const data = compileAccept(['data']);
  assert.ok(data.matches({ name: 'rows.csv' }));
  assert.ok(data.matches({ name: 'payload.json' }));
  assert.ok(!data.matches({ name: 'photo.png' }));
  assert.ok(data.attribute.includes('.csv'));

  const ext = compileAccept(['.md', 'txt']);
  assert.ok(ext.matches({ name: 'readme.md' }));
  assert.ok(ext.matches({ name: 'notes.txt' }));
  assert.ok(!ext.matches({ name: 'notes.rtf' }));

  const mime = compileAccept(['image/*', 'text/csv']);
  assert.ok(mime.matches({ name: 'a.png', mimeType: 'image/png' }));
  assert.ok(mime.matches({ name: 'b.csv', mimeType: 'text/csv' }));
  assert.ok(!mime.matches({ name: 'c.mp4', mimeType: 'video/mp4' }));

  const custom = compileAccept([(entry) => entry.name.startsWith('draft-')]);
  assert.ok(custom.matches({ name: 'draft-1.txt' }));
  assert.ok(!custom.matches({ name: 'final.txt' }));

  const any = compileAccept();
  assert.ok(any.isAny);
  assert.ok(any.matches({ name: 'whatever.xyz' }));
  assert.equal(any.attribute, '');

  // An unknown token must not silently widen the filter.
  assert.ok(!compileAccept(['nonsense-category']).matches({ name: 'a.txt' }));
});

test('accept: mixed rules union, and describe() reads like a sentence fragment', () => {
  const accept = compileAccept(['web', '.json']);
  assert.ok(accept.matches({ name: 'page.html' }));
  assert.ok(accept.matches({ name: 'data.json' }));
  assert.ok(!accept.matches({ name: 'song.mp3' }));
  assert.equal(accept.describe(), 'Web code, .json');
});

test('categories: registerCategory extends the vocabulary', () => {
  registerCategory({ id: 'cad', label: 'CAD', extensions: ['dwg', 'dxf'] });
  assert.equal(categoryOf('plan.dwg'), 'cad');
  assert.ok(compileAccept(['cad']).matches({ name: 'plan.dxf' }));
});

test('isTextual reflects what can be read as text', () => {
  assert.ok(isTextual('a.md') && isTextual('b.json') && isTextual('c.js') && isTextual('d.html'));
  assert.ok(!isTextual('e.png') && !isTextual('f.mp4') && !isTextual('g.xlsx'));
});

// ------------------------------------------------------------------ metadata

test('metadata: schema normalization and per-provider targets', () => {
  const schema = normalizeSchema([
    { key: 'title', label: 'Title', name: 'Title' },
    { key: 'description', type: 'multiline', target: { sharepoint: '_ExtendedDescription' } },
    { key: 'weird', type: 'nonsense' },
  ]);
  assert.equal(schema[0].type, 'text');
  assert.equal(fieldTarget(schema[0], 'sharepoint'), 'Title');
  assert.equal(fieldTarget(schema[1], 'sharepoint'), '_ExtendedDescription');
  assert.equal(fieldTarget(schema[1], 'memory'), 'description');
  assert.equal(schema[2].type, 'text', 'an unknown type falls back to text');
  assert.throws(() => normalizeSchema([{ label: 'no key' }]), /needs a key/);
});

test('metadata: values coerce from whatever the caller passed', () => {
  const [text, tags, flag, link] = normalizeSchema([
    { key: 'a', type: 'text' },
    { key: 'b', type: 'tags' },
    { key: 'c', type: 'boolean' },
    { key: 'd', type: 'url' },
  ]);
  assert.equal(coerceValue(text, 42), '42');
  assert.deepEqual(coerceValue(tags, 'one, two;three'), ['one', 'two', 'three']);
  assert.deepEqual(coerceValue(tags, ['x']), ['x']);
  assert.equal(coerceValue(flag, 'yes'), true);
  assert.deepEqual(coerceValue(link, 'https://x.test'), { url: 'https://x.test', description: '' });
  assert.deepEqual(coerceValue(text, undefined), emptyValue(text));
});

test('metadata: validation catches what is knowable before a round trip', () => {
  const schema = normalizeSchema([
    { key: 'title', label: 'Title', required: true },
    { key: 'count', label: 'Count', type: 'number' },
    { key: 'when', label: 'When', type: 'date' },
    { key: 'link', label: 'Link', type: 'url' },
  ]);
  const errors = validateValues(schema, {
    title: '   ', count: 'abc', when: 'not-a-date', link: { url: 'nope' },
  });
  assert.equal(Object.keys(errors).length, 4);
  assert.match(errors.title, /required/);
  assert.deepEqual(validateValues(schema, {
    title: 'ok', count: '12', when: '2026-01-01T09:00', link: { url: 'https://x.test' },
  }), {});
});

test('metadata: config resolves from array, object and async function', async () => {
  assert.equal((await resolveMetadataConfig(undefined)).enabled, false);

  const fromArray = await resolveMetadataConfig(DCSPAD_METADATA_FIELDS);
  assert.equal(fromArray.enabled, true);
  assert.equal(fromArray.mode, 'declared');
  assert.deepEqual(fromArray.schema.map((f) => f.key), ['title', 'description', 'docVersion']);

  const discover = await resolveMetadataConfig({ fields: [{ key: 'title' }], mode: 'discover' });
  assert.equal(discover.mode, 'discover');

  // The seam a future "let the user choose columns" UI plugs into.
  const computed = await resolveMetadataConfig(
    async (context) => [{ key: context.mode === 'save' ? 'saved' : 'opened' }],
    { mode: 'save' },
  );
  assert.equal(computed.schema[0].key, 'saved');
});

// --------------------------------------------------------- SharePoint values

test('sharepoint: neutral types map from TypeAsString', () => {
  assert.equal(neutralTypeFor('Text'), 'text');
  assert.equal(neutralTypeFor('Note'), 'multiline');
  assert.equal(neutralTypeFor('MultiChoice'), 'multichoice');
  assert.equal(neutralTypeFor('Currency'), 'number');
  assert.equal(neutralTypeFor('DateTime'), 'date');
  assert.equal(neutralTypeFor('User'), '', 'user fields are not writable in v1');
});

test('sharepoint: FieldValue conventions round-trip', () => {
  const [text, multi, flag, num, date, url] = normalizeSchema([
    { key: 'a', type: 'text' },
    { key: 'b', type: 'multichoice' },
    { key: 'c', type: 'boolean' },
    { key: 'd', type: 'number' },
    { key: 'e', type: 'date' },
    { key: 'f', type: 'url' },
  ]);
  assert.equal(toFormValue(text, 'hello'), 'hello');
  assert.equal(toFormValue(text, ''), '');
  assert.equal(toFormValue(multi, ['A', 'B']), ';#A;#B;#');
  assert.equal(toFormValue(multi, []), '');
  assert.equal(toFormValue(flag, true), '1');
  assert.equal(toFormValue(flag, false), '0');
  assert.equal(toFormValue(num, '1,5'), '1.5');
  assert.equal(toFormValue(num, ''), '');
  assert.equal(toFormValue(date, '2026-03-04T05:06Z'), new Date('2026-03-04T05:06Z').toISOString());
  assert.equal(toFormValue(url, { url: 'https://x.test', description: 'X' }), 'https://x.test, X');
  assert.equal(toFormValue(url, { url: '', description: 'X' }), '');

  assert.deepEqual(fromItemValue(multi, ';#A;#B;#'), ['A', 'B']);
  assert.deepEqual(fromItemValue(multi, { results: ['A'] }), ['A']);
  assert.equal(fromItemValue(flag, 1), true);
  assert.equal(fromItemValue(num, null), '');
  assert.deepEqual(fromItemValue(url, { Url: 'https://x.test', Description: 'X' }),
    { url: 'https://x.test', description: 'X' });
  assert.match(fromItemValue(date, '2026-03-04T05:06:00Z'), /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
});

test('sharepoint: context resolution covers legacy, module-loader, and relative shapes', () => {
  const legacy = resolveSharePointContext({
    legacyPageContext: {
      webAbsoluteUrl: 'https://contoso.sharepoint.com/sites/Legacy/',
      formDigestValue: 'legacy-digest',
      formDigestTimeoutSeconds: 900,
    },
  });
  assert.deepEqual(legacy, {
    webAbsoluteUrl: 'https://contoso.sharepoint.com/sites/Legacy',
    formDigestValue: 'legacy-digest',
    formDigestTimeoutSeconds: 900,
  });

  const modern = resolveSharePointContext({
    pageContext: { web: { absoluteUrl: 'https://contoso.sharepoint.com/sites/Modern' } },
  });
  assert.equal(modern.webAbsoluteUrl, 'https://contoso.sharepoint.com/sites/Modern');

  const fallback = resolveSharePointContext({
    webAbsoluteUrl: 'not a URL',
    legacyPageContext: { webAbsoluteUrl: 'https://contoso.sharepoint.com/sites/Fallback' },
  });
  assert.equal(fallback.webAbsoluteUrl, 'https://contoso.sharepoint.com/sites/Fallback');

  const relative = resolveSharePointContext(
    { webServerRelativeUrl: '/sites/Relative' },
    { location: { origin: 'https://contoso.sharepoint.com' } },
  );
  assert.equal(relative.webAbsoluteUrl, 'https://contoso.sharepoint.com/sites/Relative');

  const provider = sharePointProvider({
    getContext: () => ({ legacyPageContext: { webAbsoluteUrl: legacy.webAbsoluteUrl } }),
    webUrl: '/sites/Pinned',
  });
  assert.equal(provider.isAvailable(), true);
  assert.equal(provider.locator.current(), 'https://contoso.sharepoint.com/sites/Pinned');
});

test('sharepoint: context inspection and absence fail gracefully', () => {
  assert.equal(resolveSharePointContext({ webAbsoluteUrl: 'javascript:alert(1)' }), null);
  assert.equal(resolveSharePointContext({}), null);
  const provider = sharePointProvider({ getContext() { throw new Error('host denied access'); } });
  assert.equal(provider.isAvailable(), false);
  assert.throws(() => provider.locator.current(), (error) => error.code === 'not-available');
  assert.equal(sharePointProvider({ webUrl: 'javascript:alert(1)' }).isAvailable(), false);
});

test('sharepoint: page context finder probes DCS globals and same-origin ancestors safely', () => {
  const origin = 'https://contoso.sharepoint.com';
  const stable = findSharePointContext({
    location: { origin },
    __DCS_SP_CONTEXT__: { webAbsoluteUrl: `${origin}/sites/Stable` },
    __DCSPAD_SP_CONTEXT__: { webAbsoluteUrl: `${origin}/sites/Compatibility` },
  });
  assert.equal(stable.webAbsoluteUrl, `${origin}/sites/Stable`, 'stable adapter wins');

  const compatibility = findSharePointContext({
    location: { origin },
    __DCSPAD_SP_CONTEXT__: { webAbsoluteUrl: `${origin}/sites/Compatibility` },
  });
  assert.equal(compatibility.webAbsoluteUrl, `${origin}/sites/Compatibility`);

  const parent = {
    location: { origin },
    __DCS_SP_CONTEXT__: { webAbsoluteUrl: `${origin}/sites/Parent` },
  };
  const inherited = findSharePointContext({ location: { origin }, parent });
  assert.equal(inherited.webAbsoluteUrl, `${origin}/sites/Parent`);

  const top = {
    location: { origin },
    __DCSPAD_SP_CONTEXT__: { webAbsoluteUrl: `${origin}/sites/Top` },
  };
  const inheritedFromTop = findSharePointContext({ location: { origin }, top });
  assert.equal(inheritedFromTop.webAbsoluteUrl, `${origin}/sites/Top`);

  let guardedContextReads = 0;
  const crossOrigin = {};
  Object.defineProperty(crossOrigin, 'location', {
    get() { throw new Error('cross-origin location'); },
  });
  Object.defineProperty(crossOrigin, '__DCS_SP_CONTEXT__', {
    get() { guardedContextReads += 1; throw new Error('cross-origin context'); },
  });
  const absent = findSharePointContext({
    location: { origin },
    parent: crossOrigin,
    top: crossOrigin,
  });
  assert.equal(absent, null);
  assert.equal(guardedContextReads, 0, 'cross-origin context properties are never inspected');
});

test('sharepoint: page context finder uses the modern Site Pages module-loader fallback', () => {
  const origin = 'https://contoso.sharepoint.com';
  const featureId = 'b6917cb1-93a0-4b97-a84d-7cf49975d4ec';
  const modern = findSharePointContext({
    location: { origin },
    spModuleLoader: {
      _bundledComponents: {
        [featureId]: {
          PageManager: {
            _instance: {
              pageContext: {
                legacyPageContext: {
                  webAbsoluteUrl: `${origin}/sites/ModernPages`,
                  formDigestValue: 'modern-digest',
                  formDigestTimeoutSeconds: 1800,
                },
              },
            },
          },
        },
      },
    },
  });
  assert.deepEqual(modern, {
    webAbsoluteUrl: `${origin}/sites/ModernPages`,
    formDigestValue: 'modern-digest',
    formDigestTimeoutSeconds: 1800,
  });
});

test('sharepoint: direct browsing URLs encode every path segment', async () => {
  const webUrl = 'https://contoso.sharepoint.com/sites/Team';
  const path = "/sites/Team/Shared Documents/R&D 100% #1's?.png";
  const expected = 'https://contoso.sharepoint.com/sites/Team/Shared%20Documents/'
    + 'R%26D%20100%25%20%231%27s%3F.png';
  assert.equal(directUrlForPath(webUrl, path), expected);

  const provider = sharePointProvider({
    webUrl,
    fetchImpl: async (url) => new Response(JSON.stringify({
      value: String(url).includes('/Folders?') ? [] : [{
        Name: "R&D 100% #1's?.png",
        ServerRelativeUrl: path,
        Length: '12',
      }],
    }), { status: 200, headers: { 'Content-Type': 'application/json' } }),
  });
  const listing = await provider.list({ webUrl, path: '/sites/Team/Shared Documents' });
  assert.equal(listing.entries.find((entry) => entry.kind === 'file').url, expected);
});

test('sharepoint: writes return a direct URL rather than a sharing link', async () => {
  const webUrl = 'https://contoso.sharepoint.com/sites/Team';
  const path = '/sites/Team/Shared Documents/R&D #1.png';
  let uploadEndpoint = '';
  const provider = sharePointProvider({
    webUrl,
    fetchImpl: async (url) => {
      if (String(url).endsWith('/_api/contextinfo')) {
        return new Response(JSON.stringify({
          FormDigestValue: 'digest',
          FormDigestTimeoutSeconds: 1800,
          WebFullUrl: webUrl,
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
      uploadEndpoint = String(url);
      return new Response(JSON.stringify({ ServerRelativeUrl: path }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    },
  });
  const written = await provider.write(
    { webUrl, path: '/sites/Team/Shared Documents' },
    'R&D #1.png',
    new Uint8Array([1, 2, 3]),
  );
  assert.equal(written.url,
    'https://contoso.sharepoint.com/sites/Team/Shared%20Documents/R%26D%20%231.png');
  assert.match(uploadEndpoint, /AddUsingPath/);
  assert.ok(!written.url.includes('/_layouts/15/'), 'result is a browsing URL, not a sharing route');
});

test('sharepoint: blob reads derive byte size when Content-Length is absent', async () => {
  const bytes = new Uint8Array([0, 1, 2, 3, 4, 255]);
  const webUrl = 'https://contoso.sharepoint.com/sites/Team';
  const provider = sharePointProvider({
    webUrl,
    fetchImpl: async () => new Response(bytes, {
      status: 200,
      headers: { 'Content-Type': 'application/octet-stream' },
    }),
  });
  const result = await provider.read({
    path: '/sites/Team/Shared Documents/image.png',
    providerData: { webUrl },
  }, { as: 'blob' });
  assert.equal(result.size, bytes.byteLength);
  assert.equal(result.blob.size, bytes.byteLength);
});

test('file-broker entry point exports the standard dependency-free providers', () => {
  assert.equal(publicLocalProvider.name, 'localProvider');
  assert.equal(publicSharePointProvider, sharePointProvider);
  assert.equal(publicLoadSiteCatalog, loadSiteCatalog);
  assert.equal(publicResolveSharePointContext, resolveSharePointContext);
  assert.equal(publicFindSharePointContext, findSharePointContext);
});

// --------------------------------------------------------------------- paths

test('paths: normalization, parents and boundaries', () => {
  assert.equal(normalizePath('sites\\Team\\\\Docs/'), '/sites/Team/Docs');
  assert.equal(parentPath('/sites/Team/Docs/sub', '/sites/Team'), '/sites/Team/Docs');
  assert.equal(parentPath('/sites/Team', '/sites/Team'), '/sites/Team');
  assert.equal(joinPath('/a/b', 'c.txt'), '/a/b/c.txt');
  assert.ok(isWithin('/sites/Team/Docs', '/sites/Team'));
  assert.ok(!isWithin('/sites/Other', '/sites/Team'));
  assert.ok(!isWithin('/sites/TeamX', '/sites/Team'), 'prefix match must not escape the root');
});

test('paths: file-name problems are caught before any upload', () => {
  assert.equal(fileNameProblem('report.docx'), '');
  assert.match(fileNameProblem(''), /Enter a file name/);
  assert.match(fileNameProblem('a/b.txt'), /separators/);
  assert.match(fileNameProblem('a:b.txt'), /cannot contain/);
  assert.match(fileNameProblem('..'), /not a folder path/);
  assert.equal(formatBytes(1536), '1.5 KB');
});

// ------------------------------------------------------- provider + plumbing

test('provider: the contract is enforced at definition time', () => {
  assert.throws(() => defineProvider({ label: 'x' }), /needs an id/);
  assert.throws(() => defineProvider({ id: 'x', capabilities: { browse: true } }), /no list\(\)/);
  assert.throws(() => defineProvider({ id: 'x' }), /no pick\(\)/);
  assert.throws(
    () => defineProvider({ id: 'x', pick: () => [], capabilities: { metadata: true } }),
    /getMetadata/,
  );
  const ok = defineProvider({ id: 'x', pick: async () => [] });
  assert.equal(ok.capabilities.browse, false, 'capabilities default to false');
});

test('broker: list applies the accept filter and reports what it hid', async () => {
  const broker = createFileBroker({ providers: [memoryProvider()] });
  const listing = await broker.list('memory',
    { path: '/sites/Demo/Shared Documents' },
    { accept: compileAccept(['data']) });
  assert.deepEqual(listing.entries.filter((e) => e.kind === 'file').map((e) => e.name),
    ['report.csv']);
  assert.equal(listing.hiddenCount, 3);
  assert.deepEqual(listing.entries.filter((e) => e.kind === 'folder').map((e) => e.name),
    ['branding'], 'folders are never filtered — you browse through them');
});

test('broker: a provider that escapes its own root is rejected', async () => {
  const rogue = defineProvider({
    id: 'rogue',
    capabilities: { browse: true, read: true },
    list: async () => ({
      path: '/root',
      rootPath: '/root',
      parentPath: '/root',
      entries: [{ kind: 'file', name: 'escape.txt', path: '/etc/passwd' }],
    }),
    read: async () => ({ text: '' }),
  });
  const broker = createFileBroker({ providers: [rogue] });
  await assert.rejects(
    () => broker.list('rogue', { path: '/root' }),
    (error) => error.code === 'outside-root',
  );
});

test('broker: read enforces the byte ceiling', async () => {
  const broker = createFileBroker({ providers: [memoryProvider()], maxReadBytes: 8 });
  await assert.rejects(
    () => broker.read('memory', { name: 'readme.md', path: '/sites/Demo/Shared Documents/readme.md', size: 4096 }),
    (error) => error.code === 'too-large',
  );
});

test('broker: write rejects unusable names before touching the provider', async () => {
  const broker = createFileBroker({ providers: [memoryProvider()] });
  await assert.rejects(
    () => broker.write('memory', { path: '/sites/Demo/Shared Documents' }, 'a/b.txt', 'x'),
    (error) => error.code === 'invalid-name',
  );
});

test('broker: full save round trip — bytes, then declared metadata', async () => {
  const library = memoryProvider();
  const broker = createFileBroker({ providers: [library], metadata: DCSPAD_METADATA_FIELDS });
  const folder = { path: '/sites/Demo/Shared Documents' };

  const written = await broker.write('memory', folder, 'brief.md', '# Brief\n');
  assert.equal(written.path, '/sites/Demo/Shared Documents/brief.md');
  assert.equal(written.overwritten, false);

  const schema = normalizeSchema(DCSPAD_METADATA_FIELDS);
  const state = await broker.getMetadata('memory', { path: written.path, folderPath: folder.path }, { schema });
  const byKey = Object.fromEntries(state.fields.map((f) => [f.field.key, f]));
  assert.equal(byKey.title.available, true);
  assert.equal(byKey.description.available, true, 'declared name maps onto the library column');
  assert.equal(byKey.docVersion.available, true);

  await broker.setMetadata('memory', { path: written.path }, state,
    { title: 'Project brief', description: 'Why we are doing this', docVersion: '1.0.0' });

  const reread = await broker.getMetadata('memory', { path: written.path, folderPath: folder.path }, { schema });
  assert.equal(reread.fields.find((f) => f.field.key === 'title').value, 'Project brief');
  assert.equal(reread.fields.find((f) => f.field.key === 'docVersion').value, '1.0.0');
});

test('broker: an unavailable column is reported, never fatal', async () => {
  const library = memoryProvider();
  const broker = createFileBroker({ providers: [library] });
  const schema = normalizeSchema([
    { key: 'title', name: 'Title' },
    { key: 'nope', label: 'Not here', name: 'NotAColumn' },
  ]);
  const state = await broker.getMetadata('memory',
    { folderPath: '/sites/Demo/Shared Documents' }, { schema });
  const missing = state.fields.find((f) => f.field.key === 'nope');
  assert.equal(missing.available, false);
  assert.match(missing.reason, /not a column/);
  assert.equal(state.supported, true, 'the transfer still goes ahead');
});

test('broker: discover mode adds the library’s own columns after the declared ones', async () => {
  const broker = createFileBroker({ providers: [memoryProvider()] });
  const state = await broker.getMetadata('memory',
    { folderPath: '/sites/Demo/Shared Documents' },
    { schema: normalizeSchema([{ key: 'title', name: 'Title' }]), mode: 'discover' });
  const keys = state.fields.map((f) => f.field.key);
  assert.equal(keys[0], 'title', 'declared fields keep their order and come first');
  assert.ok(keys.includes('Audience'));
  assert.equal(state.fields.find((f) => f.field.key === 'Audience').field.type, 'choice');
  assert.deepEqual(state.fields.find((f) => f.field.key === 'Audience').field.choices,
    ['Internal', 'Partner', 'Public']);
});

test('broker: overwrite consent is the caller’s call, not the provider’s', async () => {
  const library = memoryProvider();
  const broker = createFileBroker({ providers: [library] });
  const folder = { path: '/sites/Demo/Shared Documents' };
  await assert.rejects(
    () => broker.write('memory', folder, 'readme.md', 'replaced'),
    (error) => error.code === 'conflict',
  );
  const replaced = await broker.write('memory', folder, 'readme.md', 'replaced', { overwrite: true });
  assert.equal(replaced.overwritten, true);
  const read = await broker.read('memory', { name: 'readme.md', path: replaced.path });
  assert.equal(read.text, 'replaced');
});

test('broker: providers can be unavailable without breaking anything', async () => {
  const offline = defineProvider({
    id: 'offline',
    capabilities: { browse: true, read: true },
    isAvailable: () => false,
    list: async () => ({ path: '/', rootPath: '/', parentPath: '/', entries: [] }),
    read: async () => ({ text: '' }),
  });
  const broker = createFileBroker({ providers: [memoryProvider(), offline] });
  const availability = await broker.availableProviders();
  assert.deepEqual(availability.map((entry) => [entry.provider.id, entry.available]),
    [['memory', true], ['offline', false]]);
});

test('broker: refuses to be built with no providers', () => {
  assert.throws(() => createFileBroker({ providers: [] }), /at least one provider/);
});

// -------------------------------------------------------------- site catalog

test('catalog: the documented JSON shape normalizes', () => {
  const catalog = normalizeSiteCatalog({
    sites: [
      {
        label: 'Team site',
        url: 'https://contoso.sharepoint.com/sites/Team/',
        libraries: [
          { label: 'Documents', path: 'Shared Documents' },
          { label: 'Pad exports', path: 'Shared Documents/pad', hint: 'Generated' },
        ],
      },
      { label: 'Brand', url: '/sites/Brand', default: true, libraries: ['Site Assets'] },
    ],
  });
  assert.equal(catalog.sites.length, 2);
  const [team, brand] = catalog.sites;
  assert.equal(team.url, 'https://contoso.sharepoint.com/sites/Team', 'trailing slash trimmed');
  assert.equal(team.rootPath, '/sites/Team');
  assert.deepEqual(team.libraries.map((l) => l.path),
    ['/sites/Team/Shared Documents', '/sites/Team/Shared Documents/pad']);
  assert.equal(team.libraries[1].hint, 'Generated');
  assert.equal(brand.libraries[0].label, 'Site Assets', 'a bare string library gets a label');
  assert.equal(catalog.defaultSite().label, 'Brand', 'an explicit default wins over first-listed');
});

test('catalog: shorthands and junk', () => {
  const catalog = normalizeSiteCatalog([
    'https://contoso.sharepoint.com/sites/One',
    { url: '/sites/Two', libraries: [{ path: '/sites/Two/Docs' }] },
    { label: 'no url' },
    null,
  ]);
  assert.equal(catalog.sites.length, 2, 'entries without a URL are dropped');
  assert.equal(catalog.sites[0].label, 'One', 'the label falls back to the site name');
  assert.equal(catalog.sites[1].libraries[0].path, '/sites/Two/Docs', 'absolute paths pass through');
  assert.equal(catalog.defaultSite().url, 'https://contoso.sharepoint.com/sites/One');
  assert.deepEqual(normalizeSiteCatalog(null).sites, []);
});

test('catalog: a resolved web URL matches its entry by URL or by path', () => {
  const catalog = normalizeSiteCatalog([
    { url: 'https://contoso.sharepoint.com/sites/Team', libraries: ['Shared Documents'] },
  ]);
  assert.ok(catalog.byUrl('https://contoso.sharepoint.com/sites/Team'));
  assert.ok(catalog.byUrl('https://contoso.sharepoint.com/sites/Team/'), 'trailing slash');
  // A server-relative config entry still matches the absolute URL SharePoint
  // hands back from /contextinfo, and vice versa.
  assert.ok(normalizeSiteCatalog([{ url: '/sites/Team' }])
    .byUrl('https://contoso.sharepoint.com/sites/Team'));
  assert.equal(catalog.byUrl('https://contoso.sharepoint.com/sites/Other'), null);
});

test('catalog: central loader degrades to an empty catalog on every fetch failure', async () => {
  const offline = loadSiteCatalog('/config/favorite-sites.json', {
    fetchImpl: async () => { throw new Error('offline'); },
  });
  assert.deepEqual(await offline(), []);

  const missing = loadSiteCatalog('/config/favorite-sites.json', {
    fetchImpl: async () => ({ ok: false }),
  });
  assert.deepEqual(await missing(), []);

  const malformed = loadSiteCatalog('/config/favorite-sites.json', {
    fetchImpl: async () => ({ ok: true, json: async () => ({ sites: 'not-an-array' }) }),
  });
  assert.deepEqual(await malformed(), []);
  assert.deepEqual(normalizeSiteCatalog(await malformed()).sites, []);
});

// ------------------------------------------------------------------- storage

test('storage: recall remembers the folder, the site, and the last provider', () => {
  const recall = createRecall(createMemoryStore());
  assert.equal(recall.lastProvider(), '');
  assert.equal(recall.location('sharepoint'), null);

  recall.rememberProvider('sharepoint');
  recall.rememberLocation('sharepoint', {
    path: '/sites/Team/Shared Documents',
    webUrl: 'https://contoso.sharepoint.com/sites/Team',
  });
  assert.equal(recall.lastProvider(), 'sharepoint');
  assert.deepEqual(recall.location('sharepoint'), {
    path: '/sites/Team/Shared Documents',
    webUrl: 'https://contoso.sharepoint.com/sites/Team',
    label: undefined,
  });

  recall.forgetLocation('sharepoint');
  assert.equal(recall.location('sharepoint'), null);
});

test('storage: recent addresses are newest-first, deduped, and capped', () => {
  const recall = createRecall(createMemoryStore());
  for (const site of ['/sites/A', '/sites/B', '/sites/a', '/sites/C', '/sites/D',
    '/sites/E', '/sites/F', '/sites/G']) {
    recall.rememberLocator('sharepoint', site);
  }
  const recent = recall.recentLocators('sharepoint');
  assert.equal(recent[0], '/sites/G');
  assert.ok(recent.length <= 6, 'the list stays short');
  assert.equal(recent.filter((s) => s.toLowerCase() === '/sites/a').length, 1,
    'the same site is not listed twice in different cases');
});

test('storage: a broken backing store degrades to remembering nothing', () => {
  const hostile = {
    getItem() { throw new Error('storage disabled'); },
    setItem() { throw new Error('storage disabled'); },
  };
  const recall = createRecall(createLocalStore({ storage: hostile }));
  assert.doesNotThrow(() => recall.rememberLocation('x', { path: '/a' }));
  assert.equal(recall.location('x'), null);

  // Corrupt JSON reads as empty, not as a thrown error mid-dialog.
  const corrupt = { getItem: () => '{not json', setItem() {} };
  assert.deepEqual(createLocalStore({ storage: corrupt }).read(), {});
});

test('storage: the broker exposes recall, and storage:false forgets everything', () => {
  const remembering = createFileBroker({
    providers: [memoryProvider()],
    storage: createMemoryStore(),
  });
  remembering.recall.rememberLocation('memory', { path: '/sites/Demo/Site Assets' });
  assert.equal(remembering.recall.location('memory').path, '/sites/Demo/Site Assets');

  const forgetful = createFileBroker({ providers: [memoryProvider()], storage: false });
  forgetful.recall.rememberLocation('memory', { path: '/sites/Demo/Site Assets' });
  assert.equal(forgetful.recall.location('memory'), null);
});

// -------------------------------------------------------------------- themes

test('themes: both sheets exist, are scoped, and guard the hidden attribute', () => {
  for (const [name, css] of Object.entries(FILE_BROKER_THEMES)) {
    assert.ok(css.includes(`.dfb-theme-${name}`), `${name} is scoped to its own theme class`);
    assert.ok(css.includes('[hidden] { display: none !important; }'),
      `${name} carries the hidden guard`);
  }
  // The DCS theme must read tokens, never declare them: a DCS app's live
  // values have to win, and the fallback only covers standalone use.
  const dcs = FILE_BROKER_THEMES.dcs;
  assert.ok(dcs.includes('var(--accent, #3fd8b4)'));
  assert.ok(dcs.includes('var(--bg-2, #20242c)'));
  assert.ok(!/^\s*--(bg|fg|accent)/m.test(dcs), 'the DCS theme declares no tokens of its own');
});

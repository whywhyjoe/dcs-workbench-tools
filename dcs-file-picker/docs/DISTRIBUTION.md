# Distribution, versions, and favorite sites

The File Broker has no build step. A release is the complete `src/` directory,
served as static JavaScript modules. Keep its relative directory structure
intact: the public `file-broker.js` entry point imports sibling modules.

## Publish immutable broker releases

Choose a release identifier (normally a semantic version) and copy `src/` to an
immutable location owned by the host environment, for example:

```text
/SiteAssets/dcs-file-broker/releases/<release-id>/src/file-broker.js
/SiteAssets/dcs-file-broker/releases/<release-id>/src/providers/sharepoint.js
...
```

An application imports one explicit release URL. Do not use a `latest` path and
do not overwrite an existing release directory; publish a new identifier, test
the consuming application, and then update that application's configured URL.
Keeping the old directory makes rollback a one-line configuration change.

The exact SharePoint library and release identifier are deployment choices,
not broker defaults. This repository intentionally contains no tenant URL,
credentials, deployment script, or generated bundle.

## Publish the favorite-sites document separately

Favorites are operational configuration and may change without releasing
JavaScript. Start from [`config/favorite-sites.example.json`](../config/favorite-sites.example.json),
replace its example sites, and publish the result at one stable, same-origin URL
readable by every intended user. `schemaVersion` is reserved for operators and
is currently `1`; unknown top-level properties are ignored.

Configure a consumer with the public entry point only:

```js
import {
  createFileBroker,
  localProvider,
  sharePointProvider,
  loadSiteCatalog,
} from '/SiteAssets/dcs-file-broker/releases/<release-id>/src/file-broker.js';

const favoriteSites = loadSiteCatalog(
  '/SiteAssets/dcs-file-broker/config/favorite-sites.json',
);

const broker = createFileBroker({
  providers: [
    sharePointProvider({ sites: favoriteSites }),
    localProvider(),
  ],
});
```

The favorites document is optional. A network error, denied or missing file,
non-JSON response, or malformed `sites` value resolves to an empty catalog.
SharePoint still offers its current web and manual same-tenant site entry. If
there is no usable SharePoint page context, the provider reports unavailable;
the module still imports and other providers or a host application's manual URL
workflow continue to work.

The SharePoint provider recognizes the stable `globalThis.__DCS_SP_CONTEXT__`
adapter and the compatibility `globalThis.__DCSPAD_SP_CONTEXT__` adapter before
the usual SharePoint page globals. Embedded tools may expose those adapters on
a same-origin parent or top window; cross-origin window access is ignored
without surfacing a browser security exception.

## Release checklist

1. Run `node --test test/broker.test.mjs` from `dcs-file-picker/`.
2. Copy the entire `src/` tree to a new immutable release directory.
3. Upload the separately managed favorites JSON, if the application uses one.
4. Test module import, catalog loading, a local selection, and an authenticated
   SharePoint read/write in the target page.
5. Pin the consumer to the tested release URL. Retain the previous release for
   rollback.

Deployment and tenant smoke tests are deliberately manual: repository tests use
injected fetch/context adapters and never require credentials.

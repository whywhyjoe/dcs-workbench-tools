(() => {
'use strict';

/**
 * Utility: waitForElement
 * Waits for a standard (non-jQuery) selector to match one or more elements in the DOM.
 * Polls at a specified interval until the element(s) appear or a timeout is reached.
 *
 * @param {string} selector - Selector string to watch for.
 * @param {function} callback - Function to execute when the element(s) are found. Receives the jQuery object as an argument.
 * @param {number} [timeout=10000] - Maximum time to wait in milliseconds before giving up.
 * @param {number} [interval=100] - Polling interval in milliseconds.
 */
function waitForElement(selector, callback, timeout = 10000, interval = 100) {
	console.log(`[waitForElement] Waiting for selector: ${selector}`);
	const start = Date.now();
	const check = () => {
		const element = document.querySelector(selector);
		if (element) {
			console.log(`[waitForElement] Found element: ${selector}`);
			callback(element);
		}
		else if (Date.now() - start < timeout) {
			setTimeout(check, interval);
		}
		else {
			console.warn(`[waitForElement] Timeout: Element "${selector}" not found.`);
		}
	};
	check();
}

/* Capture this while the classic script is executing; document.currentScript is
   null by the time the polling callback runs. SharePoint deployments derive
   their shared tools base from page context unless explicitly set. */
const HALO_SCRIPT_URL = document.currentScript?.src || document.baseURI;
const INIT_STATE_ATTRIBUTE = 'data-halo-runtime-state';

function initGenerator(root) {
if (!root || root.hasAttribute(INIT_STATE_ATTRIBUTE)) return;
root.setAttribute(INIT_STATE_ATTRIBUTE, 'initializing');
try {
/* ############################################################
  DEFAULTS — edit these, reload, experiment. Everything the
  panel controls starts from here.
  ############################################################ */
const BRAND = {
 Blue:  '#0079c1',
 Navy:  '#005789',
 Green:  '#646c76',
 White: '#FFFFFF',
};
/* Hover color for the text block background, keyed by the resting
  text bg color (keys lowercase). On hover the bg swaps to `hover`,
  unless the banner bg is already that color - then `backup` is used.
  Custom text bg colors with no entry here get no hover change. */
const HOVER_COLORS = {
 [BRAND.Navy.toLowerCase()]:  { hover: BRAND.Blue, backup: BRAND.Green },
 [BRAND.Blue.toLowerCase()]:  { hover: BRAND.Navy, backup: BRAND.Green },
 [BRAND.Green.toLowerCase()]: { hover: BRAND.Blue, backup: BRAND.Navy },
 [BRAND.White.toLowerCase()]: { hover: BRAND.Blue, backup: BRAND.Navy },
};
const DEFAULTS = {
 scale: .96,
 x: 35,
 y: 50,
 ringWeight: 9,
 abHeight: 680,
 ringColor: '#FFFFFF',
 bg: '#0079c1',
 bgRounded: true,
 bgRadius: 10,
 bgImage: '',
 bgOpacity: '100%',
 bgBlend: 'normal',
 photoZoom: 1, photoX: 50, photoY: 50,
 photoImage: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b',
 photoAlt: 'City skyline',
 text: 'Meet the <span class="b">Insights</span> team',
 font: '"Dax Pro"',
 weight: '400',
 size: 50,
 textX: 40,
 textY: 80,
 textW: 705,
 textH: 85,
 padX: 30,
 padY: 25,
 rounded: true,
 radius: 10,
 textColor: '#FFFFFF',
 textBg: '#005789',
 textBgOpacity: '100%',
 blend: 'normal',
 href: '',
 target: '_self',
 hoverScale: 1.05
};
/* ############################################################ */
const $ = id => root.querySelector(`#${id}`);
const scene = $('scene'), link = $('link'), img = $('img'), textEl = $('text'), textBgEl = $('text-bg'), out = $('out');
const placeholderImage = 'data:image/svg+xml;utf8,' + encodeURIComponent(
 `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
<rect width="600" height="600" fill="#d7dbe0"/>
<circle cx="300" cy="235" r="95" fill="#9aa4b0"/>
<path d="M110 600c0-105 85-190 190-190s190 85 190 190z" fill="#9aa4b0"/>
</svg>`);
const state = { ...DEFAULTS };
const IMAGE_LIMIT_BYTES = 400 * 1024;
const IMAGE_LIMIT_EDGE = 2000;
const IMAGE_ACCEPT = ['.jpg', '.jpeg', '.png', '.webp'];
const imageFields = {
 photoImage: { input: 'purl', pick: 'pick-purl', shortLabel: 'FG', label: 'foreground' },
 bgImage: { input: 'bgurl', pick: 'pick-bgurl', shortLabel: 'BG', label: 'background' },
};
const imageRecords = new Map();
const pendingActions = new Map();
let outputTail = Promise.resolve();
let brokerPromise = null;
let compressorPromise = null;
let brokerFailure = '';

function configuredUrl(value, fallback, base = HALO_SCRIPT_URL) {
 try { return new URL(String(value || fallback), base).href; }
 catch { return String(value || fallback); }
}
function sharePointWebUrl() {
 const modernSitePages = (() => {
  try {
   return globalThis.spModuleLoader?._bundledComponents
    ?.["b6917cb1-93a0-4b97-a84d-7cf49975d4ec"]
    ?.PageManager?._instance?.pageContext?.legacyPageContext;
  } catch { return null; }
 })();
 const candidates = [
  globalThis.__DCS_SP_CONTEXT__?.webAbsoluteUrl,
  globalThis.__DCS_SP_CONTEXT__?.webUrl,
  globalThis.__DCSPAD_SP_CONTEXT__?.webAbsoluteUrl,
  globalThis.__DCSPAD_SP_CONTEXT__?.webUrl,
  globalThis._spPageContextInfo?.webAbsoluteUrl,
  globalThis.moduleLoaderPageContext?.web?.absoluteUrl,
  modernSitePages?.webAbsoluteUrl,
 ];
 const configured = candidates.find(value => /^https?:\/\//i.test(String(value || '')));
 if (configured) return String(configured).replace(/\/$/, '');
 try {
  const match = location.pathname.match(/^.*?\/(?:sites|teams)\/[^/]+/i);
  if (match) return `${location.origin}${match[0]}`.replace(/\/$/, '');
 } catch { /* standalone fragments may not expose a usable location */ }
 return '';
}
function imageConfig() {
 const configured = globalThis.HALO_IMAGE_PICKER_CONFIG || {};
 const webUrl = sharePointWebUrl();
 const brokerVersion = String(configured.brokerVersion || 'v1.0.0').replace(/^\/+|\/+$/g, '');
 const toolsBaseUrl = configured.toolsBaseUrl
  ? `${configuredUrl(configured.toolsBaseUrl, configured.toolsBaseUrl).replace(/\/$/, '')}/`
  : (webUrl ? `${webUrl}/SiteAssets/Code/tools/` : '');
 const brokerDefault = toolsBaseUrl
  ? configuredUrl(`dcs-file-broker/${brokerVersion}/src/file-broker.js`, '', toolsBaseUrl)
  : configuredUrl('', '../dcs-file-picker/src/file-broker.js');
 const catalogDefault = toolsBaseUrl
  ? configuredUrl('dcs-file-broker/sites.json', '', toolsBaseUrl)
  : '';
 const compressorDefault = toolsBaseUrl
  ? configuredUrl('halo-banner/vendor/browser-image-compression-2.0.2.js', '', toolsBaseUrl)
  : configuredUrl('', 'vendor/browser-image-compression-2.0.2.js');
 return {
  ...configured,
  toolsBaseUrl,
  brokerVersion,
  brokerModuleUrl: configuredUrl(configured.brokerModuleUrl, brokerDefault),
  siteCatalogUrl: configured.siteCatalogUrl === false
   ? ''
   : (configured.siteCatalogUrl ? configuredUrl(configured.siteCatalogUrl, catalogDefault) : catalogDefault),
  compressionScriptUrl: configuredUrl(
   configured.compressionScriptUrl,
   compressorDefault
  ),
  defaultProvider: configured.defaultProvider || 'sharepoint',
 };
}
function normalizeImageUrl(value) {
 const text = String(value || '').trim();
 if (!text) return '';
 if (/^(?:data|blob):/i.test(text)) return text;
 try { return new URL(text, document.baseURI).href; }
 catch { return text; }
}
function formatBytes(bytes) {
 if (!Number.isFinite(bytes)) return 'unknown size';
 const units = [
  { label: 'Gb', size: 1024 * 1024 * 1024 },
  { label: 'Mb', size: 1024 * 1024 },
  { label: 'Kb', size: 1024 },
 ];
 const unit = units.find(({ size }) => bytes >= size) || units[units.length - 1];
 const value = Math.max(1, bytes / unit.size);
 return `${value < 10 && unit.label !== 'Kb' ? value.toFixed(1) : Math.round(value)} ${unit.label}`;
}
function formatHeaderBytes(bytes) {
 if (!Number.isFinite(bytes)) return '\u2014';
 return formatBytes(bytes);
}
function inspectionSummary(inspection) {
 if (!inspection) return 'not inspected';
 const alpha = inspection.hasAlpha ? ' \u00b7 transparency' : '';
 return `${inspection.width}\u00d7${inspection.height} \u00b7 ${formatBytes(inspection.size)}${alpha}`;
}
function needsOptimization(inspection) {
 return Boolean(inspection && (
  inspection.width > IMAGE_LIMIT_EDGE || inspection.height > IMAGE_LIMIT_EDGE
  || inspection.size > IMAGE_LIMIT_BYTES
 ));
}
function updateImageStatus() {
 const status = $('image-sizes');
 const warning = $('image-size-warning');
 if (!status || !warning) return;
 const summaries = Object.entries(imageFields).map(([key, field]) => {
  const record = imageRecords.get(key);
  const current = normalizeImageUrl(state[key]);
  const value = record && record.urlKey === current && record.inspection
   ? formatHeaderBytes(record.inspection.size)
   : '\u2014';
  return `${field.shortLabel} ${value}`;
 });
 const oversized = Object.entries(imageFields).filter(([key]) => {
  const record = imageRecords.get(key);
  return record && record.urlKey === normalizeImageUrl(state[key])
   && needsOptimization(record.inspection);
 });
 status.textContent = summaries.join(' / ');
 warning.hidden = oversized.length === 0;
 const warningText = oversized.length
  ? `${oversized.map(([, field]) => field.label).join(' and ')} image may need optimization.`
  : '';
 warning.title = warningText;
 warning.setAttribute('aria-label', warningText || 'Image size warning');
}
function setNotice(message = '', kind = 'info') {
 const notice = $('halo-notice');
 if (!notice) return;
 const body = notice.querySelector('.dcs-notice-body') || notice;
 body.textContent = message;
 notice.dataset.kind = kind;
 notice.hidden = !message;
}
function setRootBusy(busy) {
 root.dataset.busy = String(Boolean(busy));
 ['pick-purl', 'pick-bgurl', 'copy', 'svg', 'toggle-code'].forEach(id => {
  const button = $(id);
  if (!button) return;
  button.disabled = Boolean(busy) || (id.startsWith('pick-') && Boolean(brokerFailure));
  if (id.startsWith('pick-')) {
   button.dataset.readyTitle ||= button.title;
   button.title = brokerFailure || button.dataset.readyTitle;
  }
 });
 ['purl', 'bgurl'].forEach(id => {
  const input = $(id);
  if (input) input.disabled = Boolean(busy);
 });
}
function buttonLabel(button, text) {
 const label = button?.querySelector('span');
 if (label) label.textContent = text;
}
function errorMessage(error, fallback = 'The image operation could not be completed.') {
 if (error?.code === 'cancelled' || error?.name === 'AbortError') return '';
 return error?.message || String(error || fallback);
}

function showDecision({ title, message, details = '', primary = 'Continue', secondary = '', cancel = 'Cancel' }) {
 const dialog = $('halo-decision');
 if (!dialog?.showModal) {
  return Promise.resolve(globalThis.confirm?.(`${message}\n\n${details}`) ? 'primary' : 'cancel');
 }
 const titleEl = $('halo-decision-title'), messageEl = $('halo-decision-message');
 const detailsEl = $('halo-decision-details'), primaryButton = $('halo-decision-primary');
 const secondaryButton = $('halo-decision-secondary'), cancelButton = $('halo-decision-cancel');
 titleEl.textContent = title;
 messageEl.textContent = message;
 detailsEl.textContent = details;
 detailsEl.hidden = !details;
 primaryButton.textContent = primary;
 secondaryButton.textContent = secondary;
 secondaryButton.hidden = !secondary;
 cancelButton.textContent = cancel;
 return new Promise(resolve => {
  let result = 'cancel';
  const choose = value => { result = value; dialog.close(); };
  const onPrimary = () => choose('primary');
  const onSecondary = () => choose('secondary');
  const onCancel = () => choose('cancel');
  const onClose = () => {
   primaryButton.removeEventListener('click', onPrimary);
   secondaryButton.removeEventListener('click', onSecondary);
   cancelButton.removeEventListener('click', onCancel);
   dialog.removeEventListener('cancel', onCancelEvent);
   resolve(result);
  };
  const onCancelEvent = event => { event.preventDefault(); choose('cancel'); };
  primaryButton.addEventListener('click', onPrimary);
  secondaryButton.addEventListener('click', onSecondary);
  cancelButton.addEventListener('click', onCancel);
  dialog.addEventListener('cancel', onCancelEvent);
  dialog.addEventListener('close', onClose, { once: true });
  dialog.showModal();
 });
}

function showProgress(label) {
 const dialog = $('halo-progress');
 const labelEl = $('halo-progress-label');
 const bar = $('halo-progress-bar');
 const cancel = $('halo-progress-cancel');
 const controller = new AbortController();
 if (labelEl) labelEl.textContent = label;
 if (bar) bar.removeAttribute('value');
 if (cancel) {
  cancel.disabled = false;
  cancel.onclick = () => controller.abort();
 }
 if (dialog?.showModal && !dialog.open) dialog.showModal();
 return {
  signal: controller.signal,
  progress(value) {
   if (!bar) return;
   if (Number.isFinite(value)) bar.value = Math.max(0, Math.min(1, value));
   else bar.removeAttribute('value');
  },
  close() {
   if (cancel) cancel.onclick = null;
   if (dialog?.open) dialog.close();
  },
 };
}

async function loadBroker() {
 if (brokerFailure) throw new Error(brokerFailure);
 if (brokerPromise) return brokerPromise;
 brokerPromise = (async () => {
  const config = imageConfig();
  const module = await import(config.brokerModuleUrl);
  const required = ['createFileBroker', 'localProvider', 'sharePointProvider', 'loadSiteCatalog'];
  const missing = required.filter(name => typeof module[name] !== 'function');
  if (missing.length) throw new Error(`File Broker is missing: ${missing.join(', ')}.`);
  const sharePointOptions = { ...(config.sharePoint || {}) };
  if (config.siteCatalogUrl) sharePointOptions.sites = module.loadSiteCatalog(config.siteCatalogUrl);
  const broker = module.createFileBroker({
   providers: [module.localProvider(), module.sharePointProvider(sharePointOptions)],
   defaultProvider: config.defaultProvider,
   accept: IMAGE_ACCEPT,
   metadata: false,
   storageKey: 'halo-banner.images.v1',
   mount: document.body,
  });
  if (!broker || typeof broker.open !== 'function' || typeof broker.save !== 'function') {
   throw new Error('File Broker did not return the expected open/save API.');
  }
  return broker;
 })().catch(error => {
  brokerPromise = null;
  brokerFailure = `Image picker is unavailable. Manual URLs still work. ${error?.message || error}`;
  setRootBusy(false);
  throw new Error(brokerFailure);
 });
 return brokerPromise;
}

function loadCompressor() {
 if (typeof globalThis.imageCompression === 'function') return Promise.resolve(globalThis.imageCompression);
 if (compressorPromise) return compressorPromise;
 const src = imageConfig().compressionScriptUrl;
 compressorPromise = new Promise((resolve, reject) => {
  const existing = [...document.querySelectorAll('script[data-halo-compressor]')]
   .find(candidate => candidate.dataset.haloCompressor === src);
  const script = existing || document.createElement('script');
  const done = () => typeof globalThis.imageCompression === 'function'
   ? resolve(globalThis.imageCompression)
   : reject(new Error('The image compressor loaded without its browser API.'));
  script.addEventListener('load', done, { once: true });
  script.addEventListener('error', () => reject(new Error('The pinned image compressor could not be loaded.')), { once: true });
  if (!existing) {
   script.src = src;
   script.dataset.haloCompressor = src;
   document.head.append(script);
  }
 }).catch(error => {
  document.querySelectorAll('script[data-halo-compressor]').forEach(script => {
   if (script.dataset.haloCompressor === src) script.remove();
  });
  compressorPromise = null;
  throw error;
 });
 return compressorPromise;
}

function imageFormat(bytes) {
 const ascii = (start, length) => String.fromCharCode(...bytes.slice(start, start + length));
 if (bytes.length >= 4 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
  return { format: 'jpeg', mimeType: 'image/jpeg', extension: 'jpg', hasAlpha: false };
 }
 const pngSignature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
 if (bytes.length >= 33 && pngSignature.every((value, index) => bytes[index] === value)) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (ascii(12, 4) !== 'IHDR' || view.getUint32(8) !== 13) return null;
  const colorType = bytes[25];
  let offset = 8;
  let transparentChunk = false;
  let complete = false;
  while (offset + 12 <= bytes.length) {
   const length = view.getUint32(offset);
   if (offset + 12 + length > bytes.length) return null;
   const type = ascii(offset + 4, 4);
   if (type === 'tRNS') transparentChunk = true;
   offset += 12 + length;
   if (type === 'IEND') { complete = true; break; }
  }
  if (!complete) return null;
  return {
   format: 'png', mimeType: 'image/png', extension: 'png',
   mayHaveAlpha: colorType === 4 || colorType === 6 || transparentChunk,
   hasAlpha: false,
  };
 }
 if (bytes.length >= 16 && ascii(0, 4) === 'RIFF' && ascii(8, 4) === 'WEBP') {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const declaredSize = view.getUint32(4, true) + 8;
  if (declaredSize > bytes.length) return null;
  let offset = 12;
  let mayHaveAlpha = false;
  while (offset + 8 <= declaredSize) {
   const type = ascii(offset, 4);
   const length = view.getUint32(offset + 4, true);
   const payload = offset + 8;
   if (payload + length > declaredSize) return null;
   if (type === 'ALPH') mayHaveAlpha = true;
   if (type === 'VP8X' && length >= 1 && (bytes[payload] & 0x10)) mayHaveAlpha = true;
   if (type === 'VP8L' && length >= 5 && bytes[payload] === 0x2f
       && (bytes[payload + 4] & 0x10)) mayHaveAlpha = true;
   offset = payload + length + (length % 2);
  }
  return {
   format: 'webp', mimeType: 'image/webp', extension: 'webp',
   mayHaveAlpha, hasAlpha: false,
  };
 }
 return null;
}

async function decodeCanvasSource(blob) {
 if (typeof createImageBitmap === 'function') {
  const bitmap = await createImageBitmap(blob);
  return {
   image: bitmap, width: bitmap.width, height: bitmap.height,
   close: () => bitmap.close?.(),
  };
 }
 const url = URL.createObjectURL(blob);
 return new Promise((resolve, reject) => {
  const decoded = new Image();
  decoded.onload = () => resolve({
   image: decoded, width: decoded.naturalWidth, height: decoded.naturalHeight,
   close: () => URL.revokeObjectURL(url),
  });
  decoded.onerror = () => {
   URL.revokeObjectURL(url);
   reject(new Error('The browser could not decode this image.'));
  };
  decoded.src = url;
 });
}

async function inspectPixels(blob, mayHaveAlpha) {
 const source = await decodeCanvasSource(blob);
 try {
  let hasAlpha = false;
  if (mayHaveAlpha) {
   // Scan native pixels in bounded tiles. Scaling the whole image down can
   // average away a small transparent detail and cause a later encode to
   // flatten it, while one full-size canvas can exhaust browser memory.
   const tileSize = 512;
   const canvas = document.createElement('canvas');
   for (let y = 0; y < source.height && !hasAlpha; y += tileSize) {
    for (let x = 0; x < source.width && !hasAlpha; x += tileSize) {
     const width = Math.min(tileSize, source.width - x);
     const height = Math.min(tileSize, source.height - y);
     canvas.width = width;
     canvas.height = height;
     const context = canvas.getContext('2d', { alpha: true, willReadFrequently: true });
     if (!context) throw new Error('The browser could not create an image canvas.');
     context.drawImage(source.image, x, y, width, height, 0, 0, width, height);
     const pixels = context.getImageData(0, 0, width, height).data;
     for (let index = 3; index < pixels.length; index += 4) {
      if (pixels[index] < 255) { hasAlpha = true; break; }
     }
    }
   }
  }
  return { width: source.width, height: source.height, hasAlpha };
 } finally { source.close(); }
}

async function inspectBlob(blob, name = 'image') {
 if (!(blob instanceof Blob) || !blob.size) throw new Error(`"${name}" is empty.`);
 const bytes = new Uint8Array(await blob.arrayBuffer());
 const format = imageFormat(bytes);
 if (!format) throw new Error(`"${name}" is not a valid JPEG, PNG, or WebP image. SVG is not supported.`);
 let pixels;
 try { pixels = await inspectPixels(blob, format.mayHaveAlpha); }
 catch { throw new Error(`"${name}" has a recognized header but its pixels cannot be decoded.`); }
 if (!pixels.width || !pixels.height) throw new Error(`"${name}" has invalid dimensions.`);
 const inspection = { ...format, ...pixels, size: blob.size };
 inspection.needsOptimization = needsOptimization(inspection);
 return inspection;
}

function canvasBlob(canvas, type, quality) {
 return new Promise((resolve, reject) => canvas.toBlob(
  blob => blob ? resolve(blob) : reject(new Error(`This browser cannot encode ${type}.`)),
  type,
  quality,
 ));
}

async function canvasOptimize(blob, inspection, signal, onProgress, {
 targetMimeType = inspection.mimeType,
 preservePngFidelity = false,
} = {}) {
 const source = await decodeCanvasSource(blob);
 try {
  let scale = Math.min(1, IMAGE_LIMIT_EDGE / Math.max(source.width, source.height));
  let result = blob;
  const attempts = preservePngFidelity ? 1 : 8;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
   if (signal.aborted) throw new DOMException('Cancelled', 'AbortError');
   const width = Math.max(1, Math.round(source.width * scale));
   const height = Math.max(1, Math.round(source.height * scale));
   const canvas = document.createElement('canvas');
   canvas.width = width;
   canvas.height = height;
   const preservesAlpha = targetMimeType !== 'image/jpeg' && inspection.hasAlpha;
   const context = canvas.getContext('2d', { alpha: preservesAlpha });
   if (!context) throw new Error('The browser could not create an image canvas.');
   if (!preservesAlpha) {
    context.fillStyle = '#fff';
    context.fillRect(0, 0, width, height);
   }
   context.drawImage(source.image, 0, 0, width, height);
   result = await canvasBlob(canvas, targetMimeType,
    targetMimeType === 'image/png' ? undefined : 0.82);
   onProgress((attempt + 1) / attempts);
   if (preservePngFidelity || result.size <= IMAGE_LIMIT_BYTES) break;
   const targetScale = Math.sqrt(IMAGE_LIMIT_BYTES / result.size) * 0.92;
   scale *= Math.min(0.88, targetScale);
  }
  return result;
 } finally { source.close(); }
}

async function optimizeImage(blob, inspection, name) {
 const progress = showProgress(`Optimizing ${name}`);
 try {
  let optimized;
  const transparentPng = inspection.format === 'png' && inspection.hasAlpha;
  const targetMimeType = inspection.format === 'png' && !inspection.hasAlpha
   ? 'image/webp'
   : inspection.mimeType;
  if (!transparentPng) {
   try {
    const compress = await loadCompressor();
    if (progress.signal.aborted) throw new DOMException('Cancelled', 'AbortError');
    const file = blob instanceof File
     ? blob
     : new File([blob], name, { type: inspection.mimeType, lastModified: Date.now() });
    optimized = await compress(file, {
     maxSizeMB: IMAGE_LIMIT_BYTES / 1024 / 1024,
     maxWidthOrHeight: IMAGE_LIMIT_EDGE,
     useWebWorker: false,
     fileType: targetMimeType,
     initialQuality: 0.82,
     maxIteration: 12,
     signal: progress.signal,
     onProgress: percent => progress.progress(Number(percent) / 100),
    });
   } catch (error) {
    if (progress.signal.aborted) throw error;
    console.warn('[halo] pinned image compressor unavailable; using Canvas fallback', error);
   }
  }
  const interimInspection = optimized ? await inspectBlob(optimized, name) : null;
  if (transparentPng || !optimized || needsOptimization(interimInspection)) {
   optimized = await canvasOptimize(optimized || blob, await inspectBlob(optimized || blob, name),
    progress.signal, value => progress.progress(value), {
     targetMimeType,
     preservePngFidelity: transparentPng,
    });
  }
  if (progress.signal.aborted) throw new DOMException('Cancelled', 'AbortError');
  const optimizedInspection = await inspectBlob(optimized, name);
  if (optimizedInspection.width > IMAGE_LIMIT_EDGE || optimizedInspection.height > IMAGE_LIMIT_EDGE) {
   throw new Error('The optimized image still exceeds the 2000 px dimension limit.');
  }
  const hadRequiredResize = inspection.width > IMAGE_LIMIT_EDGE || inspection.height > IMAGE_LIMIT_EDGE;
  if (!hadRequiredResize && optimized.size >= blob.size) {
   return { blob, inspection };
  }
  return { blob: optimized, inspection: optimizedInspection };
 } finally { progress.close(); }
}

function suggestedName(name, inspection, addOptimizedSuffix) {
 const cleaned = String(name || 'halo-image').replace(/["*:<>?\\/|]+/g, '-').trim();
 const originalExtension = cleaned.match(/\.([^.]+)$/)?.[1] || '';
 const formatMatches = inspection.format === 'jpeg'
  ? /^jpe?g$/i.test(originalExtension)
  : originalExtension.toLowerCase() === inspection.extension;
 const extension = formatMatches ? originalExtension : inspection.extension;
 const stem = cleaned.replace(/\.[^.]+$/, '').trim()
  || 'halo-image';
 return `${stem}${addOptimizedSuffix ? '-optimized' : ''}.${extension}`;
}

function checkedDirectUrl(value, operation) {
 const text = String(value || '').trim();
 let parsed;
 try { parsed = new URL(text); } catch { parsed = null; }
 const sharingPath = /\/:\w:\/(?:r|s|g)\//i.test(parsed?.pathname || '')
  || /\/_layouts\/15\/(?:guestaccess|sharing|Doc)\.aspx/i.test(parsed?.pathname || '');
 if (!parsed || !/^https?:$/i.test(parsed.protocol) || sharingPath) {
  brokerFailure = `Image picker is unavailable. Manual URLs still work. File Broker ${operation} did not return a direct SharePoint browsing URL.`;
  setRootBusy(false);
  throw new Error(brokerFailure);
 }
 return parsed.href;
}

function parentFolder(path) {
 const normalized = String(path || '').replace(/\\/g, '/').replace(/\/+$/, '');
 const split = normalized.lastIndexOf('/');
 return split > 0 ? normalized.slice(0, split) : '';
}

function sharePointSaveStart(picked) {
 const path = parentFolder(picked?.file?.path);
 if (!path) return null;
 const start = { provider: 'sharepoint', path };
 const webUrl = String(
  picked?.file?.webUrl || picked?.file?.providerData?.webUrl || picked?.webUrl || ''
 ).trim();
 if (/^https?:\/\//i.test(webUrl)) start.webUrl = webUrl;
 return start;
}

function nameFromUrl(value, fallback) {
 try {
  const name = decodeURIComponent(new URL(value, document.baseURI).pathname.split('/').pop() || '');
  return name || fallback;
 } catch { return fallback; }
}

async function saveToSharePoint(broker, blob, inspection, name, {
 start = null,
 addOptimizedSuffix = false,
} = {}) {
 const saved = await broker.save({
  providers: ['sharepoint'],
  data: blob,
  suggestedName: suggestedName(name, inspection, addOptimizedSuffix),
  accept: [`.${inspection.extension}`],
  metadata: false,
  ...(start ? { start } : {}),
  title: 'Save image to SharePoint',
  description: 'Choose the document library that will host this Halo image.',
 });
 if (!saved) return null;
 if (saved.provider !== 'sharepoint' || !saved.file || typeof saved.file !== 'object') {
  brokerFailure = 'Image picker is unavailable. Manual URLs still work. File Broker returned an invalid save result.';
  setRootBusy(false);
  throw new Error(brokerFailure);
 }
 const directUrl = checkedDirectUrl(saved.file.url, 'save');
 return { url: directUrl, name: saved.file?.name || name };
}

async function optimizationDecision(field, blob, inspection, name) {
 if (!needsOptimization(inspection)) return { blob, inspection, optimized: false, decision: 'ready' };
 const reasons = [];
 if (inspection.width > IMAGE_LIMIT_EDGE || inspection.height > IMAGE_LIMIT_EDGE) {
  reasons.push(`longest edge ${Math.max(inspection.width, inspection.height)} px (limit ${IMAGE_LIMIT_EDGE} px)`);
 }
 if (inspection.size > IMAGE_LIMIT_BYTES) {
  reasons.push(`${formatBytes(inspection.size)} (limit ${formatBytes(IMAGE_LIMIT_BYTES)})`);
 }
 const choice = await showDecision({
  title: `Review ${field.label} image`,
  message: 'This image is larger than the recommended Halo limits.',
  details: `${inspectionSummary(inspection)}\n${reasons.join('\n')}`,
  primary: 'Optimize', secondary: 'Use original', cancel: 'Cancel',
 });
 if (choice === 'cancel') return null;
 if (choice === 'secondary') return { blob, inspection, optimized: false, decision: 'accepted' };
 const optimized = await optimizeImage(blob, inspection, name);
 return { ...optimized, optimized: optimized.blob !== blob, decision: 'optimized' };
}

function assignImage(key, url, blob, inspection, decision = 'ready') {
 const input = $(imageFields[key].input);
 state[key] = url;
 if (input) input.value = url;
 imageRecords.set(key, { urlKey: normalizeImageUrl(url), blob, inspection, decision });
 render();
 updateImageStatus();
}

async function pickImage(key) {
 const field = imageFields[key];
 const previous = state[key];
 setRootBusy(true);
 setNotice('');
 try {
  const broker = await loadBroker();
  const picked = await broker.open({
   accept: IMAGE_ACCEPT,
   read: 'blob',
   metadata: false,
   title: `Choose a ${field.label} image`,
   description: 'JPEG, PNG, or WebP. SVG is not supported.',
  });
  if (!picked) return;
  if (Array.isArray(picked) || !picked.file || typeof picked.file !== 'object'
      || !['local', 'sharepoint'].includes(picked.provider)) {
   brokerFailure = 'Image picker is unavailable. Manual URLs still work. File Broker returned an invalid open result.';
   setRootBusy(false);
   throw new Error(brokerFailure);
  }
  const blob = picked.blob || picked.nativeFile;
  if (!(blob instanceof Blob)) {
   brokerFailure = 'Image picker is unavailable. Manual URLs still work. File Broker did not return readable image bytes.';
   setRootBusy(false);
   throw new Error(brokerFailure);
  }
  const name = picked.file?.name || blob?.name || `${field.label}-image`;
  let directUrl = picked.provider === 'sharepoint'
   ? checkedDirectUrl(picked.file.url, 'open')
   : '';
  const inspection = await inspectBlob(blob, name);
  const reviewed = await optimizationDecision(field, blob, inspection, name);
  if (!reviewed) return;
  if (picked.provider !== 'sharepoint' || reviewed.optimized) {
   const saved = await saveToSharePoint(broker, reviewed.blob, reviewed.inspection, name, {
    start: picked.provider === 'sharepoint' ? sharePointSaveStart(picked) : null,
    addOptimizedSuffix: picked.provider !== 'sharepoint' && reviewed.optimized,
   });
   if (!saved) return;
   directUrl = saved.url;
  }
  if (!directUrl) throw new Error('The selected image does not have a direct SharePoint URL.');
  assignImage(key, directUrl, reviewed.blob, reviewed.inspection, reviewed.decision);
  setNotice(`${field.label[0].toUpperCase() + field.label.slice(1)} image ready: ${inspectionSummary(reviewed.inspection)}.`, 'info');
 } catch (error) {
  state[key] = previous;
  const message = errorMessage(error);
  if (message) setNotice(message, 'error');
 } finally {
  setRootBusy(false);
  updateImageStatus();
 }
}

async function inspectUrlForOutput(key) {
 const field = imageFields[key];
 const source = String(state[key] || '').trim();
 if (!source) return true;
 const urlKey = normalizeImageUrl(source);
 const cached = imageRecords.get(key);
 if (cached?.urlKey === urlKey) {
  if (['ready', 'accepted', 'optimized', 'cors-accepted'].includes(cached.decision)) return true;
 }
 let blob;
 try {
  const response = await fetch(source, { mode: 'cors', credentials: 'same-origin' });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  blob = await response.blob();
 } catch (error) {
  const choice = await showDecision({
   title: `Could not inspect ${field.label} image`,
   message: 'The URL may still display, but its host did not allow Halo to inspect the pixels.',
   details: `${source}\n${error?.message || error}\nContinue only if you trust this image and its size.`,
   primary: 'Continue', cancel: 'Cancel',
  });
  if (choice !== 'primary') return false;
  imageRecords.set(key, { urlKey, blob: null, inspection: null, decision: 'cors-accepted' });
  updateImageStatus();
  return true;
 }
 const inspection = await inspectBlob(blob, source);
 const sourceName = nameFromUrl(source, `${field.label}-image`);
 const reviewed = await optimizationDecision(field, blob, inspection, sourceName);
 if (!reviewed) return false;
 if (reviewed.optimized) {
  const broker = await loadBroker();
  const saved = await saveToSharePoint(broker, reviewed.blob, reviewed.inspection, sourceName, {
   addOptimizedSuffix: true,
  });
  if (!saved) return false;
  assignImage(key, saved.url, reviewed.blob, reviewed.inspection, reviewed.decision);
 } else {
  imageRecords.set(key, { urlKey, blob, inspection, decision: reviewed.decision });
  updateImageStatus();
 }
 return true;
}

async function guardOutputs() {
 for (const key of Object.keys(imageFields)) {
  if (!await inspectUrlForOutput(key)) return false;
 }
 return true;
}

function serializedAction(key, task) {
 if (pendingActions.has(key)) return pendingActions.get(key);
 const run = async () => {
  setRootBusy(true);
  setNotice('');
  try {
   if (!await guardOutputs()) return;
   await task();
  } catch (error) {
   const message = errorMessage(error);
   if (message) setNotice(message, 'error');
  } finally { setRootBusy(false); }
 };
 const promise = outputTail.then(run, run);
 outputTail = promise.catch(() => {});
 pendingActions.set(key, promise);
 promise.finally(() => pendingActions.delete(key));
 return promise;
}

function blobForUrl(url) {
 const key = normalizeImageUrl(url);
 for (const record of imageRecords.values()) {
  if (record.urlKey === key && record.blob) return record.blob;
 }
 return null;
}
function fillColorSelect(sel, includeNone) {
 if (includeNone) sel.add(new Option('None', 'transparent'));
 Object.entries(BRAND).forEach(([name, value]) => sel.add(new Option(`${name} ${value}`, value)));
}
fillColorSelect($('tcolor'), false);
fillColorSelect($('tbg'), true);
fillColorSelect($('bg'), false);
fillColorSelect($('rc'), false);
for (let opacity = 0; opacity <= 100; opacity += 10) {
 const value = opacity + '%';
 $('tbgo').add(new Option(value, value));
 $('bgopacity').add(new Option(value, value));
}
function textBackground(color) {
 return color === 'transparent' ? 'transparent' : `color-mix(in srgb, ${color} ${state.textBgOpacity}, transparent)`;
}
function hoverBackground(color) {
 if (color === 'transparent') return 'transparent';
 const rule = HOVER_COLORS[color.toLowerCase()];
 if (!rule) return textBackground(color);
 const hover = rule.hover.toLowerCase() === String(state.bg).toLowerCase() ? rule.backup : rule.hover;
 return `color-mix(in srgb, ${hover} ${state.textBgOpacity}, transparent)`;
}
/* An empty text box means no text plate at all - without this an empty block
  still paints its background, padding and corner radius over the banner.
  Deliberately literal: only a box with nothing whatsoever in it counts as
  empty, so a plate with no words on it is still reachable by typing &nbsp;
  (or a single space) - no extra control needed for a rare case. */
function hasTextPlate() {
 return String(state.text) !== '';
}
function escapeAttribute(value) {
 return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
/* "--" would close the HTML comment early */
function commentSafe(value) {
 return String(value).replace(/[<>]/g, '').replace(/-{2,}/g, '-').trim();
}
/* One scope per generator load. Every block copied in a session shares it,
  which is safe because they also share identical component CSS - what it
  isolates is this banner from OTHER page CSS and from blocks generated by a
  different version of this tool. A class, not an id: pasting the same block
  twice must stay valid HTML. */
const SCOPE_ID = String(Math.floor(100000 + Math.random() * 900000));
const SCOPE_CLASS = `halo-${SCOPE_ID}`;
let cachedComponentCss = null;
let outputDirty = true;
/* Rewrites the component stylesheet so every selector only matches inside
  this block's wrapper. Going through the CSSOM (rather than string surgery)
  keeps @media intact and drops all comments for free. */
function scopedComponentCss(scope) {
 const sheet = document.getElementById('halo-banner-css').sheet;
 const scoped = selectorText => selectorText.split(',')
  .map(part => `.${scope} ${part.trim()}`).join(', ');
 const render = (rule, indent = '') => {
  if (rule instanceof CSSStyleRule) return `${indent}${scoped(rule.selectorText)} { ${rule.style.cssText} }`;
  if (rule instanceof CSSMediaRule) {
   const inner = [...rule.cssRules].map(child => render(child, indent + ' ')).join('\n');
   return `${indent}@media ${rule.conditionText} {\n${inner}\n${indent}}`;
  }
  return `${indent}${rule.cssText}`;   // @font-face and friends stay global
 };
 return [...sheet.cssRules].map(rule => render(rule)).join('\n');
}
function emittedComponentCss() {
 if (cachedComponentCss === null) cachedComponentCss = scopedComponentCss(SCOPE_CLASS);
 return cachedComponentCss;
}
function render() {
 const s = scene.style;
 s.setProperty('--scale', state.scale);
 s.setProperty('--x', state.x);
 s.setProperty('--y', state.y);
 s.setProperty('--ring-weight', state.ringWeight);
 s.setProperty('--ab-h', state.abHeight);
 s.setProperty('--ring-color', state.ringColor);
 s.setProperty('--banner-bg', state.bg);
 s.setProperty('--banner-image', state.bgImage ? `url("${state.bgImage.replace(/"/g, '\\"')}")` : 'none');
 s.setProperty('--banner-opacity', state.bgOpacity);
 s.setProperty('--banner-blend', state.bgBlend);
 s.setProperty('--banner-radius', ((state.bgRounded ? state.bgRadius : 0) / 10.24) + 'cqw');
 s.setProperty('--photo-zoom', state.photoZoom);
 s.setProperty('--photo-x', state.photoX + '%');
 s.setProperty('--photo-y', state.photoY + '%');
 img.src = state.photoImage.trim() || placeholderImage;
 img.alt = state.photoAlt;
 s.setProperty('--hover-scale', state.hoverScale);
 // text
 const showText = hasTextPlate();
 textEl.innerHTML = state.text;
 textBgEl.innerHTML = state.text;
 textBgEl.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
 /* inline, because .halo__text sets `display: block` and would beat [hidden] */
 textEl.style.display = showText ? '' : 'none';
 textBgEl.style.display = showText ? '' : 'none';
 s.setProperty('--text-font', state.font);
 s.setProperty('--text-weight', state.weight);
 s.setProperty('--text-size', state.size);
 s.setProperty('--text-x', state.textX);
 s.setProperty('--text-y', state.textY);
 s.setProperty('--text-w', state.textW > 0 ? (state.textW / 10.24) + 'cqw' : 'auto');
 s.setProperty('--text-h', state.textH > 0 ? (state.textH / 10.24) + 'cqw' : 'auto');
 s.setProperty('--text-pad-x', (state.padX / 10.24) + 'cqw');
 s.setProperty('--text-pad-y', (state.padY / 10.24) + 'cqw');
 s.setProperty('--text-radius', ((state.rounded ? state.radius : 0) / 10.24) + 'cqw');
 s.setProperty('--text-color', state.textColor);
 s.setProperty('--text-blend', state.blend);
 s.setProperty('--text-bg', textBackground(state.textBg));
 s.setProperty('--text-bg-hover', hoverBackground(state.textBg));
 const hasLink = state.href.trim() !== '';
 link.classList.toggle('has-link', hasLink);
 if (hasLink) link.href = state.href; else link.removeAttribute('href');
 if (hasLink) link.target = state.target; else link.removeAttribute('target');
 if (hasLink && state.target === '_blank') link.rel = 'noopener'; else link.removeAttribute('rel');
 const lbl = (id, value) => {
	 const element = $(id);
	 if (element) element.value = value;
 };
 lbl('v-scale', state.scale); lbl('v-x', state.x); lbl('v-y', state.y);
 lbl('v-rw', state.ringWeight); lbl('v-abh', state.abHeight);
 lbl('v-pz', state.photoZoom); lbl('v-ppx', state.photoX); lbl('v-ppy', state.photoY);
 lbl('v-tsize', state.size); lbl('v-tx', state.textX); lbl('v-ty', state.textY);
 lbl('v-tw', state.textW || 'auto'); lbl('v-th', state.textH || 'auto');
 lbl('v-tpadx', state.padX); lbl('v-tpady', state.padY);
 outputDirty = true;
 if (!$('code-view').hidden) flushOutput();
}
function flushOutput() {
 if (outputDirty) {
  emit();
  outputDirty = false;
 }
 return out.textContent;
}
function emit() {
 const hasLink = state.href.trim() !== '';
 const wrapperTag = hasLink ? 'a' : 'div';
 const showText = hasTextPlate();
 const textPlate = showText
  ? `\n<div class="halo__text halo__text-bg" aria-hidden="true" inert>${state.text}</div>`
   + `\n<div class="halo__text">${state.text}</div>`
  : '';
 /* Everything below lands inside a double-quoted style="", and a font stack
   is spelled "Dax Pro" - its own quotes would close the attribute and drop
   every declaration after it. Same &quot; escape --banner-image already uses,
   applied to each value a custom entry can put free text into. */
 const attr = value => String(value).replace(/"/g, '&quot;');
 /* no plate, no variables driving one */
 const textVars = showText ?
`
 --text-font: ${attr(state.font)};  --text-weight: ${attr(state.weight)};  --text-size: ${state.size};
 --text-x: ${state.textX};  --text-y: ${state.textY};
 --text-w: ${state.textW > 0 ? (state.textW/10.24).toFixed(3)+'cqw' : 'auto'};
 --text-h: ${state.textH > 0 ? (state.textH/10.24).toFixed(3)+'cqw' : 'auto'};
 --text-pad-x: ${(state.padX/10.24).toFixed(3)}cqw;  --text-pad-y: ${(state.padY/10.24).toFixed(3)}cqw;
 --text-radius: ${((state.rounded ? state.radius : 0)/10.24).toFixed(3)}cqw;
 --text-color: ${attr(state.textColor)};  --text-blend: ${state.blend};
 --text-bg: ${attr(textBackground(state.textBg))};
 --text-bg-hover: ${attr(hoverBackground(state.textBg))};` : '';
 out.textContent =
`<!-- HALO BANNER '${commentSafe(state.photoAlt)}' ${SCOPE_ID} -->
<div class="${SCOPE_CLASS}">
<style>
${emittedComponentCss()}
</style>
<${wrapperTag} class="halo-banner-link${hasLink ? ' has-link' : ''}"${hasLink ? ` href="${escapeAttribute(state.href)}"${state.target === '_blank' ? ' target="_blank" rel="noopener"' : ''}` : ''}>
<div class="halo-banner" style="
 --ab-h: ${state.abHeight};
 --banner-bg: ${attr(state.bg)};  --banner-image: ${state.bgImage ? `url(&quot;${attr(state.bgImage)}&quot;)` : 'none'};
 --banner-opacity: ${attr(state.bgOpacity)};  --banner-blend: ${state.bgBlend};
 --banner-radius: ${((state.bgRounded ? state.bgRadius : 0)/10.24).toFixed(3)}cqw;
 --scale: ${state.scale};  --x: ${state.x};  --y: ${state.y};
 --ring-weight: ${state.ringWeight};  --ring-color: ${attr(state.ringColor)};
 --photo-zoom: ${state.photoZoom};  --photo-x: ${state.photoX}%;  --photo-y: ${state.photoY}%;
 --hover-scale: ${state.hoverScale};${textVars}">
<figure class="halo">
<div class="halo__clip"><img class="halo__img" src="${escapeAttribute(state.photoImage)}" alt="${escapeAttribute(state.photoAlt)}"></div>
</figure>${textPlate}
</div>
</${wrapperTag}>
</div>
<!-- END HALO BANNER -->`;
}
/* ############################################################
  STANDALONE SVG EXPORT
  A second output format: one .svg file that carries its own
  geometry, colours and (where CORS allows) its own pixels, with
  no stylesheet and no external request.

  It works because the banner is already authored in artboard
  units - 1024 wide by --ab-h tall - and every CSS length in the
  component is either a percentage of that box or a cqw, which is
  1/100th of it. So `n cqw` is `n * 10.24` user units and the
  whole layout transfers without a scale factor.

  Three things do NOT transfer, by nature of the format:
   - hover (scale-up, text-bg swap) and the link wrapper. A file
     opened as an image has no interaction model.
   - Dax Pro. The glyphs stay live text with a font-family stack,
     so a machine without the font falls back to Segoe UI and the
     line breaks bake in below will no longer match its metrics.
   - images the browser is not allowed to read cross-origin. Those
     stay as <image href="https://..."> and the file is no longer
     self-contained; the caller is told which ones.
  ############################################################ */
function xmlText(value) {
 return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
async function toDataUri(url, missed) {
 const source = String(url).trim();
 if (!source || source.startsWith('data:')) return source;
 try {
  let blob = blobForUrl(source);
  if (!blob) {
   const response = await fetch(source, { mode: 'cors', credentials: 'same-origin' });
   if (!response.ok) throw new Error(response.status);
   blob = await response.blob();
  }
  return await new Promise((resolve, reject) => {
   const reader = new FileReader();
   reader.onload = () => resolve(reader.result);
   reader.onerror = () => reject(reader.error);
   reader.readAsDataURL(blob);
  });
 }
 catch (error) {
  console.warn(`[halo] could not embed ${source} - left as a link`, error);
  missed.push(source);
  return source;
 }
}
/* SVG does not wrap text, so the wrap points have to be read off the DOM that
  already wrapped it. Walks the live preview character by character and cuts a
  new run wherever the baseline moves - which is every line break, and every
  <span> that changes the font. Each run then places itself absolutely, so
  runs sharing a line stay adjacent without any inline layout. */
function textRuns(unit, origin) {
 const metrics = document.createElement('canvas').getContext('2d');
 const walker = document.createTreeWalker(textEl, NodeFilter.SHOW_TEXT);
 const runs = [];
 for (let node; (node = walker.nextNode());) {
  const text = node.nodeValue;
  if (!text.trim()) continue;
  const style = getComputedStyle(node.parentElement);
  const fontSize = parseFloat(style.fontSize);
  metrics.font = `${style.fontStyle} ${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
  const box = metrics.measureText('Hg');
  const ascent = box.fontBoundingBoxAscent || box.actualBoundingBoxAscent || fontSize * 0.8;
  const range = document.createRange();
  let run = null;
  for (let i = 0; i < text.length; i++) {
   const character = text[i];
   range.setStart(node, i);
   range.setEnd(node, i + 1);
   const rect = range.getBoundingClientRect();
   const blank = !rect.width && !rect.height;   /* collapsed at a wrap point */
   if (run && (blank || Math.abs(rect.top - run.top) < 0.5)) { run.text += character; continue; }
   /* Whitespace at the head of a line was collapsed to nothing by the browser.
      SVG collapses nothing, so a run that opened on one would indent its line
      by a space the preview never drew. Skip it and let the next glyph set
      both the run's text and its x. */
   if (/\s/.test(character)) { run = null; continue; }
   run = { top: rect.top, left: rect.left, text: character, fontSize, ascent, style };
   runs.push(run);
  }
 }
 return runs.map(run => ({
  x: (run.left - origin.left) * unit,
  y: (run.top - origin.top + run.ascent) * unit,
  size: run.fontSize * unit,
  weight: run.style.fontWeight,
  family: run.style.fontFamily,
  fill: run.style.color,
  text: run.text.replace(/\s+$/, '')
 }));
}
async function buildStandaloneSvg() {
 const missed = [];
 const round = value => Number(value.toFixed(3));
 const height = state.abHeight;
 const origin = scene.getBoundingClientRect();
 const unit = 1024 / origin.width;           /* preview px -> artboard units */
 /* --- halo. Same constants the component CSS carries: the outer edge is
    118.1759cqw = 1210.1213 units at scale 1, the clip is .95373 of it, and
    the border scales with the ring so `stroke` is just weight x scale. */
 const size = 1210.1213 * state.scale;
 const cx = 10.24 * state.x;
 const cy = height * state.y / 100;
 const stroke = state.ringWeight * state.scale;
 const clip = size * 0.95373;
 /* object-fit: cover, by hand. Scale the photo until it covers the circle's
    bounding square, park it per object-position, then apply the zoom about
    that same point the way transform-origin does. */
 const naturalW = img.naturalWidth || 1;
 const naturalH = img.naturalHeight || 1;
 const cover = Math.max(clip / naturalW, clip / naturalH);
 const photoW = naturalW * cover;
 const photoH = naturalH * cover;
 const anchorX = state.photoX / 100;
 const anchorY = state.photoY / 100;
 const boxX = cx - clip / 2;
 const boxY = cy - clip / 2;
 const zoomX = boxX + clip * anchorX;
 const zoomY = boxY + clip * anchorY;
 /* --- text. Measured, not computed: `auto` width and height only exist
    once the browser has laid the block out. An empty text box draws no
    plate here either - the preview has already hidden it. */
 const showText = hasTextPlate();
 const textBox = textEl.getBoundingClientRect();
 const runs = showText ? textRuns(unit, origin) : [];
 const [photoHref, bannerHref] = await Promise.all([
  toDataUri(state.photoImage.trim() || placeholderImage, missed),
  toDataUri(state.bgImage, missed)
 ]);
 const parts = [];
 if (bannerHref) parts.push(
  `<image x="0" y="0" width="1024" height="${round(height)}" preserveAspectRatio="xMidYMid slice" href="${escapeAttribute(bannerHref)}"/>`);
 parts.push(
  `<rect x="0" y="0" width="1024" height="${round(height)}" fill="${escapeAttribute(state.bg)}"`
  + ` fill-opacity="${parseFloat(state.bgOpacity) / 100}"`
  + (state.bgBlend === 'multiply' ? ' style="mix-blend-mode:multiply"' : '') + '/>');
 parts.push(
  `<g clip-path="url(#halo-photo-${SCOPE_ID})">`
  + `<g transform="translate(${round(zoomX)} ${round(zoomY)}) scale(${state.photoZoom}) translate(${round(-zoomX)} ${round(-zoomY)})">`
  + `<image x="${round(boxX + (clip - photoW) * anchorX)}" y="${round(boxY + (clip - photoH) * anchorY)}"`
  + ` width="${round(photoW)}" height="${round(photoH)}" preserveAspectRatio="none" href="${escapeAttribute(photoHref)}"/>`
  + '</g></g>');
 if (stroke > 0) parts.push(
  `<circle cx="${round(cx)}" cy="${round(cy)}" r="${round((size - stroke) / 2)}"`
  + ` fill="none" stroke="${escapeAttribute(state.ringColor)}" stroke-width="${round(stroke)}"/>`);
 if (showText && state.textBg !== 'transparent') parts.push(
  `<rect x="${round((textBox.left - origin.left) * unit)}" y="${round((textBox.top - origin.top) * unit)}"`
  + ` width="${round(textBox.width * unit)}" height="${round(textBox.height * unit)}"`
  + ` rx="${round(state.rounded ? state.radius : 0)}"`
  + ` fill="${escapeAttribute(state.textBg)}" fill-opacity="${parseFloat(state.textBgOpacity) / 100}"`
  + (state.blend === 'multiply' ? ' style="mix-blend-mode:multiply"' : '') + '/>');
 runs.forEach(run => parts.push(
  `<text x="${round(run.x)}" y="${round(run.y)}" xml:space="preserve"`
  + ` font-family="${escapeAttribute(run.family)}" font-size="${round(run.size)}" font-weight="${escapeAttribute(run.weight)}"`
  + ` fill="${escapeAttribute(run.fill)}">${xmlText(run.text)}</text>`));
 const radius = state.bgRounded ? state.bgRadius : 0;
 const svg =
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 ${round(height)}" width="1024" height="${round(height)}" role="img">
<title>${xmlText(state.photoAlt || 'Halo banner')}</title>
<defs>
<clipPath id="halo-banner-${SCOPE_ID}"><rect x="0" y="0" width="1024" height="${round(height)}" rx="${round(radius)}"/></clipPath>
<clipPath id="halo-photo-${SCOPE_ID}"><circle cx="${round(cx)}" cy="${round(cy)}" r="${round(clip / 2)}"/></clipPath>
</defs>
<g clip-path="url(#halo-banner-${SCOPE_ID})" style="isolation:isolate">
${parts.join('\n')}
</g>
</svg>
`;
 return { svg, missed };
}
function bindInput(id, key, cast = Number, evt = 'input') {
 const el = $(id);
 el.addEventListener(evt, e => { state[key] = cast(e.target.value); render(); });
 el.value = state[key];
}
function bindSlider(id, key, valueId) {
 const slider = $(id);
 const value = $(valueId);
 /* .dcs-slider paints its filled portion from --fill rather than accent-color,
   so the track has to be told where the thumb is. Cosmetic only. */
 const paintFill = () => {
	 const min = Number(slider.min), max = Number(slider.max);
	 slider.style.setProperty('--fill', ((slider.value - min) / (max - min) * 100) + '%');
 };
 slider.value = state[key];
 paintFill();
 slider.addEventListener('input', () => { state[key] = Number(slider.value); paintFill(); render(); });
 const commit = () => {
	 if (value.value.trim() === '' || value.value === 'auto') return render();
	 state[key] = Number(value.value);
	 slider.value = state[key];
	 paintFill();
	 render();
 };
 value.addEventListener('keydown', event => {
	 if (event.key === 'Enter') { commit(); value.blur(); }
 });
 value.addEventListener('blur', commit);
}
function bindSelect(id, key) {
 const select = $(id);
 select.value = state[key];
 select.addEventListener('change', () => { state[key] = select.value; render(); });
 const label = root.querySelector(`label[data-custom-for="${id}"]`);
 const custom = document.createElement('input');
 custom.className = 'dcs-input';
 custom.hidden = true;
 custom.setAttribute('aria-label', `${label.textContent} custom value`);
 select.after(custom);
 label.addEventListener('click', () => {
	 const editing = custom.hidden;
	 custom.hidden = !editing;
	 select.hidden = editing;
	 if (editing) { custom.value = state[key]; custom.focus(); custom.select(); }
 });
 custom.addEventListener('keydown', event => {
	 if (event.key === 'Enter') { state[key] = custom.value; render(); custom.blur(); }
	 if (event.key === 'Escape') { custom.hidden = true; select.hidden = false; }
 });
}
[
 ['scale','scale','v-scale'], ['x','x','v-x'], ['y','y','v-y'],
 ['rw','ringWeight','v-rw'], ['abh','abHeight','v-abh'],
 ['pz','photoZoom','v-pz'], ['ppx','photoX','v-ppx'], ['ppy','photoY','v-ppy'],
 ['tsize','size','v-tsize'], ['tx','textX','v-tx'], ['ty','textY','v-ty'],
 ['tw','textW','v-tw'], ['th','textH','v-th'],
 ['tpadx','padX','v-tpadx'], ['tpady','padY','v-tpady']
].forEach(args => bindSlider(...args));
bindInput('ttext','text',String);
bindInput('lurl','href',String);
bindInput('bgurl','bgImage',String);
bindInput('purl','photoImage',String);
bindInput('palt','photoAlt',String);
$('purl').addEventListener('input', () => { imageRecords.delete('photoImage'); updateImageStatus(); });
$('bgurl').addEventListener('input', () => { imageRecords.delete('bgImage'); updateImageStatus(); });
$('pick-purl')?.addEventListener('click', () => pickImage('photoImage'));
$('pick-bgurl')?.addEventListener('click', () => pickImage('bgImage'));
[
 ['tfont','font'], ['tweight','weight'], ['tcolor','textColor'], ['tbg','textBg'],
 ['tbgo','textBgOpacity'], ['bg','bg'], ['rc','ringColor'], ['bgopacity','bgOpacity']
].forEach(args => bindSelect(...args));
$('tblend').checked = state.blend === 'multiply';
$('tblend').addEventListener('change', event => { state.blend = event.target.checked ? 'multiply' : 'normal'; render(); });
$('ltarget').checked = state.target === '_blank';
$('ltarget').addEventListener('change', event => { state.target = event.target.checked ? '_blank' : '_self'; render(); });
$('bgblend').checked = state.bgBlend === 'multiply';
$('bgblend').addEventListener('change', event => { state.bgBlend = event.target.checked ? 'multiply' : 'normal'; render(); });
$('bgrounded').checked = state.bgRounded;
$('bgrounded').addEventListener('change', event => { state.bgRounded = event.target.checked; render(); });
$('trad').checked = state.rounded;
$('trad').addEventListener('change', event => { state.rounded = event.target.checked; render(); });
$('copy').addEventListener('click', event => {
 const button = event.currentTarget;
 serializedAction('copy', async () => {
  await navigator.clipboard.writeText(flushOutput());
  buttonLabel(button, 'Copied');
  setTimeout(() => buttonLabel(button, 'Copy'), 1200);
 });
});
$('svg').addEventListener('click', event => {
 const button = event.currentTarget;
 const label = button.querySelector('span');
 const rest = label.textContent;
 serializedAction('svg', async () => {
  label.textContent = 'Building';
  try {
   const { svg, missed } = await buildStandaloneSvg();
   const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
   const anchor = document.createElement('a');
   anchor.href = url;
   anchor.download = `halo-banner-${SCOPE_ID}.svg`;
   anchor.click();
   setTimeout(() => URL.revokeObjectURL(url), 1000);
   label.textContent = missed.length ? `${missed.length} image linked` : 'Saved';
  } catch (error) {
   console.error('[halo] SVG export failed', error);
   label.textContent = 'Failed';
   throw error;
  } finally { setTimeout(() => { label.textContent = rest; }, 2000); }
 });
});
$('toggle-code').addEventListener('click', event => {
 const button = event.currentTarget;
 const showing = !$('code-view').hidden;
 const toggle = () => {
  $('code-view').hidden = showing;
  $('panel-controls').hidden = !showing;
  button.querySelector('span').textContent = showing ? 'Show code' : 'Hide code';
  button.setAttribute('aria-expanded', String(!showing));
 };
 if (showing) toggle();
 else serializedAction('show-code', () => { flushOutput(); toggle(); });
});
const stageInner = root.querySelector('.halo-stage-inner');
const stageResizer = $('stage-resizer');
/* The rail and the gap beside it are outside the preview's own width, so the
  row measures wider than the preview is allowed to get. Subtract them or the
  preview can be dragged past the column it lives in. */
function maxStageWidth() {
 const row = stageInner.parentElement;
 const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
 return row.clientWidth - stageResizer.getBoundingClientRect().width - gap;
}
stageResizer.addEventListener('pointerdown', event => {
 const startX = event.clientX;
 const startWidth = stageInner.getBoundingClientRect().width;
 const maxWidth = maxStageWidth();
 stageResizer.setPointerCapture(event.pointerId);
 stageResizer.classList.add('is-dragging');
 const resize = moveEvent => {
  const width = Math.min(maxWidth, Math.max(160, startWidth - (moveEvent.clientX - startX)));
  stageInner.style.width = width + 'px';
 };
 const stop = () => {
  stageResizer.classList.remove('is-dragging');
  stageResizer.removeEventListener('pointermove', resize);
  stageResizer.removeEventListener('pointerup', stop);
  stageResizer.removeEventListener('pointercancel', stop);
 };
 stageResizer.addEventListener('pointermove', resize);
 stageResizer.addEventListener('pointerup', stop);
 stageResizer.addEventListener('pointercancel', stop);
});
stageResizer.addEventListener('keydown', event => {
 if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
 event.preventDefault();
 const direction = event.key === 'ArrowLeft' ? 1 : -1;
 const maxWidth = maxStageWidth();
 const width = Math.min(maxWidth, Math.max(160, stageInner.getBoundingClientRect().width + direction * 10));
 stageInner.style.width = width + 'px';
});
link.addEventListener('click', e => e.preventDefault());
render();
updateImageStatus();
root.setAttribute(INIT_STATE_ATTRIBUTE, 'ready');
} catch (error) {
 root.removeAttribute(INIT_STATE_ATTRIBUTE);
 throw error;
}
}

waitForElement('[data-halo-generator] img.halo__img', image => {
	initGenerator(image.closest('[data-halo-generator]'));
});
})();

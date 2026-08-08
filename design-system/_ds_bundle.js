/* @ds-bundle: {"format":4,"namespace":"DCSWorkbenchDesignSystem_dafd54","components":[{"name":"Button","sourcePath":"components/controls/Button.jsx"},{"name":"IconButton","sourcePath":"components/controls/Button.jsx"},{"name":"Microbar","sourcePath":"components/controls/Microbar.jsx"},{"name":"MicrobarValue","sourcePath":"components/controls/Microbar.jsx"},{"name":"Segmented","sourcePath":"components/controls/Segmented.jsx"},{"name":"DataGrid","sourcePath":"components/data/DataGrid.jsx"},{"name":"ListRow","sourcePath":"components/data/ListRow.jsx"},{"name":"NodeGlyph","sourcePath":"components/data/NodeRow.jsx"},{"name":"NodeRow","sourcePath":"components/data/NodeRow.jsx"},{"name":"NodeRoles","sourcePath":"components/data/NodeRow.jsx"},{"name":"TreeNode","sourcePath":"components/data/Tree.jsx"},{"name":"Tree","sourcePath":"components/data/Tree.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Chip","sourcePath":"components/feedback/Badge.jsx"},{"name":"CountPill","sourcePath":"components/feedback/Badge.jsx"},{"name":"Kbd","sourcePath":"components/feedback/Badge.jsx"},{"name":"Notice","sourcePath":"components/feedback/Notice.jsx"},{"name":"Toast","sourcePath":"components/feedback/Notice.jsx"},{"name":"State","sourcePath":"components/feedback/State.jsx"},{"name":"Skeleton","sourcePath":"components/feedback/State.jsx"},{"name":"ScanBar","sourcePath":"components/feedback/State.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Field.jsx"},{"name":"Textarea","sourcePath":"components/forms/Field.jsx"},{"name":"Select","sourcePath":"components/forms/Field.jsx"},{"name":"ResizeRail","sourcePath":"components/forms/ResizeRail.jsx"},{"name":"Slider","sourcePath":"components/forms/Slider.jsx"},{"name":"Swatches","sourcePath":"components/forms/Swatches.jsx"},{"name":"Toggle","sourcePath":"components/forms/Toggle.jsx"},{"name":"Check","sourcePath":"components/forms/Toggle.jsx"},{"name":"Icon","sourcePath":"components/identity/Icon.jsx"},{"name":"PlayGlyph","sourcePath":"components/identity/Icon.jsx"},{"name":"PinGlyph","sourcePath":"components/identity/Icon.jsx"},{"name":"DragGlyph","sourcePath":"components/identity/Icon.jsx"},{"name":"ProductGlyph","sourcePath":"components/identity/Icon.jsx"},{"name":"PRODUCT_NAMES","sourcePath":"components/identity/Icon.jsx"},{"name":"ICON_NAMES","sourcePath":"components/identity/Icon.jsx"},{"name":"GRIDS","sourcePath":"components/identity/Mark.jsx"},{"name":"Mark","sourcePath":"components/identity/Mark.jsx"},{"name":"InstrumentMark","sourcePath":"components/identity/Mark.jsx"},{"name":"Wordmark","sourcePath":"components/identity/Mark.jsx"},{"name":"Crumbs","sourcePath":"components/navigation/Crumbs.jsx"},{"name":"Rail","sourcePath":"components/navigation/Rail.jsx"},{"name":"RailLabel","sourcePath":"components/navigation/Rail.jsx"},{"name":"RailItem","sourcePath":"components/navigation/Rail.jsx"},{"name":"RailSep","sourcePath":"components/navigation/Rail.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Dialog","sourcePath":"components/overlay/Dialog.jsx"},{"name":"Menu","sourcePath":"components/overlay/Menu.jsx"},{"name":"MenuLabel","sourcePath":"components/overlay/Menu.jsx"},{"name":"MenuItem","sourcePath":"components/overlay/Menu.jsx"},{"name":"MenuSep","sourcePath":"components/overlay/Menu.jsx"},{"name":"TipHost","sourcePath":"components/overlay/TipHost.jsx"},{"name":"AppShell","sourcePath":"components/shell/AppShell.jsx"},{"name":"ToolShell","sourcePath":"components/shell/AppShell.jsx"},{"name":"Panel","sourcePath":"components/shell/AppShell.jsx"},{"name":"PanelTitle","sourcePath":"components/shell/AppShell.jsx"},{"name":"Controls","sourcePath":"components/shell/AppShell.jsx"},{"name":"ControlGroup","sourcePath":"components/shell/AppShell.jsx"},{"name":"ControlRow","sourcePath":"components/shell/AppShell.jsx"},{"name":"Canvas","sourcePath":"components/shell/AppShell.jsx"},{"name":"Splitter","sourcePath":"components/shell/AppShell.jsx"}],"sourceHashes":{"assets/icons.js":"aea151408b0f","components/controls/Button.jsx":"bb3dd57ce610","components/controls/Microbar.jsx":"01c9de1c3c8e","components/controls/Segmented.jsx":"1fdca8333c19","components/data/DataGrid.jsx":"825339a02b81","components/data/ListRow.jsx":"b66f17ee372a","components/data/NodeRow.jsx":"d996ad57de74","components/data/Tree.jsx":"5ff2c6b51868","components/feedback/Badge.jsx":"e941b3619ac3","components/feedback/Notice.jsx":"99ceaf305ef9","components/feedback/State.jsx":"74dd82449320","components/forms/Field.jsx":"f3f6e5e33a70","components/forms/ResizeRail.jsx":"4e6f6c3e79e4","components/forms/Slider.jsx":"0a2885cb460a","components/forms/Swatches.jsx":"c6ecf934687d","components/forms/Toggle.jsx":"20758f40c0cd","components/identity/Icon.jsx":"62154afd15fe","components/identity/Mark.jsx":"c9c0040634b2","components/navigation/Crumbs.jsx":"cf0c7903088d","components/navigation/Rail.jsx":"8b4016f62cb0","components/navigation/Tabs.jsx":"d3b48a0acf57","components/overlay/Dialog.jsx":"977cf6317d09","components/overlay/Menu.jsx":"334dc8d24efd","components/overlay/TipHost.jsx":"52bb01b5549f","components/shell/AppShell.jsx":"8eb064be11ac"},"inlinedExternals":[],"unexposedExports":[{"name":"roleForFile","sourcePath":"components/data/NodeRow.jsx"}]} */

(() => {

const __ds_ns = (window.DCSWorkbenchDesignSystem_dafd54 = window.DCSWorkbenchDesignSystem_dafd54 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/icons.js
try { (() => {
/* DCS Workbench icon sprite — self-injecting.
   <script src="assets/icons.js"></script> in <head>, then anywhere:
     <svg width="15" height="15" aria-hidden="true"><use href="#dcs-folder"></use></svg>
   The same symbols are in assets/icons.svg for build pipelines that can
   reference an external sprite. */
(function () {
  var d = document.createElement('div');
  d.setAttribute('aria-hidden', 'true');
  d.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  d.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\">\n\n  <symbol id=\"dcs-file\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\"></path><path d=\"M14 2v4a2 2 0 0 0 2 2h4\"></path></symbol>\n  <symbol id=\"dcs-folder\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z\"></path></symbol>\n  <symbol id=\"dcs-folder-open\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2\"></path></symbol>\n  <symbol id=\"dcs-star\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M11.5 2.8a.55.55 0 0 1 1 0l2.3 4.68a2.1 2.1 0 0 0 1.6 1.16l5.16.75a.53.53 0 0 1 .3.91l-3.74 3.64a2.1 2.1 0 0 0-.61 1.87l.88 5.14a.53.53 0 0 1-.77.56l-4.62-2.43a2.1 2.1 0 0 0-1.97 0L6.4 21.5a.53.53 0 0 1-.77-.56l.88-5.14a2.1 2.1 0 0 0-.61-1.88L2.16 10.3a.53.53 0 0 1 .29-.9l5.17-.76a2.1 2.1 0 0 0 1.6-1.16z\"></path></symbol>\n  <symbol id=\"dcs-download\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"></path><path d=\"m7 10 5 5 5-5\"></path><path d=\"M12 15V3\"></path></symbol>\n  <symbol id=\"dcs-upload\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"></path><path d=\"m17 8-5-5-5 5\"></path><path d=\"M12 3v12\"></path></symbol>\n  <symbol id=\"dcs-trash\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 6h18\"></path><path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6\"></path><path d=\"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></path><path d=\"M10 11v6\"></path><path d=\"M14 11v6\"></path></symbol>\n  <symbol id=\"dcs-search\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"7\" cy=\"7\" r=\"4.5\"></circle><path d=\"m10.5 10.5 3 3\"></path></symbol>\n  <symbol id=\"dcs-refresh\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13.2 8A5.2 5.2 0 1 1 11 3.8\"></path><path d=\"M13.2 2.6v3.2H10\"></path></symbol>\n  <symbol id=\"dcs-plus\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8 3.5v9M3.5 8h9\"></path></symbol>\n  <symbol id=\"dcs-close\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m4 4 8 8M12 4l-8 8\"></path></symbol>\n  <symbol id=\"dcs-check\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m3 8.5 3.2 3.2L13 4.8\"></path></symbol>\n  <symbol id=\"dcs-chevron\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 6.5 8 10.5 12 6.5\"></path></symbol>\n  <symbol id=\"dcs-maximize\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 2.5H2.5V6M10 13.5h3.5V10\"></path></symbol>\n  <symbol id=\"dcs-code\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 3.6 2.6 8 6 12.4M10 3.6 13.4 8 10 12.4\"></path></symbol>\n  <symbol id=\"dcs-layers\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m8 1.8 6 3.1-6 3.1-6-3.1z\"></path><path d=\"m2 8.1 6 3.1 6-3.1\"></path><path d=\"m2 11.2 6 3.1 6-3.1\"></path></symbol>\n  <symbol id=\"dcs-globe\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.35\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"8\" cy=\"8\" r=\"6\"></circle><path d=\"M2.2 8h11.6M8 2c1.8 1.7 2.8 3.7 2.8 6S9.8 12.3 8 14M8 2C6.2 3.7 5.2 5.7 5.2 8s1 4.3 2.8 6\"></path></symbol>\n  <symbol id=\"dcs-shield\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8 1.8 13 3.6v3.6c0 3.2-2.1 5.6-5 6.9-2.9-1.3-5-3.7-5-6.9V3.6z\"></path><path d=\"m5.8 7.8 1.6 1.6 2.9-3\"></path></symbol>\n  <symbol id=\"dcs-link\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6.5 9.5 9.5 6.5\"></path><path d=\"M7.5 4.6 9 3.1a2.6 2.6 0 0 1 3.7 3.7L11.4 8.5\"></path><path d=\"M8.5 11.4 7 12.9a2.6 2.6 0 0 1-3.7-3.7L4.6 7.5\"></path></symbol>\n  <symbol id=\"dcs-info\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"8\" cy=\"8\" r=\"6\"></circle><path d=\"M8 7.4v3.4M8 5.3v.1\"></path></symbol>\n  <symbol id=\"dcs-warn\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8 2.4 14.3 13H1.7z\"></path><path d=\"M8 6.6v3M8 11.2v.1\"></path></symbol>\n  <symbol id=\"dcs-error\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"8\" cy=\"8\" r=\"6\"></circle><path d=\"m5.8 5.8 4.4 4.4M10.2 5.8l-4.4 4.4\"></path></symbol>\n  <symbol id=\"dcs-play\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"0\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 3.2 12.2 8 5 12.8z\" fill=\"currentColor\" stroke=\"none\"></path></symbol>\n  <symbol id=\"dcs-arrow-left\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 3-5 5 5 5M2.5 8H14\"></path></symbol>\n  <symbol id=\"dcs-arrow-right\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 8h9M8.8 4.2 12.6 8l-3.8 3.8\"></path></symbol>\n  <symbol id=\"dcs-clock\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.35\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"7.2\" cy=\"8\" r=\"4.8\"></circle><path d=\"M7.2 5.4v3l2 1.2M12.2 4.2h2v2\"></path></symbol>\n  <symbol id=\"dcs-list\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"2.7\" cy=\"4\" r=\".9\" fill=\"currentColor\" stroke=\"none\"></circle><circle cx=\"2.7\" cy=\"8\" r=\".9\" fill=\"currentColor\" stroke=\"none\"></circle><circle cx=\"2.7\" cy=\"12\" r=\".9\" fill=\"currentColor\" stroke=\"none\"></circle><path d=\"M5.5 4h8M5.5 8h8M5.5 12h8\"></path></symbol>\n  <symbol id=\"dcs-minus\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 8h8\"></path></symbol>\n  <symbol id=\"dcs-chevron-up\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 10.5 8 5.5l5 5\"></path></symbol>\n  <symbol id=\"dcs-edit\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m10.8 2.5 2.7 2.7-7.7 7.7-3.3.6.6-3.3z\"></path><path d=\"m9.5 3.8 2.7 2.7\"></path></symbol>\n  <symbol id=\"dcs-wrap\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2.5 4h11M2.5 8h7.5a2 2 0 1 1 0 4H8\"></path><path d=\"M9.5 10.5 8 12l1.5 1.5\"></path></symbol>\n  <symbol id=\"dcs-eval\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13 3v5a2 2 0 0 1-2 2H3\"></path><path d=\"m5.5 7.5-2.5 2.5 2.5 2.5\"></path></symbol>\n  <symbol id=\"dcs-sun\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0\"></path><path d=\"M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4\"></path></symbol>\n  <symbol id=\"dcs-moon\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13 9.5A5.5 5.5 0 1 1 6.5 3a4.3 4.3 0 0 0 6.5 6.5z\"></path></symbol>\n  <symbol id=\"dcs-pin\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4.5 2.5h7v11L8 10.6l-3.5 2.9z\"></path></symbol>\n  <symbol id=\"dcs-library\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 11.5V3a1.5 1.5 0 0 1 1.5-1.5h6A1.5 1.5 0 0 1 14 3a1.5 1.5 0 0 1-1.5 1.5H11v8.5a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 2 13a1.5 1.5 0 0 1 1.5-1.5H5z\"></path></symbol>\n  <symbol id=\"dcs-pane-left\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3.2 2.7h9.6a1.4 1.4 0 0 1 1.4 1.4v8.2a1.4 1.4 0 0 1-1.4 1.4H3.2a1.4 1.4 0 0 1-1.4-1.4V4.1a1.4 1.4 0 0 1 1.4-1.4z\"></path><path d=\"M6.3 2.7v10.6\"></path></symbol>\n  <symbol id=\"dcs-pane-right\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3.2 2.7h9.6a1.4 1.4 0 0 1 1.4 1.4v8.2a1.4 1.4 0 0 1-1.4 1.4H3.2a1.4 1.4 0 0 1-1.4-1.4V4.1a1.4 1.4 0 0 1 1.4-1.4z\"></path><path d=\"M9.7 2.7v10.6\"></path></symbol>\n  <symbol id=\"dcs-pane-bottom\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3.2 2.7h9.6a1.4 1.4 0 0 1 1.4 1.4v8.2a1.4 1.4 0 0 1-1.4 1.4H3.2a1.4 1.4 0 0 1-1.4-1.4V4.1a1.4 1.4 0 0 1 1.4-1.4z\"></path><path d=\"M1.8 9.9h12.4\"></path></symbol>\n  <symbol id=\"dcs-sharepoint\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\"><path d=\"M9 9.5c-1.167-.333-3.5-.6-3.5 1S9 12 9 13.5c0 2-2.667 1.167-4 1\"></path><path d=\"M17 19a5.5 5.5 0 1 0-4.5-8.663\"></path><path d=\"M9.126 17.5a4 4 0 0 0 3.874 5c2.18 0 4-1.846 4-4a4 4 0 0 0-4.5-3.97\"></path><path d=\"M18.472 8.086A6 6 0 0 0 6.583 6.5\"></path><path d=\"M1.5 16.5v-9a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1Z\"></path></symbol>\n  <symbol id=\"dcs-settings\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0\"></path><path d=\"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z\"></path></symbol>\n  <symbol id=\"dcs-site\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2.2 13.3V6.5L8 2.3l5.8 4.2v6.8z\"></path><path d=\"M6.2 13.3V9.4h3.6v3.9\"></path></symbol>\n  <symbol id=\"dcs-pages\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3.4 1.8h6.4l2.8 2.8v9.6H3.4z\"></path><path d=\"M9.6 1.8v3h3\"></path><path d=\"M5.4 8h5.2M5.4 10.4h5.2\"></path></symbol>\n  <symbol id=\"dcs-query\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M11.4 7A4.4 4.4 0 1 1 2.6 7a4.4 4.4 0 0 1 8.8 0\"></path><path d=\"M5.2 7h3.6M7 5.2v3.6\"></path><path d=\"m13.5 13.5-3.2-3.2\"></path></symbol>\n  <symbol id=\"dcs-advanced\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0\"></path><path d=\"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z\"></path></symbol>\n</svg>";
  (document.body || document.documentElement).appendChild(d);
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/icons.js", error: String((e && e.message) || e) }); }

// components/controls/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* One system, height-tiered by CONTAINER, not by taste. The solid accent
   fill appears exactly ONCE per screen — on the verb that runs the tool. If
   two actions both matter, the secondary becomes variant="soft".
   lg 28 topbar · md 26 default · sm 22 panel head · xs 20 escape hatch
   (grouped, glyph-only, always titled). Never mix two tiers in one row. */
const VARIANT = {
  primary: 'dcs-btn-primary',
  soft: 'dcs-btn-soft',
  ghost: 'dcs-btn-ghost',
  danger: 'dcs-btn-danger',
  default: ''
};
const SIZE = {
  lg: 'dcs-btn-lg',
  md: '',
  sm: 'dcs-btn-sm',
  xs: 'dcs-btn-xs'
};
function Button({
  variant = 'default',
  size = 'md',
  kbd,
  className = '',
  children,
  ...rest
}) {
  const cls = ['dcs-btn', VARIANT[variant] || '', SIZE[size] || '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls
  }, rest), children, kbd ? /*#__PURE__*/React.createElement("span", {
    className: "dcs-kbd-inline"
  }, kbd) : null);
}

/* Square button at the same tiers. Glyph-only, so it ALWAYS needs a title;
   the accessible name lives on the button, never on the svg. */
function IconButton({
  size = 'md',
  variant = 'ghost',
  title,
  className = '',
  children,
  ...rest
}) {
  const cls = ['dcs-btn', 'dcs-btn-icon', VARIANT[variant] || '', SIZE[size] || '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls,
    title: title,
    "aria-label": rest['aria-label'] || title
  }, rest), children);
}
Object.assign(__ds_scope, { Button, IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/controls/Button.jsx", error: String((e && e.message) || e) }); }

// components/controls/Microbar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* THE XS ESCAPE HATCH. A whole toolbar inside a 22px strip — DCSPad's Browser
   address bar is the reference case: six controls and a live URL inside a
   230px sidebar. Controls are WELDED into one bordered strip with 1px
   dividers; six loose 20px buttons at this scale read as confetti.
   Glyph-only, and every child carries a title because the glyph is doing all
   the work. Do not build a whole view out of this. */
function Microbar({
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ('dcs-microbar ' + className).trim()
  }, rest), children);
}

/* The live value in the middle of the strip — mono, ellipsised, not editable. */
function MicrobarValue({
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "dcs-microbar-value"
  }, rest), children);
}
Object.assign(__ds_scope, { Microbar, MicrobarValue });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/controls/Microbar.jsx", error: String((e && e.message) || e) }); }

// components/controls/Segmented.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Two to four mutually exclusive views. The active segment fills with --bg-3
   and its label goes accent — it is not a solid accent fill, so it never
   spends the screen's one accent budget. */
function Segmented({
  options = [],
  value,
  onChange,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ('dcs-seg ' + className).trim(),
    role: "tablist"
  }, rest), options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const label = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      type: "button",
      role: "tab",
      "aria-selected": v === value,
      className: v === value ? 'is-active' : '',
      onClick: onChange ? () => onChange(v) : undefined
    }, label);
  }));
}
Object.assign(__ds_scope, { Segmented });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/controls/Segmented.jsx", error: String((e && e.message) || e) }); }

// components/data/DataGrid.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Sticky header on chrome ground · no zebra (hover is the affordance) ·
   IDs, GUIDs and paths in mono · quantities right-aligned · one accent
   underline on the sorted column. */
function DataGrid({
  columns = [],
  rows = [],
  sort,
  onSort,
  onOpenRow,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ('dcs-grid-wrap ' + className).trim()
  }, rest), /*#__PURE__*/React.createElement("table", {
    className: "dcs-grid"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    className: sort && sort.key === c.key ? 'is-sorted' : '',
    style: c.num ? {
      textAlign: 'right'
    } : undefined,
    onClick: onSort ? () => onSort(c.key) : undefined
  }, c.label, sort && sort.key === c.key ? /*#__PURE__*/React.createElement("span", {
    className: "dcs-grid-sort"
  }, sort.dir === 'desc' ? '▼' : '▲') : null)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: r.id ?? i,
    className: [r.selected ? 'is-selected' : '', onOpenRow ? 'is-openable' : ''].filter(Boolean).join(' '),
    onClick: onOpenRow ? () => onOpenRow(r) : undefined
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    className: c.num ? 'dcs-num' : c.mono ? 'dcs-mono' : '',
    style: r.dim ? {
      color: 'var(--fg-faint)'
    } : undefined
  }, c.render ? c.render(r) : r[c.key])))))));
}
Object.assign(__ds_scope, { DataGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataGrid.jsx", error: String((e && e.message) || e) }); }

// components/data/ListRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Sidebar catalogs and file pickers. Selected rows keep a RESTING state —
   accent rail + chrome ground — so selection survives losing hover. Row
   tools fade in with opacity, not visibility, so they stay clickable and
   testable. */
function ListRow({
  lead,
  name,
  meta,
  tools,
  on = false,
  muted = false,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['dcs-listrow', on ? 'is-on' : '', className].filter(Boolean).join(' ')
  }, rest), lead, /*#__PURE__*/React.createElement("span", {
    className: "dcs-listrow-name",
    style: muted ? {
      color: 'var(--fg-faint)',
      fontStyle: 'italic'
    } : undefined
  }, name), meta ? /*#__PURE__*/React.createElement("span", {
    className: "dcs-listrow-meta"
  }, meta) : null, tools ? /*#__PURE__*/React.createElement("span", {
    className: "dcs-listrow-tools"
  }, tools) : null);
}
Object.assign(__ds_scope, { ListRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ListRow.jsx", error: String((e && e.message) || e) }); }

// components/data/NodeRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Folders carry role, files carry type — Lucide outlines, each a single
   closed path so the tint fill and the stroke ride the same edge.
   TWO TIERS: the bare role paints REST (low chroma, so 200 rows read as one
   calm list). calledOut opts into the bright pair, and is rationed — the
   folder you are inside, the selected row, a filter match, a file changed
   since last sync. If everything is called out, nothing is. */
const FOLDER = 'M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z';
const FILE_BODY = 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z';
const FILE_FOLD = 'M14 2v4a2 2 0 0 0 2 2h4';

/* Near relatives inherit: .ts/.mjs → js, .scss → css, .svg → html,
   .csv/.xlsx → json (Data). Anything else is grey — a sixth hue needs a
   sixth pane to justify it. */
const EXT = {
  js: 'js',
  ts: 'js',
  mjs: 'js',
  cjs: 'js',
  jsx: 'js',
  tsx: 'js',
  html: 'html',
  htm: 'html',
  svg: 'html',
  aspx: 'html',
  css: 'css',
  scss: 'css',
  less: 'css',
  json: 'json',
  csv: 'json',
  xlsx: 'json',
  xls: 'json',
  xml: 'json',
  pdf: 'doc',
  docx: 'doc',
  doc: 'doc',
  pptx: 'doc',
  md: 'doc',
  txt: 'doc'
};
function roleForFile(name) {
  const m = /\.([a-z0-9]+)$/i.exec(name || '');
  return m && EXT[m[1].toLowerCase()] || 'file';
}

/* Colour comes from the CSS classes, never from a hex here: .dcs-node-<role>
   paints rest, .is-called-out swaps in the active pair, .dcs-node-open is
   the current folder. */
function NodeGlyph({
  kind = 'file',
  role = 'file',
  calledOut = false,
  size = 15,
  className = '',
  ...rest
}) {
  const cls = ['dcs-node', role === 'open' ? 'dcs-node-open' : 'dcs-node-' + role, calledOut ? 'is-called-out' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("svg", _extends({
    className: cls,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    focusable: "false",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, rest), kind === 'folder' ? /*#__PURE__*/React.createElement("path", {
    d: FOLDER
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: FILE_BODY
  }), /*#__PURE__*/React.createElement("path", {
    d: FILE_FOLD
  })));
}
function NodeRow({
  node = {},
  calledOut,
  onClick,
  className = '',
  ...rest
}) {
  const hi = calledOut ?? node.calledOut ?? false;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: ['dcs-noderow', hi ? 'is-called-out' : '', className].filter(Boolean).join(' '),
    onClick: onClick
  }, rest), /*#__PURE__*/React.createElement(NodeGlyph, {
    kind: node.kind,
    role: node.role || (node.kind === 'folder' ? 'user' : roleForFile(node.name)),
    calledOut: hi
  }), /*#__PURE__*/React.createElement("span", {
    className: "dcs-noderow-name"
  }, node.name), /*#__PURE__*/React.createElement("span", {
    className: "dcs-noderow-meta"
  }, node.meta));
}

/* The bundler only puts CAPITALISED exports on window.<Namespace>, so
   roleForFile — correctly lowercase, it is a function not a component — was
   unreachable from a card or a kit that reads the global. NodeRoles is the
   capitalised door to it. roleForFile itself is unchanged and still exported;
   nothing that already imports it needs to move. */
const NodeRoles = {
  /** Map a filename to its node role. NodeRoles.forFile('a.scss') === 'css' */
  forFile: roleForFile,
  /** The extension → role table, for tools that need to extend it. */
  ext: EXT,
  /** Every role the system paints. */
  all: ['user', 'lib', 'sys', 'open', 'js', 'html', 'css', 'json', 'doc', 'file']
};
Object.assign(__ds_scope, { roleForFile, NodeGlyph, NodeRow, NodeRoles });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/NodeRow.jsx", error: String((e && e.message) || e) }); }

// components/data/Tree.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The inspector. Value colours deliberately mirror the Monaco palette, so a
   string looks the same in the editor and in the console tree. */
function valueClass(v) {
  if (v === null || v === undefined) return 'dcs-tree-null';
  if (typeof v === 'string') return 'dcs-tree-str';
  if (typeof v === 'number') return 'dcs-tree-num';
  if (typeof v === 'boolean') return 'dcs-tree-bool';
  return '';
}
function render(v) {
  if (v === null) return 'null';
  if (typeof v === 'string') return '"' + v + '"';
  return String(v);
}
function TreeNode({
  label,
  value,
  open = true,
  depth = 0
}) {
  const [isOpen, setOpen] = React.useState(open);
  const branch = value && typeof value === 'object';
  if (!branch) {
    return /*#__PURE__*/React.createElement("div", {
      className: "dcs-tree-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "dcs-tree-twist"
    }), /*#__PURE__*/React.createElement("span", {
      className: "dcs-tree-key"
    }, label), ":\xA0", /*#__PURE__*/React.createElement("span", {
      className: valueClass(value)
    }, render(value)));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: 'dcs-tree-row is-expandable' + (isOpen ? ' is-open' : ''),
    onClick: () => setOpen(!isOpen)
  }, /*#__PURE__*/React.createElement("span", {
    className: "dcs-tree-twist"
  }, "\u203A"), /*#__PURE__*/React.createElement("span", {
    className: "dcs-tree-key"
  }, label), ":\xA0", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-dim)'
    }
  }, Array.isArray(value) ? '[…]' : '{…}')), isOpen ? /*#__PURE__*/React.createElement("div", {
    className: "dcs-tree-children"
  }, Object.keys(value).map(k => /*#__PURE__*/React.createElement(TreeNode, {
    key: k,
    label: k,
    value: value[k],
    depth: depth + 1
  }))) : null);
}
function Tree({
  data = {},
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ('dcs-tree ' + className).trim()
  }, rest), Object.keys(data).map(k => /*#__PURE__*/React.createElement(TreeNode, {
    key: k,
    label: k,
    value: data[k]
  })));
}
Object.assign(__ds_scope, { TreeNode, Tree });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Tree.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The little file-type pill. Same triple as the node glyph, so a selected
   file and its badge can never drift apart. */
function Badge({
  type,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ('dcs-badge ' + className).trim(),
    "data-type": type
  }, rest), children ?? type);
}

/* The context signal — one home per tool, in the topbar or the status bar. */
function Chip({
  tone = 'default',
  children,
  className = '',
  ...rest
}) {
  const t = {
    ok: 'dcs-chip-ok',
    warn: 'dcs-chip-warn',
    err: 'dcs-chip-err',
    default: ''
  }[tone] || '';
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['dcs-chip', t, className].filter(Boolean).join(' ')
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "dcs-chip-dot"
  }), children);
}

/* The error count on a tab — red, because it is telling you where a failure is. */
function CountPill({
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ('dcs-count ' + className).trim()
  }, rest), children);
}
function Kbd({
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("kbd", _extends({
    className: ('dcs-kbd ' + className).trim()
  }, rest), children);
}
Object.assign(__ds_scope, { Badge, Chip, CountPill, Kbd });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Notice.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Notices name the specific object and lead with the machine fact.
   "403 — the request digest expired. Retrying once." Never "Oops". */
function Notice({
  tone = 'default',
  icon,
  children,
  actions,
  className = '',
  ...rest
}) {
  const t = {
    info: 'dcs-notice-info',
    ok: 'dcs-notice-ok',
    warn: 'dcs-notice-warn',
    err: 'dcs-notice-err',
    default: ''
  }[tone] || '';
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['dcs-notice', t, className].filter(Boolean).join(' '),
    role: tone === 'err' ? 'alert' : undefined
  }, rest), icon, /*#__PURE__*/React.createElement("span", {
    className: "dcs-notice-body"
  }, children), actions);
}

/* Bottom-right, above the status bar. One event, one toast. */
function Toast({
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ('dcs-toast ' + className).trim(),
    role: "status"
  }, rest), children);
}
Object.assign(__ds_scope, { Notice, Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Notice.jsx", error: String((e && e.message) || e) }); }

// components/feedback/State.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Empty, loading, error — one centred monospace line, no illustration.
   Say what would appear here and how to make it appear, then stop. */
function State({
  tone = 'empty',
  children,
  className = '',
  ...rest
}) {
  const t = {
    loading: 'dcs-state-loading',
    err: 'dcs-state-err',
    empty: ''
  }[tone] || '';
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['dcs-state', t, className].filter(Boolean).join(' ')
  }, rest), children);
}

/* Only where the shape is known before the data lands — grid rows, cards. */
function Skeleton({
  width = '100%',
  height = 10,
  delay = 0,
  style,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("i", _extends({
    className: ('dcs-skel ' + className).trim(),
    style: {
      display: 'block',
      width,
      height,
      animationDelay: delay + 's',
      ...style
    }
  }, rest));
}

/* Work in progress. Sweeps once for a fast run (.is-sweeping on the parent);
   loops only while genuinely pending (.is-pending). */
function ScanBar({
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ('dcs-scanline ' + className).trim(),
    "aria-hidden": "true"
  }, rest));
}
Object.assign(__ds_scope, { State, Skeleton, ScanBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/State.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Label left, optional live value right in mono, control below, optional
   hint under that. The value is always visible on anything numeric — a
   slider with no readout is unusable in a generator. */
function Field({
  label,
  value,
  hint,
  invalid,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ('dcs-field ' + className).trim()
  }, rest), (label || value) && /*#__PURE__*/React.createElement("span", {
    className: "dcs-label"
  }, /*#__PURE__*/React.createElement("span", {
    style: invalid ? {
      color: 'var(--error-fg)'
    } : undefined
  }, label), value != null ? /*#__PURE__*/React.createElement("span", {
    className: "dcs-value"
  }, value) : null), children, hint ? /*#__PURE__*/React.createElement("span", {
    className: "dcs-hint",
    style: invalid ? {
      color: 'var(--error-fg)'
    } : undefined
  }, hint) : null);
}

/* mono for anything a machine produced or will consume — paths, URLs, GUIDs. */
function Input({
  mono,
  invalid,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("input", _extends({
    className: ['dcs-input', mono ? 'dcs-input-mono' : '', invalid ? 'is-invalid' : '', className].filter(Boolean).join(' ')
  }, rest));
}
function Textarea({
  mono,
  invalid,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("textarea", _extends({
    className: ['dcs-textarea', mono ? 'dcs-textarea-mono' : '', invalid ? 'is-invalid' : '', className].filter(Boolean).join(' ')
  }, rest));
}
function Select({
  options = [],
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("select", _extends({
    className: ('dcs-select ' + className).trim()
  }, rest), children || options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, typeof o === 'string' ? o : o.label);
  }));
}
Object.assign(__ds_scope, { Field, Input, Textarea, Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/ResizeRail.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* A draggable boundary that resizes ONE thing instead of splitting two —
   Halo's banner preview is the reference case. Splitter vocabulary, but the
   rail is drawn AT REST, because there is no second pane to imply it and it
   has to announce itself. Not a slider: no value, no readout, no ticks. If
   the number matters, use Slider. */
function ResizeRail({
  horizontal = false,
  dragging = false,
  tip = 'Drag to resize preview',
  label,
  onPointerDown,
  className = '',
  ...rest
}) {
  const cls = ['dcs-resize-rail', horizontal ? 'dcs-resize-rail-h' : '', 'dcs-tip-host', dragging ? 'is-dragging' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    role: "separator",
    tabIndex: 0,
    "aria-orientation": horizontal ? 'horizontal' : 'vertical',
    "aria-label": label || tip,
    onPointerDown: onPointerDown
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "dcs-resize-grip"
  }), tip ? /*#__PURE__*/React.createElement("span", {
    className: 'dcs-tip' + (horizontal ? ' dcs-tip-below' : '')
  }, tip) : null);
}
Object.assign(__ds_scope, { ResizeRail });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ResizeRail.jsx", error: String((e && e.message) || e) }); }

// components/forms/Slider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* 4px track, accent fill, 5 × 12 thumb. The filled portion is driven by a
   --fill custom property, set here rather than by a stylesheet, because it
   is a live value. Always pair it with a Field so the number is visible. */
function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  className = '',
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, (Number(value) - min) / (max - min) * 100));
  return /*#__PURE__*/React.createElement("input", _extends({
    type: "range",
    className: ('dcs-slider ' + className).trim(),
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: onChange,
    style: {
      '--fill': pct + '%',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Slider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Slider.jsx", error: String((e && e.message) || e) }); }

// components/forms/Swatches.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Curated colours, never a free picker. Three to six values that the tool's
   output actually supports. */
function Swatches({
  colors = [],
  value,
  onChange,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ('dcs-swatches ' + className).trim()
  }, rest), colors.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    type: "button",
    title: c,
    "aria-label": c,
    className: 'dcs-swatch' + (c === value ? ' is-active' : ''),
    style: {
      background: c
    },
    onClick: onChange ? () => onChange(c) : undefined
  })));
}
Object.assign(__ds_scope, { Swatches });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Swatches.jsx", error: String((e && e.message) || e) }); }

// components/forms/Toggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* A binary setting that takes effect immediately. If it needs a Save to
   apply, it is a checkbox in a form, not a toggle. */
function Toggle({
  label,
  checked,
  onChange,
  disabled,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({
    className: ('dcs-toggle ' + className).trim()
  }, rest), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange
  }), /*#__PURE__*/React.createElement("span", {
    className: "dcs-toggle-pill"
  }), label);
}

/* Checkbox — a value in a form, submitted with everything else. */
function Check({
  label,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ('dcs-check ' + className).trim()
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox"
  }, rest)), label);
}
Object.assign(__ds_scope, { Toggle, Check });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/identity/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The core icon set, inlined so a tool stays a single copyable file with no
   CDN and no icon package. Geometry rule: a 16 grid at stroke 1.4 or a 24
   grid at stroke 2 — both land on a ~1.35px line at 15–16px, so the two mix.
   Copy from DCSPad first, Lucide (lucide.dev) second, draw third.
   The same paths live in assets/icons.svg as a <symbol> sprite. */
const G = {
  file: ['0 0 24 24', 2, ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4']],
  folder: ['0 0 24 24', 2, ['M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z']],
  'folder-open': ['0 0 24 24', 2, ['m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2']],
  star: ['0 0 24 24', 2, ['M11.5 2.8a.55.55 0 0 1 1 0l2.3 4.68a2.1 2.1 0 0 0 1.6 1.16l5.16.75a.53.53 0 0 1 .3.91l-3.74 3.64a2.1 2.1 0 0 0-.61 1.87l.88 5.14a.53.53 0 0 1-.77.56l-4.62-2.43a2.1 2.1 0 0 0-1.97 0L6.4 21.5a.53.53 0 0 1-.77-.56l.88-5.14a2.1 2.1 0 0 0-.61-1.88L2.16 10.3a.53.53 0 0 1 .29-.9l5.17-.76a2.1 2.1 0 0 0 1.6-1.16z']],
  download: ['0 0 24 24', 2, ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm7 10 5 5 5-5', 'M12 15V3']],
  upload: ['0 0 24 24', 2, ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm17 8-5-5-5 5', 'M12 3v12']],
  trash: ['0 0 24 24', 2, ['M3 6h18', 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6', 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', 'M10 11v6', 'M14 11v6']],
  search: ['0 0 16 16', 1.5, ['M11.5 7A4.5 4.5 0 1 1 2.5 7a4.5 4.5 0 0 1 9 0', 'm10.5 10.5 3 3']],
  refresh: ['0 0 16 16', 1.4, ['M13.2 8A5.2 5.2 0 1 1 11 3.8', 'M13.2 2.6v3.2H10']],
  plus: ['0 0 16 16', 1.4, ['M8 3.5v9M3.5 8h9']],
  close: ['0 0 16 16', 1.4, ['m4 4 8 8M12 4l-8 8']],
  check: ['0 0 16 16', 1.7, ['m3 8.5 3.2 3.2L13 4.8']],
  chevron: ['0 0 16 16', 2, ['M4 6.5 8 10.5 12 6.5']],
  maximize: ['0 0 16 16', 1.5, ['M6 2.5H2.5V6M10 13.5h3.5V10']],
  code: ['0 0 16 16', 1.5, ['M6 3.6 2.6 8 6 12.4M10 3.6 13.4 8 10 12.4']],
  layers: ['0 0 16 16', 1.4, ['m8 1.8 6 3.1-6 3.1-6-3.1z', 'm2 8.1 6 3.1 6-3.1', 'm2 11.2 6 3.1 6-3.1']],
  globe: ['0 0 16 16', 1.35, ['M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0', 'M2.2 8h11.6M8 2c1.8 1.7 2.8 3.7 2.8 6S9.8 12.3 8 14M8 2C6.2 3.7 5.2 5.7 5.2 8s1 4.3 2.8 6']],
  shield: ['0 0 16 16', 1.4, ['M8 1.8 13 3.6v3.6c0 3.2-2.1 5.6-5 6.9-2.9-1.3-5-3.7-5-6.9V3.6z', 'm5.8 7.8 1.6 1.6 2.9-3']],
  link: ['0 0 16 16', 1.4, ['M6.5 9.5 9.5 6.5', 'M7.5 4.6 9 3.1a2.6 2.6 0 0 1 3.7 3.7L11.4 8.5', 'M8.5 11.4 7 12.9a2.6 2.6 0 0 1-3.7-3.7L4.6 7.5']],
  info: ['0 0 16 16', 1.5, ['M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0', 'M8 7.4v3.4M8 5.3v.1']],
  warn: ['0 0 16 16', 1.5, ['M8 2.4 14.3 13H1.7z', 'M8 6.6v3M8 11.2v.1']],
  error: ['0 0 16 16', 1.5, ['M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0', 'm5.8 5.8 4.4 4.4M10.2 5.8l-4.4 4.4']],
  'arrow-left': ['0 0 16 16', 1.6, ['m7 3-5 5 5 5M2.5 8H14']],
  'arrow-right': ['0 0 16 16', 1.6, ['M3 8h9M8.8 4.2 12.6 8l-3.8 3.8']],
  clock: ['0 0 16 16', 1.35, ['M12 8a4.8 4.8 0 1 1-9.6 0 4.8 4.8 0 0 1 9.6 0', 'M7.2 5.4v3l2 1.2M12.2 4.2h2v2']],
  list: ['0 0 16 16', 1.4, ['M5.5 4h8M5.5 8h8M5.5 12h8', 'M3.6 4a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0', 'M3.6 8a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0', 'M3.6 12a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0']],
  /* DCSPad's own shipping glyphs, copied from whywhyjoe/sp-dcspad. */
  minus: ['0 0 16 16', 1.5, ['M4 8h8']],
  'chevron-up': ['0 0 16 16', 1.5, ['M3 10.5 8 5.5l5 5']],
  edit: ['0 0 16 16', 1.4, ['m10.8 2.5 2.7 2.7-7.7 7.7-3.3.6.6-3.3z', 'm9.5 3.8 2.7 2.7']],
  wrap: ['0 0 16 16', 1.4, ['M2.5 4h11M2.5 8h7.5a2 2 0 1 1 0 4H8', 'M9.5 10.5 8 12l1.5 1.5']],
  eval: ['0 0 16 16', 1.5, ['M13 3v5a2 2 0 0 1-2 2H3', 'm5.5 7.5-2.5 2.5 2.5 2.5']],
  sun: ['0 0 16 16', 1.4, ['M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0', 'M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4']],
  moon: ['0 0 16 16', 1.4, ['M13 9.5A5.5 5.5 0 1 1 6.5 3a4.3 4.3 0 0 0 6.5 6.5z']],
  pin: ['0 0 16 16', 1.4, ['M4.5 2.5h7v11L8 10.6l-3.5 2.9z']],
  library: ['0 0 16 16', 1.3, ['M5 11.5V3a1.5 1.5 0 0 1 1.5-1.5h6A1.5 1.5 0 0 1 14 3a1.5 1.5 0 0 1-1.5 1.5H11v8.5a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 2 13a1.5 1.5 0 0 1 1.5-1.5H5z']],
  'pane-left': ['0 0 16 16', 1.3, ['M3.2 2.7h9.6a1.4 1.4 0 0 1 1.4 1.4v8.2a1.4 1.4 0 0 1-1.4 1.4H3.2a1.4 1.4 0 0 1-1.4-1.4V4.1a1.4 1.4 0 0 1 1.4-1.4z', 'M6.3 2.7v10.6']],
  'pane-right': ['0 0 16 16', 1.3, ['M3.2 2.7h9.6a1.4 1.4 0 0 1 1.4 1.4v8.2a1.4 1.4 0 0 1-1.4 1.4H3.2a1.4 1.4 0 0 1-1.4-1.4V4.1a1.4 1.4 0 0 1 1.4-1.4z', 'M9.7 2.7v10.6']],
  'pane-bottom': ['0 0 16 16', 1.3, ['M3.2 2.7h9.6a1.4 1.4 0 0 1 1.4 1.4v8.2a1.4 1.4 0 0 1-1.4 1.4H3.2a1.4 1.4 0 0 1-1.4-1.4V4.1a1.4 1.4 0 0 1 1.4-1.4z', 'M1.8 9.9h12.4']],
  /* The SharePoint mark, drawn to the system's own rule — 24 grid, stroke 1.5,
     currentColor. It is the glyph on the topbar's "Open SP Workbench" button.
     Microsoft trademark: use it only where the control opens SharePoint. */
  sharepoint: ['0 0 24 24', 1.5, ['M9 9.5c-1.167-.333-3.5-.6-3.5 1S9 12 9 13.5c0 2-2.667 1.167-4 1', 'M17 19a5.5 5.5 0 1 0-4.5-8.663', 'M9.126 17.5a4 4 0 0 0 3.874 5c2.18 0 4-1.846 4-4a4 4 0 0 0-4.5-3.97', 'M18.472 8.086A6 6 0 0 0 6.583 6.5', 'M1.5 16.5v-9a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1Z']],
  /* A real toothed gear (Lucide, 24 grid). It must NOT be the rail's
     spoke-circle — at 15px that reads as a sun, and the set already has one.
     The shipping topbar uses Microsoft's filled Fluent gear; that is a product
     mark, not this. */
  settings: ['0 0 24 24', 2, ['M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0', 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z']],
  /* SP Workbench rail glyphs — the source's own 16-grid shapes. */
  site: ['0 0 16 16', 1.4, ['M2.2 13.3V6.5L8 2.3l5.8 4.2v6.8z', 'M6.2 13.3V9.4h3.6v3.9']],
  pages: ['0 0 16 16', 1.4, ['M3.4 1.8h6.4l2.8 2.8v9.6H3.4z', 'M9.6 1.8v3h3', 'M5.4 8h5.2M5.4 10.4h5.2']],
  query: ['0 0 16 16', 1.4, ['M11.4 7A4.4 4.4 0 1 1 2.6 7a4.4 4.4 0 0 1 8.8 0', 'M5.2 7h3.6M7 5.2v3.6', 'm13.5 13.5-3.2-3.2']]
};
function Icon({
  name,
  size = 15,
  strokeWidth,
  style,
  ...rest
}) {
  const g = G[name];
  if (!g) return null;
  const [viewBox, sw, ds] = g;
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: viewBox,
    "aria-hidden": "true",
    focusable: "false",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth ?? sw,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flex: 'none',
      display: 'block',
      ...style
    }
  }, rest), ds.map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: d
  })));
}

/* Solid play triangle — the one filled glyph in the set, used only on the
   primary Run verb. */
function PlayGlyph({
  size = 13
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    "aria-hidden": "true",
    focusable: "false",
    style: {
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 3.2 12.2 8 5 12.8z",
    fill: "currentColor"
  }));
}

/* Two filled glyphs the app ships that the stroke set cannot express. The
   system's "no filled glyph among the line ones" rule holds: these are the
   named exceptions, exactly as PlayGlyph is. */
function PinGlyph({
  size = 12
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    "aria-hidden": "true",
    focusable: "false",
    style: {
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4.5 2.5h7v11L8 10.6l-3.5 2.9z",
    fill: "currentColor"
  }));
}

/* The drag handle on a reorderable row — six dots, never a stroke shape. */
function DragGlyph({
  size = 12
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    "aria-hidden": "true",
    focusable: "false",
    style: {
      flex: 'none'
    }
  }, [3.5, 8, 12.5].map(cy => /*#__PURE__*/React.createElement(React.Fragment, {
    key: cy
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: cy,
    r: "1",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: cy,
    r: "1",
    fill: "currentColor"
  }))));
}

/* ── Product marks ───────────────────────────────────────────────────────
   Microsoft marks the shipping app uses. They are filled, they sit on foreign
   grids, and they are trademarks — so they are NOT in the icon set and never
   mix into a row of DCS glyphs. Use one only where the control opens the
   product it names; never recoloured into the accent.
     <ProductGlyph name="copilot" />    topbar → Microsoft 365 Copilot
     <ProductGlyph name="sharepoint" /> topbar → Open SP Workbench
   Standalone copies: assets/icons-product/. The SharePoint mark is also
   available as <Icon name="sharepoint" /> because it is drawn to the system's
   own rule. */
const PRODUCT = {
  copilot: ['0 0 20 20', 'fill', ['M5.93 2h6.2c1.06 0 1.99.7 2.29 1.7l.47 1.6c.16.55.64.93 1.2.98h.28c.9 0 1.58.25 2.03.77.44.5.6 1.17.6 1.84.02 1.32-.5 2.96-.9 4.27a12.57 12.57 0 01-1.45 3.22c-.61.9-1.45 1.62-2.58 1.62H7.86c-1.05 0-1.98-.7-2.28-1.7l-.47-1.6a1.38 1.38 0 00-1.2-.98h-.29c-.88 0-1.57-.25-2.02-.77a2.78 2.78 0 01-.6-1.84c-.02-1.32.5-2.96.9-4.26.37-1.14.83-2.32 1.44-3.23C3.96 2.72 4.8 2 5.93 2zM2.86 7.15C2.43 8.5 1.98 9.97 2 11.1c0 .55.13.94.35 1.2.2.23.57.42 1.27.42h2.63c.61 0 1.15-.4 1.32-.98.47-1.58 1.27-4.24 1.9-6.28l.03-.1c.15-.5.3-.96.45-1.38.13-.35.28-.69.46-.98H5.93c-.65 0-1.22.4-1.76 1.19-.53.78-.96 1.84-1.3 2.96zm2.87 6.57c.15.2.27.44.34.7l.47 1.6c.17.58.71.98 1.32.98h.03c.36 0 .6-.17.75-.38a4 4 0 00.47-.95c.15-.4.29-.83.44-1.33l.03-.1.2-.64c-.24.07-.49.11-.74.11H6.4l-.16.01h-.52zm2.46-1h.85c.55 0 1.04-.34 1.26-.84l1.17-3.9c.07-.25.19-.49.34-.7h-.85c-.55 0-1.04.34-1.26.83l-1.17 3.91c-.08.25-.19.49-.34.7zm2.03-6.32c.24-.07.49-.11.74-.11h3.31c-.15-.22-.27-.45-.34-.7l-.47-1.6c-.17-.59-.71-.99-1.32-.99h-.02a.92.92 0 00-.76.38 4 4 0 00-.48.96c-.14.38-.28.82-.43 1.32l-.03.1-.2.64zm6.92 6.45c.42-1.35.88-2.82.86-3.95 0-.55-.13-.94-.35-1.2-.2-.23-.57-.42-1.28-.42h-2.62c-.61 0-1.15.4-1.32.99-.47 1.57-1.27 4.23-1.9 6.27l-.03.1c-.15.5-.3.96-.45 1.38-.13.35-.28.69-.46.98h4.48c.65 0 1.22-.4 1.76-1.19.53-.78.96-1.84 1.3-2.96z']],
  sharepoint: ['0 0 24 24', 'stroke', ["M9 9.5c-1.167-.333-3.5-.6-3.5 1S9 12 9 13.5c0 2-2.667 1.167-4 1", "M17 19a5.5 5.5 0 1 0-4.5-8.663", "M9.126 17.5a4 4 0 0 0 3.874 5c2.18 0 4-1.846 4-4a4 4 0 0 0-4.5-3.97", "M18.472 8.086A6 6 0 0 0 6.583 6.5", "M1.5 16.5v-9a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1Z"]]
};
function ProductGlyph({
  name,
  size = 16,
  ...rest
}) {
  const g = PRODUCT[name];
  if (!g) return null;
  const [viewBox, mode, ds] = g;
  const paint = mode === 'fill' ? {
    fill: 'currentColor'
  } : {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinejoin: 'round'
  };
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: viewBox,
    "aria-hidden": "true",
    focusable: "false",
    style: {
      flex: 'none',
      display: 'block'
    }
  }, paint, rest), ds.map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: d
  })));
}
const PRODUCT_NAMES = Object.keys(PRODUCT);

/* ONE gear in the system. `advanced` (the SP Workbench rail's last item) and
   `settings` are the same shape — the app drew the rail item as a circle with
   eight rays, which at 15px is indistinguishable from `sun`. Consistency wins:
   both names resolve to the single toothed gear. */
G.advanced = G.settings;

/* Back-compat alias — this mark shipped briefly under the wrong name. */
G.workbench = G.sharepoint;
const ICON_NAMES = Object.keys(G).filter(n => n !== 'workbench' && n !== 'advanced');
Object.assign(__ds_scope, { Icon, PlayGlyph, PinGlyph, DragGlyph, ProductGlyph, PRODUCT_NAMES, ICON_NAMES });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/identity/Icon.jsx", error: String((e && e.message) || e) }); }

// components/identity/Mark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* A PIXEL ALPHABET, NOT A LOGO. Every workbench-class (L1) tool gets a letter
   drawn on a 4 × 5 grid inside a tinted tile: the tile is the constant, the
   letter changes per tool. D is the primary — the team (DCS) and the flagship
   tool (DCSPad).
   Cells 3px, gap 1.5px, tile padding 4px, radius 6px; double both for a
   masthead (size="lg"). Lit cells --accent, off cells --logo-dim, and two lit
   cells per mark drop to 55% so the mark reads as a display that is ON.
   A letter that will not read on the grid is a sign the tool needs a
   different name, not a bigger grid. */
const GRIDS = {
  D: 'XXX. X..o X..X X..o XXX.',
  S: '.XXX X... .oX. ...X XXX.',
  I: 'XXXX .Xo. .XX. .oX. XXXX',
  Q: '.XX. X..X X..X X.oX .XXX'
};
function Mark({
  letter = 'D',
  grid,
  size = 'md',
  className = '',
  ...rest
}) {
  const cells = (grid || GRIDS[letter] || GRIDS.D).replace(/ /g, '').split('');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['dcs-mark', size === 'lg' ? 'dcs-mark-lg' : '', className].filter(Boolean).join(' '),
    role: "img",
    "aria-label": letter + ' mark'
  }, rest), cells.map((c, i) => /*#__PURE__*/React.createElement("i", {
    key: i,
    className: c === 'X' ? 'on' : c === 'o' ? 'dim' : ''
  })));
}

/* L2 tools get NO letter. Four cells, one accent hue, four brightness steps
   — no tile, no outline, no background. It marks the family; the tool's name
   does the identifying. */
function InstrumentMark({
  size = 'md',
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['dcs-mark-2x2', size === 'lg' ? 'dcs-mark-2x2-lg' : '', className].filter(Boolean).join(' '),
    role: "img",
    "aria-label": "DCS instrument"
  }, rest), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null));
}

/* Mono, split weight: quiet prefix, accent suffix. */
function Wordmark({
  head = 'DCS',
  tail = 'PAD',
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ('dcs-wordmark ' + className).trim()
  }, rest), head, /*#__PURE__*/React.createElement("b", null, tail));
}
Object.assign(__ds_scope, { GRIDS, Mark, InstrumentMark, Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/identity/Mark.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Crumbs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Always mono — a breadcrumb is a path, and a path is machine output. The
   last segment is not a button. */
function Crumbs({
  items = [],
  onNavigate,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    className: ('dcs-crumbs ' + className).trim(),
    "aria-label": "Breadcrumb"
  }, rest), items.map((it, i) => {
    const label = typeof it === 'string' ? it : it.label;
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: label + i
    }, last ? /*#__PURE__*/React.createElement("span", {
      className: "dcs-crumb is-current",
      "aria-current": "page"
    }, label) : /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "dcs-crumb",
      onClick: onNavigate ? () => onNavigate(it, i) : undefined
    }, label), last ? null : /*#__PURE__*/React.createElement("span", {
      className: "dcs-crumb-sep",
      "aria-hidden": "true"
    }, "\u203A"));
  }));
}
Object.assign(__ds_scope, { Crumbs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Crumbs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Rail.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The left rail of an L1 workbench. Group it — three labelled groups turn
   scanning into recognition. The whole strip is the hit target, not the
   label box. The active item gets the soft accent wash plus a 2px inset
   rail; it does NOT get the solid fill. */
function Rail({
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    className: ('dcs-rail ' + className).trim()
  }, rest), children);
}
function RailLabel({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "dcs-rail-label"
  }, children);
}
function RailItem({
  glyph,
  active = false,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: ['dcs-rail-btn', active ? 'is-active' : '', className].filter(Boolean).join(' '),
    "aria-current": active ? 'page' : undefined
  }, rest), glyph ? /*#__PURE__*/React.createElement("span", {
    className: "dcs-rail-glyph"
  }, glyph) : null, children);
}
function RailSep() {
  return /*#__PURE__*/React.createElement("div", {
    className: "dcs-rail-sep"
  });
}
Object.assign(__ds_scope, { Rail, RailLabel, RailItem, RailSep });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Rail.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Two shapes, one idea. Default: the active tab drops to the surface it
   opens (editor ground) and carries a 2px accent top bar — for tabs OVER a
   surface. Underline: for tabs inside a view, sitting on the panel ground. */
function Tabs({
  tabs = [],
  value,
  onChange,
  underline = false,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['dcs-tabs', underline ? 'dcs-tabs-underline' : '', className].filter(Boolean).join(' '),
    role: "tablist"
  }, rest), tabs.map(t => {
    const v = typeof t === 'string' ? t : t.value;
    const label = typeof t === 'string' ? t : t.label;
    const count = typeof t === 'string' ? null : t.count;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      type: "button",
      role: "tab",
      "aria-selected": v === value,
      className: 'dcs-tab' + (v === value ? ' is-active' : ''),
      onClick: onChange ? () => onChange(v) : undefined
    }, label, count ? /*#__PURE__*/React.createElement("span", {
      className: "dcs-count"
    }, count) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* For a decision that needs the rest of the screen to stop. Never for a
   recoverable error — that is a Notice. Esc closes it. */
function Dialog({
  open = true,
  title,
  context,
  actions,
  onClose,
  children,
  className = '',
  ...rest
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal ? el.showModal() : el.setAttribute('open', '');
    }
    if (!open && el.open) el.close();
  }, [open]);
  return /*#__PURE__*/React.createElement("dialog", _extends({
    ref: ref,
    className: ('dcs-dialog ' + className).trim(),
    onCancel: onClose
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "dcs-dialog-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dcs-dialog-head"
  }, /*#__PURE__*/React.createElement("h2", null, title), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "dcs-btn dcs-btn-ghost dcs-btn-icon dcs-btn-sm",
    title: "Close",
    "aria-label": "Close",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m4 4 8 8M12 4l-8 8"
  })))), context ? /*#__PURE__*/React.createElement("p", {
    className: "dcs-dialog-context"
  }, context) : null, children, actions ? /*#__PURE__*/React.createElement("div", {
    className: "dcs-dialog-actions"
  }, actions) : null));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Menu.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Floats above the app, so it carries the one shadow. Drops in on the move
   beat. Esc closes it before it closes anything else. */
function Menu({
  children,
  className = '',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ('dcs-menu ' + className).trim(),
    role: "menu",
    style: style
  }, rest), children);
}
function MenuLabel({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "dcs-menu-label"
  }, children);
}
function MenuItem({
  lead,
  active = false,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "menuitem",
    className: ('dcs-menu-item ' + className).trim(),
    style: active ? {
      background: 'var(--bg-3)',
      color: 'var(--fg-strong)'
    } : undefined
  }, rest), lead, children);
}
function MenuSep() {
  return /*#__PURE__*/React.createElement("div", {
    className: "dcs-menu-sep"
  });
}
Object.assign(__ds_scope, { Menu, MenuLabel, MenuItem, MenuSep });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Menu.jsx", error: String((e && e.message) || e) }); }

// components/overlay/TipHost.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* A hover/focus label for a control too small to carry text. One short
   phrase, never a paragraph — and the control still needs a real aria-label. */
function TipHost({
  tip,
  below = false,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ('dcs-tip-host ' + className).trim(),
    style: {
      display: 'inline-flex'
    }
  }, rest), children, /*#__PURE__*/React.createElement("span", {
    className: 'dcs-tip' + (below ? ' dcs-tip-below' : '')
  }, tip));
}
Object.assign(__ds_scope, { TipHost });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/TipHost.jsx", error: String((e && e.message) || e) }); }

// components/shell/AppShell.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* L1 · WORKBENCH — a multi-pane instrument that takes over the page.
   40px topbar / 1fr work / 24px status bar. Hosted in SharePoint it pins at
   inset 53px 5px 5px (add the dcs-hosted class to <html>) so the suite bar
   stays visible above it, and paints the surround itself with a 100vmax
   ring, because SP wrappers behind the gap have white backgrounds you cannot
   chase class-by-class.
   ⚠ Ship a SUSPEND path: when the host page enters edit mode, hide the tool
   and revert the global html/body overrides, or the editor canvas goes dark
   and unscrollable. */
function AppShell({
  topbar,
  status,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ('dcs-app ' + className).trim()
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "dcs-topbar"
  }, topbar), /*#__PURE__*/React.createElement("div", {
    className: "dcs-work"
  }, children), /*#__PURE__*/React.createElement("div", {
    className: "dcs-statusbar"
  }, status));
}

/* L2 · INSTRUMENT — one job, one screen, inside a single web part, in normal
   page flow. No status bar, no splitters, never full-bleed. Declare the
   tokens on THIS root, not :root, so two tools can coexist on one page. */
function ToolShell({
  title,
  accent,
  actions,
  canvas = false,
  mark = true,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ('dcs-tool ' + className).trim()
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "dcs-tool-head"
  }, mark ? /*#__PURE__*/React.createElement("span", {
    className: "dcs-mark-2x2",
    role: "img",
    "aria-label": "DCS instrument"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)) : null, /*#__PURE__*/React.createElement("span", {
    className: "dcs-tool-title"
  }, title, accent ? /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement("b", null, accent)) : null), actions ? /*#__PURE__*/React.createElement("span", {
    className: "dcs-tool-actions"
  }, actions) : null), /*#__PURE__*/React.createElement("div", {
    className: 'dcs-tool-body' + (canvas ? ' has-canvas' : '')
  }, children));
}

/* A working surface with a 30px head. Panels are separated by hairlines and
   surface steps — never by a shadow. */
function Panel({
  title,
  tools,
  children,
  className = '',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ('dcs-panel ' + className).trim(),
    style: style
  }, rest), (title || tools) && /*#__PURE__*/React.createElement("div", {
    className: "dcs-panel-head"
  }, typeof title === 'string' ? /*#__PURE__*/React.createElement("span", {
    className: "dcs-panel-title"
  }, title) : title, /*#__PURE__*/React.createElement("span", {
    className: "dcs-panel-spacer"
  }), tools ? /*#__PURE__*/React.createElement("span", {
    className: "dcs-panel-tools"
  }, tools) : null), /*#__PURE__*/React.createElement("div", {
    className: "dcs-panel-body"
  }, children));
}
function PanelTitle({
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "dcs-panel-title"
  }, rest), children);
}

/* The L2 control column: grouped fields, 9.5px uppercase group titles. */
function Controls({
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ('dcs-controls ' + className).trim()
  }, rest), children);
}
function ControlGroup({
  title,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ('dcs-group ' + className).trim()
  }, rest), title ? /*#__PURE__*/React.createElement("div", {
    className: "dcs-group-title"
  }, title) : null, children);
}
/* Two short controls on one line; -3 for three. */
function ControlRow({
  cols = 2,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['dcs-row', cols === 3 ? 'dcs-row-3' : '', className].filter(Boolean).join(' ')
  }, rest), children);
}

/* The L2 canvas — 24px lattice so an artboard's real edges read on the dark
   ground. Its own toolbar, never the app's. */
function Canvas({
  bar,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ('dcs-canvas ' + className).trim()
  }, rest), bar ? /*#__PURE__*/React.createElement("div", {
    className: "dcs-canvas-bar"
  }, bar) : null, /*#__PURE__*/React.createElement("div", {
    className: "dcs-canvas-stage"
  }, children));
}

/* The 5px gutter between two panes — the only spacing value off the 2px
   scale, because it is a control, not a gap. The whole track lights accent
   on hover and drag. */
function Splitter({
  horizontal = false,
  dragging = false,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "separator",
    tabIndex: 0,
    "aria-orientation": horizontal ? 'horizontal' : 'vertical',
    className: ['dcs-splitter', horizontal ? 'dcs-splitter-h' : 'dcs-splitter-v', dragging ? 'is-dragging' : '', className].filter(Boolean).join(' ')
  }, rest));
}
Object.assign(__ds_scope, { AppShell, ToolShell, Panel, PanelTitle, Controls, ControlGroup, ControlRow, Canvas, Splitter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shell/AppShell.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Microbar = __ds_scope.Microbar;

__ds_ns.MicrobarValue = __ds_scope.MicrobarValue;

__ds_ns.Segmented = __ds_scope.Segmented;

__ds_ns.DataGrid = __ds_scope.DataGrid;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.NodeGlyph = __ds_scope.NodeGlyph;

__ds_ns.NodeRow = __ds_scope.NodeRow;

__ds_ns.NodeRoles = __ds_scope.NodeRoles;

__ds_ns.TreeNode = __ds_scope.TreeNode;

__ds_ns.Tree = __ds_scope.Tree;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.CountPill = __ds_scope.CountPill;

__ds_ns.Kbd = __ds_scope.Kbd;

__ds_ns.Notice = __ds_scope.Notice;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.State = __ds_scope.State;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.ScanBar = __ds_scope.ScanBar;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.ResizeRail = __ds_scope.ResizeRail;

__ds_ns.Slider = __ds_scope.Slider;

__ds_ns.Swatches = __ds_scope.Swatches;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.Check = __ds_scope.Check;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.PlayGlyph = __ds_scope.PlayGlyph;

__ds_ns.PinGlyph = __ds_scope.PinGlyph;

__ds_ns.DragGlyph = __ds_scope.DragGlyph;

__ds_ns.ProductGlyph = __ds_scope.ProductGlyph;

__ds_ns.PRODUCT_NAMES = __ds_scope.PRODUCT_NAMES;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.GRIDS = __ds_scope.GRIDS;

__ds_ns.Mark = __ds_scope.Mark;

__ds_ns.InstrumentMark = __ds_scope.InstrumentMark;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Crumbs = __ds_scope.Crumbs;

__ds_ns.Rail = __ds_scope.Rail;

__ds_ns.RailLabel = __ds_scope.RailLabel;

__ds_ns.RailItem = __ds_scope.RailItem;

__ds_ns.RailSep = __ds_scope.RailSep;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Menu = __ds_scope.Menu;

__ds_ns.MenuLabel = __ds_scope.MenuLabel;

__ds_ns.MenuItem = __ds_scope.MenuItem;

__ds_ns.MenuSep = __ds_scope.MenuSep;

__ds_ns.TipHost = __ds_scope.TipHost;

__ds_ns.AppShell = __ds_scope.AppShell;

__ds_ns.ToolShell = __ds_scope.ToolShell;

__ds_ns.Panel = __ds_scope.Panel;

__ds_ns.PanelTitle = __ds_scope.PanelTitle;

__ds_ns.Controls = __ds_scope.Controls;

__ds_ns.ControlGroup = __ds_scope.ControlGroup;

__ds_ns.ControlRow = __ds_scope.ControlRow;

__ds_ns.Canvas = __ds_scope.Canvas;

__ds_ns.Splitter = __ds_scope.Splitter;

})();

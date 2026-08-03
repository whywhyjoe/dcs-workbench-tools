# Downstream contract: DCS File Broker to Halo

Producer: `dcs-file-picker`
Consumers: `halo-banner/halo-banner-maker.js`
Surface: browser ES-module exports and open/read/write results
Location: `dcs-file-picker/src/file-broker.js`

## Guarantees
- Exports include `createFileBroker`, `localProvider`, `sharePointProvider`, and `loadSiteCatalog`.
- Cancellation resolves `null`; operational failures are typed and catchable.
- SharePoint selections and writes expose a standard direct browsing URL, never a sharing link.
- Blob reads report real byte length when response headers omit it.
- Favorites may load from a central JSON URL; missing/malformed configuration yields an empty catalog.
- SharePoint may be unavailable without preventing broker module import or Halo manual URL use.

## Compatibility checks
- Halo validates exports and result shapes at runtime.
- Provider tests cover context fallback, special-character URLs, size fallback, and catalog failure.

## Allowed changes
Additive exports/helpers, typed error improvements, and corrected result values.

## Forbidden changes
Mandatory build/runtime dependencies, tenant-specific Halo logic, sharing URLs, or breaking existing broker consumers.

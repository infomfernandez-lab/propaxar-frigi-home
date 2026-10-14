# Project rules

- Keep sitewide branding metadata in `index.html` and generated browser/install icons in `public/`; this lets crawlers and browsers resolve them without JavaScript.
- Derive favicon, touch and install icons from the same supplied brand asset and declare app icons in `public/site.webmanifest`; this keeps browser and installed-app identity consistent.
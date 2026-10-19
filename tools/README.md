# Page generator

`build-taste.py` writes both pages (`index.html` and `sv/index.html`), plus `robots.txt` and `sitemap.xml`, from the copy dictionary at the top of the file. `styles.css`, `site.js`, fonts and images are hand-written or hand-placed at the repo root and are not generated.

Edit the text in `build-taste.py`, then rebuild from the repo root:

```
# GitHub Pages (current temporary host)
python3 tools/build-taste.py . https://ytterstrom.github.io/thobey-site

# Final domain: uses https://thobey.se and also writes a CNAME file
python3 tools/build-taste.py .
```

`logo/` holds the traced logo: `logo.svg` (dark text) and `logo-light.svg` (light text, inlined into the pages by the generator).

## Hero aurora

`hero-shader.js` at the repo root is built from `shaders/` (the [Shaders](https://github.com/shader-effects-inc/shaders) library, MIT). Edit `shaders/src/hero-shader.js`, then rebuild:

```
cd tools/shaders && npm install && node build.mjs
```

The build only bundles the components in use. Telemetry to shaders.com is turned off.

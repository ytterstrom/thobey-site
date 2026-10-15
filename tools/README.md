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

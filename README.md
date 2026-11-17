# danieljaouen.github.io

The showcase site, <https://trylepton.app/>, for [Lepton OS](https://github.com/danieljaouen/lepton), a
Unix-like operating system for ARM64 whose userland is written in Elixir.

Plain HTML, CSS and JavaScript, with no build step. The only external
request is the Google Tag Manager tag (`GTM-NXNK6NF7`) in every page's
`<head>`; the docs pages get it from the generator in the Lepton repo:

- `index.html` - the page
- `assets/style.css`, `assets/app.js` - styles (light/dark) and interactions
- `assets/img/` - screenshots captured from Lepton running under QEMU
- `docs/`, `assets/docs.css` - the documentation, served at
  <https://trylepton.app/docs/>. `docs/*.html` is **generated** by
  `mix lepton.docs` in the Lepton repository from its `docs/*.md` guides
  and the code; edit those, not the HTML.
- `official.json` (+ `.sig`) - the signed list of official app updates,
  maintained with `mix lepton.official`

To preview locally: `python3 -m http.server` in this directory, then open
<http://localhost:8000>.

This repository is included in the Lepton repo as the `site/` submodule.
Written by Claude (Anthropic) at the direction of Daniel Jaouen.

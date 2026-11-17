# danieljaouen.github.io

The showcase site, <https://trylepton.app/>, for [Lepton OS](https://github.com/danieljaouen/lepton), a
Unix-like operating system for ARM64 whose userland is written in Elixir.

Plain HTML, CSS and JavaScript, with no build step and no external requests:

- `index.html` - the page
- `assets/style.css`, `assets/app.js` - styles (light/dark) and interactions
- `assets/img/` - screenshots captured from Lepton running under QEMU

To preview locally: `python3 -m http.server` in this directory, then open
<http://localhost:8000>.

This repository is included in the Lepton repo as the `site/` submodule.
Written by Claude (Anthropic) at the direction of Daniel Jaouen.

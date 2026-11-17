# danieljaouen.github.io

The showcase site, <https://trylepton.app/>, for [Lepton OS](https://github.com/danieljaouen/lepton), a
Unix-like operating system for ARM64 whose userland is written in Elixir.

Plain HTML, CSS and JavaScript, with no build step. The only external
request is the Google Tag Manager tag (`GTM-NXNK6NF7`) in every page's
`<head>`. Its single source is `lib/lepton_build/site_head.html` in the
Lepton repo, and `mix lepton.site.tags` (run automatically by
`mix lepton.docs` and `mix lepton.publish`) adds it to any page that
lacks it, so new pages are tagged without anyone remembering to. The
"Site tags" GitHub check (`.github/workflows/site-tags.yml`) fails for
any page pushed without it:

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

This repository is included in the Lepton repo as the `site/` submodule,
over HTTPS and read-only. The Lepton tooling edits, commits and pushes a
separate SSH clone next to it (`../danieljaouen.github.io`). However
this repository's `main` changes (a local push, `mix lepton.publish` or an
edit on github.com), the "Update Lepton's site submodule" workflow moves
Lepton's `site/` submodule to the new commit. It pushes to Lepton with the
`LEPTON_DEPLOY_KEY` secret, a deploy key with write access to that
repository only.
Written by Claude (Anthropic) at the direction of Daniel Jaouen.

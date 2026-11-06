# Dependency remediation — November 1, 2026

The November 1 audit found 4 high affected-package entries: Vite and its nanoid, PostCSS and source-map-js build graph. Resolve Vite 8.3.5 within the existing major and raise its declared lower bound accordingly; refresh the affected compatible transitive versions. No React, plugin or application-source upgrade is needed.

After: zero findings. Clean installs and production builds passed before and after on Node 22.23.0. Chromium production-preview smoke passed at desktop 1440×1000 and phone 390×844: a synthetic task was created through the visible form and survived reload. Page identity, meaningful content, absence of overlays and no application console warnings/errors were verified. No unit-test, lint or typecheck command is configured; those checks are explicitly unavailable.

The issues concern developer/build tooling and do not establish a browser exploit in the static output. No deployment, hosted workflow, visibility change or merge was performed.

## Complete affected-package inventory

Baseline: `26a922c461e4a35b1d2785ab5212a88967941cda`. All affected package entries from the audit are listed, including downstream packages flagged only through a dependency.

| Package | Before resolved versions | After resolved versions | Severity; direct dependency |
| --- | --- | --- | --- |
| nanoid | 3.3.12 | 3.3.20 | high; no |
| postcss | 8.5.15 | 8.5.32 | high; no |
| source-map-js | 1.2.1 | 1.2.2 | high; no |
| vite | 8.0.16 | 8.3.5 | high; yes |

Underlying advisories:

- [nanoid: non-secure generators can loop indefinitely with negative size](https://github.com/advisories/GHSA-28wg-ghj8-5hjv)
- [nanoid: custom generators can loop indefinitely when size is zero](https://github.com/advisories/GHSA-2v37-7h3g-55p8)
- [launch-editor: `fs.existsSync()` existence check can be bypassed on Windows](https://github.com/advisories/GHSA-587h-7wmj-h5pm)
- [source-map-js allows event-loop denial of service through indexed source-map section offsets](https://github.com/advisories/GHSA-68fv-2mgg-jv7q)
- [launch-editor: escapeCmdArgs() omits % escaping on Windows](https://github.com/advisories/GHSA-698v-4r3x-3vcv)
- [Vite: Cross origin script execution through Vite custom middleware](https://github.com/advisories/GHSA-9jrq-w75r-8gcw)
- [PostCSS: incomplete fix of GHSA-6g55-p6wh-862q — attacker-controlled sourceMappingURL reads arbitrary .map files when `from` is unset](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp)
- [PostCSS: Path Traversal in Previous Source Map Auto-Loading (sourceMappingURL) leads to Arbitrary .map File Disclosure](https://github.com/advisories/GHSA-r28c-9q8g-f849)
- [launch-editor: Editor CLI flag misinterpretation causing arbitrary command execution for some editors](https://github.com/advisories/GHSA-r825-w8mm-5pxw)
- [Vite: Files outside `server.fs.allow` could be served when project paths match system paths on non-Windows machine](https://github.com/advisories/GHSA-rq7h-c2jc-7f22)

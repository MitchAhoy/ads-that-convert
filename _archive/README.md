# _archive

Pre-redesign components kept for reference only. Nothing in the app imports them.

Files keep their original paths (e.g. `components/ui/Button.jsx` lives at `_archive/components/ui/Button.jsx`). Some still import live modules (e.g. `@/components/sections/clientLogosData`), so they may break if moved back without checking.

This folder is excluded from ESLint (`eslint.config.mjs`) and from Tailwind class scanning (`@source not` in `app/globals.css`). Next.js never builds it because only `app/` routes are compiled.

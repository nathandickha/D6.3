# AquaVision Design Studio

Standalone, GitHub-ready static website with the complete Three.js pool designer included.

## Local preview

Use any static server from the project root. Opening files directly with `file://` will break ES modules.

```bash
npx serve .
```

Then open the URL printed in the terminal.

## GitHub Pages

Upload the full contents to a repository and enable Pages from the repository root. For a project repository hosted below a subpath, root-relative URLs may need a custom domain or deployment rewrite. Netlify/Vercel are also supported by dragging in the folder.

## Before launch

1. Replace every `https://example.com` canonical and sitemap URL with your real domain.
2. Connect the contact form to Formspree, Netlify Forms or your backend.
3. Replace the draft privacy policy and terms with professional legal documents.
4. Add analytics and consent controls only after deciding what data will be collected.

## Architecture

- Static multipage HTML for SEO and simple hosting.
- Shared responsive CSS and TypeScript source.
- Compiled JavaScript is included so the site runs without a build.
- Existing pool designer is preserved under `pool-designer-app/`.
- `/pool-designer/` provides an integrated page and full-screen launch option.

## Asset path fix

All internal HTML asset and navigation paths use depth-correct relative URLs. This prevents `site.css` and `site.js` 404 errors when the project is hosted beneath a repository path such as GitHub Pages (`/repository-name/`) or opened through a local static server.

Do not open the HTML files directly with `file://`. Run a local static server instead, for example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000/`.

## plugins

This is a Next.js app that displays a nice interface to browse and download my Ableton Live plugins.

For each project listed in `data/plugins.yaml`, it pulls `README.md` and release data from GitHub's API and caches it locally for display.

## Doc Open Graph previews

Each plugin page and deep-linked doc generates its own Open Graph preview (the
title/description/image shown when a link is shared). Content is resolved in
this order:

1. **YAML frontmatter** at the top of the doc/README markdown:

   ```markdown
   ---
   title: My Doc Title
   description: A one-line summary used as the preview caption.
   image: ./screenshot.png
   ---
   ```

   `image` may be an absolute URL or a path relative to the doc (resolved to its
   served `/cache/...` URL).

2. **Auto-derived** from the markdown when frontmatter is absent: the first `#`
   or `##` heading becomes the title (doc pages hide the H1 on render, so many
   lead with an H2), the first real paragraph the description, and the first
   `![](...)` image the preview image.

3. **Plugin-level fallback** from `data/plugins.yaml` (`title`, `description`,
   `image`).

Relative preview images are made absolute against `SITE_URL` (defaults to
`https://plugins.steinkamp.us`).

## Production Mode

Run `make prod` to start the server. It will be listening on port 3225.

## Developing

I develop in this repo using a VSCode DevContainer.

With the container running, you can visit [http://localhost:3200](http://localhost:3200) with your browser to see the current code.

You can run `make help` to see other makefile targets and what they do.
# LIA Restoration Tool

Browser-based tool for cleaning up HTML pages in the [Lenin Internet Archive](https://www.marxists.org/archive/lenin/works/cleanup-list.htm) on marxists.org.

Hosted at [espaces-marx.eu/tools/lia-restoration](https://www.espaces-marx.eu/tools/lia-restoration) — or just open `lia-restoration.html` locally. No installation, no dependencies.

## Workflow

1. Paste an LIA page URL and click **Fetch & Clean**
2. Review the result — editor on the left, live preview on the right
3. Apply remaining manual fixes (see below)
4. Click **Validate** to run the W3C Nu checker inline
5. Click **Download HTML** and send the file to the LIA admin

The **?** button opens a full reference page covering every cleanup step.

## What gets automated

Original LIA cleanup script items:
- DOCTYPE and `<html>` tag → HTML5
- `window.status` mouseover handlers removed
- `name` attribute → `id` on anchors; empty self-closing anchors removed
- Internal editor/generator comments stripped
- Footnote markup normalised (`ednote`/`anote` → `endnote`)
- `.txt` source links removed from the infoblock
- `class="title"` removed from headings
- `<center>` and `align="center"` replaced

Added by this tool:
- HTML formatted with consistent 2-space indentation
- Each `<p>` collapsed to a single line
- Inline W3C validation with clickable error messages that jump to the relevant line
- Garbled character fixes left by the LaTeX-to-HTML converter (`\"a` → `ä`, etc.)
- `<meta name="generator">` / `<meta name="generated">` tags removed
- V. I. Lenin `<h2>` header collapsed (verify — pattern may miss variants)

## What still needs a human

- Replacing footer navigation tables with the standard LIA footer
- Removing `#...-GUESS` fragments from index hrefs
- Filling in `[PLACEHOLDER FOOTNOTE]` entries from anchor `id` values

## Technical notes

Pages are fetched via public CORS proxies (`corsproxy.io`, `allorigins.win`, `codetabs.com`). An internet connection is required.

The tool is a single HTML file — Ace editor and Prettier loaded from CDN, everything else inlined. To change cleanup logic, edit `cleanupHTML()` in the `<script>` block.

# LIA Restoration Tool

A browser-based tool to help volunteers clean up HTML pages in the Lenin Internet Archive (LIA) on marxists.org.

## Background

The Lenin Internet Archive contains a large number of pages that still carry legacy HTML from an earlier era of the archive: XHTML doctypes, `window.status` mouseover handlers, obsolete attributes, and inconsistent formatting. Cleaning these up by hand is tedious and error-prone — especially for volunteers who may not be experienced with HTML.

This tool was built to take the mechanical work out of that process. A volunteer enters a URL, the tool fetches the page, runs a series of automated transformations, and presents the result for review. What remains for the human is the work that genuinely requires judgement: navigation tables, paragraph formatting, footnote content, and other structural choices described in the LIA cleanup guidelines.

The goal is to lower the barrier to contributing, so that more people can participate in the cleanup effort without needing deep HTML knowledge.

## How to use it

The tool is a single self-contained HTML file: `lia-restoration.html`. No server, no installation, no dependencies to manage. To share it with a volunteer, just send them the file or the version hosted on espace marx [TODO]

**The workflow:**

1. Open `lia-restoration.html` in any modern browser
2. Paste the URL of an LIA page and click **Fetch & Clean** — the tool fetches the page and runs all automated cleanup
3. Review the result in the editor (left pane) against the live preview (right pane)
4. Apply the remaining manual fixes (see below)
5. Click **Validate** — the tool checks the HTML against the W3C Nu validator and shows any errors inline
6. Click **Download HTML** to save the cleaned file
7. Send the file to the LIA admin

The `?` button in the top-right corner opens a full reference page describing every cleanup step — both what the tool does automatically and what the volunteer needs to do by hand.

## What the tool automates

The following were already part of the original LIA cleanup script and are re-implemented here:

- Replaces the legacy XHTML DOCTYPE and `<html>` tag with clean HTML5
- Removes `window.status` mouseover handlers
- Replaces the obsolete `name` attribute with `id` on anchor tags; removes empty self-closing anchors
- Strips internal editor and generator comments
- Normalises footnote/endnote markup (`ednote`/`anote` → `endnote`, class moved to `<sup>`)
- Removes `.txt` source links from the infoblock
- Removes the no-op `class="title"` attribute from headings
- Replaces deprecated presentational elements (`<center>`, `align="center"`)

The following are new additions in this tool:

- **Prettier formatting** — the cleaned HTML is automatically formatted with consistent 2-space indentation, covering tables, lists, and all block elements
- **Paragraph collapsing** — each `<p>` is collapsed to a single line after formatting
- **Inline W3C validation** — rather than uploading to an external site, the Validate button submits the current editor content to the Nu HTML Checker API and shows errors and warnings directly in the tool, with clickable messages that jump to the relevant line
- **Character conversion** — fixes garbled characters left by the LaTeX-to-HTML conversion tool (e.g. `\"a` → `ä`, `\"u` → `ü`); these are conversion artifacts that should never appear in valid HTML
- **Infoblock cleanup** — normalises spacing and removes redundant spans around page numbers in the information block
- **Generator `<meta>` tag removal** — strips `<meta name="generator">` and `<meta name="generated">` tags inserted by the archive's conversion tool
- **V. I. Lenin header (partial)** — attempts to collapse the linked `<h2>` header into `<h2>Vladimir Ilyich Lenin</h2>`; verify the result, as the pattern may not catch all variants

## What still requires manual review

- Replacing footer navigation tables with the standard LIA footer format
- Removing `#...-GUESS` fragments from index hrefs
- Filling in `[PLACEHOLDER FOOTNOTE]` entries using the anchor `id` attribute

## Technical notes

**Fetching** — the tool retrieves pages via public CORS proxies (`corsproxy.io`, `allorigins.win`, `codetabs.com` tried in order), since browsers block direct cross-origin requests. An internet connection is required.

**Validation** — the editor content is submitted to the [W3C Nu HTML Checker API](https://validator.w3.org/nu/) and results are shown inline, with clickable messages that jump to the relevant line in the editor.

**No build step** — the tool is a single HTML file with all logic inlined. Ace editor and Prettier are loaded from CDN. To modify the cleanup logic, edit the functions in the `<script>` block directly.

## Cleanup logic

All automated transformations live in the `cleanupHTML()` function and its helpers, inlined in `lia-restoration.html`. The functions are plain JavaScript with no framework dependencies, and each transformation is isolated and easy to extend or adjust.

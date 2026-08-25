# RaiaMinify

[![Version](https://img.shields.io/badge/version-1.0-blue)](https://github.com/Haiere/raia-minify/releases)
[![License](https://img.shields.io/badge/license-MIT-yellow)](https://opensource.org/licenses/MIT)
[![Website](https://img.shields.io/badge/website-live-green)](https://raia-minify.haiere.workers.dev)
[![Privacy](https://img.shields.io/badge/privacy-100%25%20client--side-success)](#)

> A browser-based code minifier for JavaScript, CSS, HTML, and JSON. All processing happens locally—no uploads, no servers.

RaiaMinify is a client-side tool that strips unnecessary whitespace, blank lines, and comments from your code files. It is designed for developers who need a quick, private way to reduce file size before deployment or sharing.

The tool automatically detects the file type (JavaScript, CSS, HTML, or JSON) and applies tailored minification rules. Your code never leaves your device—everything runs inside your web browser.

---

## Features

- **Automatic file type detection** — Recognises `.js`, `.css`, `.html`, `.json`, and common variants (`.mjs`, `.ts`, `.jsx`, `.htm`, etc.).
- **Tailored minification** — Applies specific rules for each language to preserve functional integrity.
- **Comment and whitespace removal** — Eliminates developer notes, extra spaces, tabs, and blank lines.
- **Protection of string literals and templates** — Ensures that quoted strings, regex patterns, and template literals remain intact.
- **HTML-aware processing** — Preserves content inside `<pre>`, `<textarea>`, `<style>`, and `<script>` blocks while minifying surrounding markup.
- **Size and line count stats** — Displays original vs. minified sizes, line counts, and percentage reduction.
- **One-click download** — Saves the minified result with a `.min` suffix.
- **Zero external dependencies** — Runs entirely with native browser APIs.

---

## Requirements

- A modern web browser with JavaScript enabled (Chrome, Firefox, Edge, Safari, or similar).
- No installation or runtime environment required.
- The tool can be used offline after the initial page load.

---

## Installation

RaiaMinify is a single HTML file. To use it:

1. Open the hosted URL in your browser.
2. Alternatively, download the `index.html` file and open it locally.

If you wish to host it yourself, place the file on any static web server. All required styles and logic are self-contained.

---

## Usage

### Step-by-step

1. **Select a file** — Drag and drop a file onto the drop zone, or click the zone to open a file picker.
2. **Review the file** — The tool displays the file name, size, and line count.
3. **Minify** — Click the "Compress File" button. The processing happens instantly in your browser.
4. **Review the results** — The stats panel shows the original and minified sizes, line counts, and the percentage reduction.
5. **Download** — Click the "Download Result" button to save the minified file with a `.min` suffix.

### Supported file types

| File extension | Detected language |
|---|---|
| `.js`, `.mjs`, `.cjs`, `.jsx`, `.ts`, `.tsx` | JavaScript |
| `.css` | CSS |
| `.html`, `.htm` | HTML |
| `.json` | JSON |

If the file type is not recognised, a generic whitespace-compression routine is applied.

---

## Configuration

There is no configuration—the tool works out of the box. All settings are fixed to provide a simple, opinionated minification experience.

---

## Project Structure

```
index.html          # Single-file application (HTML, CSS, and JavaScript)
```

The entire application is contained in one file for simplicity.

---

## Examples

### Before (JavaScript)

```js
function hello( name ) {
  // Greet the user
  return 'Hello, ' + name + '!';
}
```

### After minification

```js
function hello(name){return'Hello, '+name+'!';}
```

### Before (CSS)

```css
/* Reset */
* { margin: 0; padding: 0; }
```

### After minification

```css
*{margin:0;padding:0;}
```

---

## Troubleshooting

### The minification seems to break my code

The tool uses safe, conservative rules. However, certain edge cases (e.g., complex regex or template literals) may behave unexpectedly. If you encounter issues, please report them via the project issue tracker.

### The file size is not reduced

Some files, especially already minified ones, may show little or no improvement.

### Download does not start

Ensure your browser allows file downloads and that you have a minified result ready.

### Drag-and-drop does not work

Some browsers may require clicking the drop zone first to gain focus. Use the file picker as an alternative.

---

## Privacy and Security

RaiaMinify operates completely offline. No data is sent to any external server. The application does not use cookies, analytics, or trackers. Your code stays entirely on your own machine.

---

## Contributing

Contributions are welcome. Areas for improvement include:

- Supporting additional file types (e.g., XML, SVG, Markdown).
- Refining minification rules for complex language features.
- Adding a simple settings panel to customise which elements are stripped.
- Improving accessibility and responsiveness.

Please fork the repository and submit a pull request with a clear description of your changes.

---

## Development Setup

Since the application is a single HTML file, development is straightforward:

- Edit `index.html` directly.
- Test by opening the file in a browser.
- No build tools or compilation steps are required.

For local hosting, use any static server, for example:

```bash
python -m http.server
```

or

```bash
npx serve
```

---

## License

RaiaMinify is released under the MIT license. See the `LICENSE` file for full details.

---

## Author and Support

Developed and maintained by Haiere and HajirStudio. For questions, bug reports, or feature requests, please use the project issue tracker or contact via the repository.

---

Last updated: 2026
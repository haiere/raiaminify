# RaiaMinify

[![Version](https://img.shields.io/badge/version-1.0.1-blue.svg)](https://github.com/Haiere/raia-minify/releases)
[![License](https://img.shields.io/badge/license-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/status-active-success.svg)](#)
[![Website](https://img.shields.io/badge/website-live-green.svg)](https://raiaminify.haiere.workers.dev/)
[![Privacy](https://img.shields.io/badge/privacy-client--side-success.svg)](#privacy-and-security)
[![Donate](https://img.shields.io/badge/donate-buy%20me%20a%20coffee-FFDD00?logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/hajirstudio)

> A browser-based code minifier for JavaScript, CSS, HTML, and JSON.

RaiaMinify removes unnecessary whitespace, blank lines, and comments from supported source files directly in your browser.

The application is designed for developers who need a quick and privacy-conscious way to reduce file size before deployment, sharing, or archiving.

Your source files are processed locally and are not intentionally uploaded to a RaiaMinify backend.

<p align="center">
  <a href="https://raiaminify.haiere.workers.dev/">
    <img src="https://img.shields.io/badge/Open%20RaiaMinify-Live%20App-3B82F6?style=for-the-badge" alt="Open RaiaMinify" />
  </a>
  <a href="https://buymeacoffee.com/hajirstudio">
    <img src="https://img.shields.io/badge/Support%20Development-Buy%20Me%20a%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Support RaiaMinify on Buy Me a Coffee" />
  </a>
</p>

---

## Table of Contents

- [Overview](#overview)
- [What's New in v1.0.1](#whats-new-in-v101)
- [Features](#features)
- [Supported File Types](#supported-file-types)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Examples](#examples)
- [Privacy and Security](#privacy-and-security)
- [Limitations](#limitations)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Development Setup](#development-setup)
- [Support the Project](#support-the-project)
- [License](#license)
- [Author and Support](#author-and-support)

---

## Overview

RaiaMinify is a static, client-side code minifier that runs in a modern web browser.

It automatically detects supported file types and applies format-specific processing rules for:

- JavaScript.
- CSS.
- HTML.
- JSON.

The application does not require an account, backend server, command-line tool, build system, or package installation.

RaiaMinify is intended for quick minification tasks. It is not designed to replace full production build pipelines for large applications or complex projects.

---

## What's New in v1.0.1

- Added optional donation support through Buy Me a Coffee.
- Added donation links to the navbar, mobile navigation, footer, and desktop floating button.
- Added a dedicated FAQ section.
- Added questions about privacy, supported formats, file limits, safety, free usage, and commercial usage.
- Refined the footer into a four-column responsive layout.
- Added version information to the navbar and footer.
- Separated the application into `index.html`, `style.css`, and `script.js`.
- Improved SEO metadata and page descriptions.
- Added Open Graph metadata.
- Added Twitter Card metadata.
- Added `WebSite`, `Organization`, `SoftwareApplication`, `FAQPage`, and `BreadcrumbList` structured data.
- Added dynamic copyright-year handling.
- Improved local cookie-preference handling.
- Improved responsive behavior for desktop, tablet, and mobile screens.
- Improved keyboard navigation and accessibility labels.
- Added reduced-motion support for users who prefer less animation.

---

## Features

### File Detection

Automatically detects common file extensions, including:

- `.js`
- `.mjs`
- `.cjs`
- `.jsx`
- `.ts`
- `.tsx`
- `.css`
- `.html`
- `.htm`
- `.json`

### Format-Specific Processing

Applies different processing logic depending on the detected file type:

- JavaScript whitespace and comment processing.
- CSS whitespace and comment processing.
- HTML comment and whitespace processing.
- JSON parsing and compact serialization.

If a file type is not recognised, RaiaMinify applies a conservative generic whitespace-compression routine.

### Source Protection

The minifier attempts to preserve content that should not be modified, including:

- Quoted strings.
- Template literals.
- Regular-expression patterns.
- HTML content blocks.
- `<pre>` elements.
- `<textarea>` elements.
- `<style>` blocks.
- `<script>` blocks.

Complex source code should always be tested after minification because source transformation can contain edge cases.

### Statistics

Displays information such as:

- Original file size.
- Minified file size.
- Original line count.
- Minified line count.
- Percentage reduction.
- File name and detected language.

### Download

Downloads the minified output with a `.min` suffix where applicable.

Examples:

```text
app.js      → app.min.js
styles.css  → styles.min.css
index.html  → index.min.html
data.json   → data.min.json
```

### Interface

- No account required.
- No backend processing required.
- Responsive desktop, tablet, and mobile layouts.
- Mobile bottom navigation.
- Keyboard-accessible controls.
- Skip-link navigation.
- ARIA labels.
- Visible focus states.
- Reduced-motion support.
- Optional donation button.

---

## Supported File Types

| File Extension | Detected Language |
|---|---|
| `.js`, `.mjs`, `.cjs`, `.jsx`, `.ts`, `.tsx` | JavaScript |
| `.css` | CSS |
| `.html`, `.htm` | HTML |
| `.json` | JSON |

If the extension is not recognised, the file is processed using a generic whitespace-compression routine.

---

## Requirements

RaiaMinify requires:

- A modern web browser.
- JavaScript enabled.
- Permission to read files explicitly selected by the user.
- Sufficient browser memory for the selected file.

Recommended browsers include:

- Google Chrome.
- Mozilla Firefox.
- Microsoft Edge.
- Apple Safari.
- Other modern Chromium-, Gecko-, or WebKit-based browsers.

No installation, backend server, package manager, or runtime environment is required.

---

## Installation

RaiaMinify is a static three-file application.

### Use the Hosted Version

Open the live application:

```text
[https://raiaminify.haiere.workers.dev/](https://raiaminify.haiere.workers.dev/)
```

### Run Locally

Clone the repository:

```bash
git clone [https://github.com/Haiere/raia-minify.git](https://github.com/Haiere/raia-minify.git)
cd raia-minify
```

The application can be opened directly by opening `index.html` in a modern browser.

For more consistent local testing, use a static development server.

### Python

```bash
python -m http.server 8000
```

### Node.js

```bash
npx serve .
```

Then open:

```text
http://localhost:8000
```

No build step or compilation process is required.

---

## Usage

### Minify a File

1. Open RaiaMinify.
2. Drag and drop a supported file onto the drop zone.
3. Alternatively, click the drop zone and choose a file.
4. Review the detected file name, format, size, and line count.
5. Click `Compress File`.
6. Review the minification statistics.
7. Inspect the generated output if available.
8. Click `Download Result` to save the minified file.

### Supported File Detection

The application determines the processing mode from the file extension.

For example:

```text
script.js  → JavaScript mode
styles.css → CSS mode
index.html → HTML mode
data.json  → JSON mode
```

### Validate the Output

Always test the minified result before using it in production.

Recommended checks include:

- Load the minified JavaScript in a test environment.
- Check the browser console for syntax errors.
- Validate JSON with a JSON parser.
- Open the minified HTML in a browser.
- Verify that CSS styles still render correctly.
- Compare critical behavior with the original file.

---

## Configuration

RaiaMinify does not currently provide user-configurable minification settings.

The application uses fixed, conservative processing rules to keep the interface simple and predictable.

Future versions may provide options for:

- Comment removal.
- Whitespace handling.
- Output formatting.
- Quote preservation.
- HTML whitespace behavior.
- JavaScript transformation strictness.

---

## Project Structure

```text
raia-minify/
├── index.html      # Markup, metadata, structured data, and application layout
├── style.css       # Design tokens, components, layout, and responsive styles
├── script.js       # File handling, minification logic, and UI interactions
├── README.md       # Project documentation
├── LICENSE         # MIT license
└── SECURITY.md     # Security reporting instructions, if provided
```

The three application files are kept separate to make development, review, and maintenance easier.

---

## Examples

### JavaScript

#### Before

```js
function hello( name ) {
  // Greet the user
  return 'Hello, ' + name + '!';
}
```

#### After

```js
function hello(name){return'Hello, '+name+'!';}
```

### CSS

#### Before

```css
/* Reset */
* {
  margin: 0;
  padding: 0;
}
```

#### After

```css
*{margin:0;padding:0;}
```

### HTML

#### Before

```html
<!-- Header -->
<header>
  <h1>  Hello World  </h1>
</header>
```

#### After

```html
<header>
<h1>Hello World</h1>
</header>
```

### JSON

#### Before

```json
{
  "name": "RaiaMinify",
  "version": "1.0.1",
  "free": true
}
```

#### After

```json
{"name":"RaiaMinify","version":"1.0.1","free":true}
```

The exact output may vary depending on the implementation and the source file contents.

---

## Privacy and Security

RaiaMinify is designed to process selected files locally in the browser.

During normal use:

- Files are read using browser file APIs.
- Minification happens in the browser.
- No source file is intentionally uploaded to a RaiaMinify backend.
- No account is required.
- No remote database is required.
- No analytics or tracking is intentionally used by the application.
- Output files are generated locally for download.

### External Resources

The hosted application may request external resources such as:

- Google Fonts.
- Logo or image assets hosted on `i.postimg.cc`.
- The Buy Me a Coffee website when the donation link is selected.

These resources are separate from the local minification process.

For a fully self-contained deployment, download and self-host external fonts and image assets, then replace their URLs in the HTML and CSS files.

### Cookie Preferences

The application may display a cookie or privacy-preference banner.

If enabled, the user's preference is stored locally in the browser. The preference does not contain source-code contents.

### Browser Security

RaiaMinify only processes files explicitly selected by the user.

However, users should still avoid processing highly confidential source code on shared or compromised devices. Browser extensions, malware, or a compromised browser profile may be able to access page content or local files.

---

## Limitations

RaiaMinify is intended for lightweight browser-based minification and has important limitations:

- It is not a complete replacement for production bundlers.
- It does not bundle JavaScript modules.
- It does not transpile modern JavaScript.
- It does not perform tree shaking.
- It does not optimise images.
- It does not rewrite module imports.
- It does not perform advanced dead-code elimination.
- It does not guarantee semantic preservation for every valid source file.
- Complex regular expressions may require additional testing.
- Template literals may contain expressions that require careful handling.
- JavaScript automatic semicolon insertion can make aggressive whitespace removal unsafe.
- HTML whitespace may be meaningful inside some elements.
- Already-minified files may show little or no reduction.
- Generic fallback processing may not understand the syntax of unknown file types.

For production applications, use a dedicated build pipeline and automated tests in addition to RaiaMinify.

---

## Troubleshooting

### Minification Breaks My Code

The input may contain syntax or edge cases that require more advanced parsing.

Try the following:

1. Check the original file for syntax errors.
2. Test the minified output in a staging environment.
3. Review complex regular expressions and template literals.
4. Check JavaScript automatic semicolon insertion.
5. Compare the output with a dedicated language-aware minifier.
6. Report a reproducible example through the issue tracker.

Do not deploy untested output directly to production.

### File Size Does Not Decrease

This is expected when:

- The file is already minified.
- The file contains little whitespace.
- Comments have already been removed.
- The content is too small for a meaningful reduction.
- The format does not contain removable content.

### Download Does Not Start

Check that:

- The file has finished processing.
- A result is available.
- The browser allows downloads.
- The download was not blocked.
- A browser extension is not interfering with Blob downloads.

### Drag and Drop Does Not Work

Try the file picker instead.

Some browsers, devices, or embedded web views may handle drag-and-drop differently. Click the drop zone and select a file manually.

### JSON Processing Fails

Check that:

- The file is valid JSON.
- Property names use double quotes.
- Trailing commas are not present.
- Comments are not included.
- The input is not JSON5 or another JSON-like format.

### The Donation Button Does Not Open

The donation button opens the following external URL:

```text
[https://buymeacoffee.com/hajirstudio](https://buymeacoffee.com/hajirstudio)
```

Check that:

- Your browser allows external links.
- A popup or content blocker is not preventing the new tab.
- Your network allows access to Buy Me a Coffee.

The donation link is optional and is not required to use RaiaMinify.

---

## Roadmap

Potential future improvements include:

- XML support.
- SVG support.
- Markdown support.
- Better TypeScript and JSX handling.
- Improved JavaScript parsing.
- More conservative template-literal handling.
- Safer regular-expression detection.
- Optional formatting controls.
- Custom comment-removal settings.
- Before-and-after diff view.
- Side-by-side output preview.
- Copy-to-clipboard support.
- Drag-and-drop folder support.
- File-size limits and clearer error messages.
- Internationalization support.
- Automated regression tests.
- Optional self-hosted dependency bundle.

---

## Contributing

Contributions are welcome.

Possible contribution areas include:

- Supporting additional file types.
- Improving language-specific processing.
- Fixing syntax-preservation issues.
- Improving accessibility.
- Improving mobile layouts.
- Improving browser compatibility.
- Adding automated tests.
- Improving error handling.
- Improving documentation.
- Adding before-and-after comparison tools.

### Contribution Workflow

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes.
4. Test the application locally.
5. Test original and minified output.
6. Commit your changes:

   ```bash
   git commit -m "Describe your change"
   ```

7. Push the branch:

   ```bash
   git push origin feature/your-feature-name
   ```

8. Open a pull request.

Please include:

- A clear description of the change.
- Reproduction steps for bug fixes.
- Before-and-after examples when relevant.
- Browser and operating-system details for compatibility issues.
- Tests or validation steps performed.

Do not commit:

- Private source code.
- API keys.
- Access tokens.
- User-uploaded files.
- Personal information.
- Unrelated build artifacts.
- Secrets in configuration files.

For public repositories, consider enabling dependency alerts, secret scanning, push protection, and code scanning. GitHub recommends these features as part of repository security practices. [web:30]

---

## Development Setup

RaiaMinify is a static application with no required build system.

### Local Development

1. Clone the repository.
2. Open the project directory.
3. Start a local static server.
4. Open the local URL in a browser.
5. Edit `index.html`, `style.css`, or `script.js`.
6. Refresh the browser to test changes.

Example:

```bash
python -m http.server 8000
```

Or:

```bash
npx serve .
```

Then visit:

```text
http://localhost:8000
```

### Development Checklist

Before submitting changes, test:

- JavaScript input.
- CSS input.
- HTML input.
- JSON input.
- Unknown file extensions.
- Empty files.
- Already-minified files.
- Large files.
- Invalid JSON.
- Complex strings.
- Template literals.
- Regular expressions.
- HTML `<pre>` blocks.
- HTML `<textarea>` blocks.
- HTML `<script>` blocks.
- HTML `<style>` blocks.
- Download behavior.
- Keyboard navigation.
- Mobile layout.
- Reduced-motion settings.
- Offline behavior.
- External-resource failure behavior.

---

## Support the Project

RaiaMinify is free to use.

If the project saves you time, you can support ongoing development through Buy Me a Coffee:

<p align="center">
  <a href="https://buymeacoffee.com/hajirstudio" target="_blank" rel="noopener noreferrer">
    <img
      src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support%20Development-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black"
      alt="Buy Me a Coffee"
    />
  </a>
</p>

<p align="center">
  <a href="https://buymeacoffee.com/hajirstudio">
    Support RaiaMinify on Buy Me a Coffee
  </a>
</p>

Donations are optional and do not unlock required features. The core minification workflow remains free.

---

## License

RaiaMinify is released under the MIT License.

See the [LICENSE](LICENSE) file for the complete license text.

---

## Author and Support

Developed and maintained by **Haiere** and **HajirStudio**.

- Website: [raiaminify.haiere.workers.dev](https://raiaminify.haiere.workers.dev/)
- Repository: [github.com/Haiere/raia-minify](https://github.com/Haiere/raia-minify)
- Donations: [buymeacoffee.com/hajirstudio](https://buymeacoffee.com/hajirstudio)
- Issues: Use the project's issue tracker.
- Security reports: Use `SECURITY.md` if available, or contact the maintainers privately.

---

<p align="center">
  Made with care for faster, more private code sharing.
</p>

<p align="center">
  <sub>Last updated: September 2026 · RaiaMinify v1.0.1</sub>
</p>
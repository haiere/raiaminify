(function () {
    'use strict';

    /*HELPERS & UTILITIES*/
    function fmtBytes(bytes) {
        if (bytes === 0) return '0 B';
        const u = ['B', 'KB', 'MB', 'GB'];
        const i = Math.min(u.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
        const v = bytes / Math.pow(1024, i);
        return (i === 0 ? v : v.toFixed(2)) + ' ' + u[i];
    }

    function countLines(s) {
        return s.length === 0 ? 0 : s.split('\n').length;
    }

    function extOf(name) {
        const m = /\.([a-z0-9]+)$/i.exec(name || '');
        return m ? m[1].toLowerCase() : '';
    }

    function esc(s) {
        return s.replace(/[&<>"']/g, c => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[c]));
    }

    function pad2(n) {
        return n < 10 ? '0' + n : '' + n;
    }

    function ts() {
        const d = new Date();
        return pad2(d.getHours()) + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
    }

    /*MINIFICATION ENGINES*/
    // --- JavaScript Minifier ---
    const JS_PRE_KW = new Set([
        'return', 'typeof', 'instanceof', 'in', 'of', 'new', 'delete', 'void', 'throw',
        'case', 'do', 'else', 'yield', 'await', 'extends', 'default'
    ]);
    const JS_PRE_PUNCT = new Set([
        '(', ',', '=', '[', '!', '&', '|', '?', ':', ';', '{', '}', '+', '-', '*', '%',
        '<', '>', '~', '^', '\n', 'START'
    ]);

    function minifyJS(src) {
        let i = 0, n = src.length, out = [], last = 'START';

        function isIdStart(c) { return /[A-Za-z_$]/.test(c); }
        function isIdPart(c) { return /[A-Za-z0-9_$]/.test(c); }

        while (i < n) {
            const c = src[i];
            
            // Single-line comments
            if (c === '/' && src[i + 1] === '/') {
                while (i < n && src[i] !== '\n') i++;
                continue;
            }
            // Multi-line comments
            if (c === '/' && src[i + 1] === '*') {
                i += 2;
                while (i < n && !(src[i] === '*' && src[i + 1] === '/')) i++;
                i += 2;
                continue;
            }
            // Strings (single and double quotes)
            if (c === '"' || c === "'") {
                const q = c;
                out.push(q);
                i++;
                while (i < n && src[i] !== q) {
                    if (src[i] === '\\') {
                        out.push(src[i]);
                        i++;
                        if (i < n) { out.push(src[i]); i++; }
                        continue;
                    }
                    if (src[i] === '\n') break;
                    out.push(src[i]);
                    i++;
                }
                if (i < n && src[i] === q) { out.push(src[i]); i++; }
                last = ')';
                continue;
            }
            // Template Literals
            if (c === '`') {
                out.push(c);
                i++;
                while (i < n) {
                    if (src[i] === '\\') {
                        out.push(src[i]);
                        i++;
                        if (i < n) { out.push(src[i]); i++; }
                        continue;
                    }
                    if (src[i] === '`') {
                        out.push(src[i]);
                        i++;
                        break;
                    }
                    if (src[i] === '$' && src[i + 1] === '{') {
                        out.push('${');
                        i += 2;
                        let d = 1;
                        while (i < n && d > 0) {
                            if (src[i] === '{') d++;
                            else if (src[i] === '}') d--;
                            if (d === 0) { out.push('}'); i++; break; }
                            out.push(src[i]);
                            i++;
                        }
                        continue;
                    }
                    out.push(src[i]);
                    i++;
                }
                last = ')';
                continue;
            }
            // Regex literals
            if (c === '/' && (JS_PRE_PUNCT.has(last) || JS_PRE_KW.has(last))) {
                let j = i + 1, inClass = false, safe = true;
                while (j < n) {
                    const ch = src[j];
                    if (ch === '\\') { j += 2; continue; }
                    if (ch === '\n') { safe = false; break; }
                    if (ch === '[') inClass = true;
                    else if (ch === ']') inClass = false;
                    else if (ch === '/' && !inClass) break;
                    j++;
                }
                if (safe && j < n && src[j] === '/') {
                    out.push(src.slice(i, j + 1));
                    i = j + 1;
                    while (i < n && /[a-z]/i.test(src[i])) { out.push(src[i]); i++; }
                    last = ')';
                    continue;
                }
            }
            // Identifiers
            if (isIdStart(c) || /[0-9]/.test(c)) {
                let j = i;
                while (j < n && isIdPart(src[j])) j++;
                const w = src.slice(i, j);
                out.push(w);
                i = j;
                last = JS_PRE_KW.has(w) ? w : ')';
                continue;
            }
            // Spaces
            if (c === ' ' || c === '\t') {
                let j = i;
                while (j < n && (src[j] === ' ' || src[j] === '\t')) j++;
                const prev = out.length ? out[out.length - 1] : '\n';
                if (prev[prev.length - 1] !== '\n' && prev[prev.length - 1] !== undefined) out.push(' ');
                i = j;
                continue;
            }
            // Newlines
            if (c === '\n' || c === '\r') {
                let j = i;
                while (j < n && (src[j] === '\n' || src[j] === '\r' || src[j] === ' ' || src[j] === '\t')) j++;
                while (out.length && /[ \t]$/.test(out[out.length - 1])) out.pop();
                if (out.length && out[out.length - 1] !== '\n') out.push('\n');
                i = j;
                continue;
            }
            out.push(c);
            last = c;
            i++;
        }
        let r = out.join('');
        return r.replace(/^\n+/, '').replace(/\n+$/, '\n');
    }

    // --- CSS Minifier ---
    function minifyCSS(src) {
        let i = 0, n = src.length, out = [];
        while (i < n) {
            const c = src[i];
            if (c === '/' && src[i + 1] === '*') {
                i += 2;
                while (i < n && !(src[i] === '*' && src[i + 1] === '/')) i++;
                i += 2;
                continue;
            }
            if (c === '"' || c === "'") {
                const q = c;
                out.push(q);
                i++;
                while (i < n && src[i] !== q) {
                    if (src[i] === '\\') {
                        out.push(src[i]);
                        i++;
                        if (i < n) { out.push(src[i]); i++; }
                        continue;
                    }
                    out.push(src[i]);
                    i++;
                }
                if (i < n) { out.push(src[i]); i++; }
                continue;
            }
            if (/\s/.test(c)) {
                let j = i;
                while (j < n && /\s/.test(src[j])) j++;
                const prev = out.length ? out[out.length - 1] : '\n';
                const pch = prev[prev.length - 1];
                const next = src[j];
                if (pch !== '{' && pch !== '}' && pch !== ';' && pch !== ':' && pch !== ',' && pch !== undefined &&
                    next !== '{' && next !== '}' && next !== ';' && next !== ',' && next !== undefined) {
                    out.push(' ');
                }
                i = j;
                continue;
            }
            out.push(c);
            i++;
        }
        let r = out.join('');
        return r.replace(/;+}/g, '}').replace(/^\s+|\s+$/g, '');
    }

    // --- HTML Minifier ---
    function minifyHTML(src) {
        const vaults = [];
        function vault(s) {
            const t = '\u0000VAULT' + vaults.length + '\u0000';
            vaults.push(s);
            return t;
        }

        let work = src.replace(/<(pre|textarea)([^>]*)>([\s\S]*?)<\/\1>/gi, (m, tag, attrs, inner) => {
            return '<' + tag + attrs + '>' + vault(inner) + '</' + tag + '>';
        });

        work = work.replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gi, (m, open, css, close) => {
            let min = css;
            try { min = minifyCSS(css); } catch (_) { min = css.trim(); }
            return open + vault(min) + close;
        });

        work = work.replace(/(<script\b([^>]*)>)([\s\S]*?)(<\/script>)/gi, (m, open, attrs, js, close) => {
            if (/\bsrc\s*=/i.test(attrs)) return open + close;
            if (/type\s*=\s*["'](?!(?:text\/javascript|application\/javascript|module)["'])[^"']*["']/i.test(attrs)) return m;
            let min = js;
            try { min = minifyJS(js); } catch (_) { min = js.trim(); }
            return open + vault(min) + close;
        });

        work = work.replace(/<!--(?!\[if[\s\S]*?\])[\s\S]*?-->/g, (m) => m.startsWith('<!--[if') ? m : '');
        work = work.split('\n').map(l => l.replace(/[ \t]+$/, '')).join('\n');
        work = work.replace(/[ \t]{2,}/g, ' ');
        work = work.replace(/\n{2,}/g, '\n');
        work = work.replace(/>\s*\n\s*</g, '>\n<');
        work = work.replace(/^\s+|\s+$/g, '');

        return work.replace(/\u0000VAULT(\d+)\u0000/g, (m, idx) => vaults[Number(idx)]);
    }

    // --- JSON & Generic Minifiers ---
    function minifyJSON(src) {
        return JSON.stringify(JSON.parse(src));
    }

    function minifyGeneric(src) {
        let r = src.split('\n').map(l => l.replace(/[ \t]+$/, '')).join('\n');
        r = r.replace(/\n{3,}/g, '\n\n');
        return r.replace(/^\n+/, '').replace(/\s+$/, '\n');
    }

    const JS_EXT = new Set(['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx']);
    const CSS_EXT = new Set(['css']);
    const HTML_EXT = new Set(['html', 'htm']);
    const JSON_EXT = new Set(['json']);

    function pickMinifier(name) {
        const e = extOf(name);
        if (JS_EXT.has(e)) return { fn: minifyJS, label: 'JavaScript' };
        if (CSS_EXT.has(e)) return { fn: minifyCSS, label: 'CSS' };
        if (HTML_EXT.has(e)) return { fn: minifyHTML, label: 'HTML' };
        if (JSON_EXT.has(e)) return {
            fn: (s) => { try { return minifyJSON(s); } catch (_) { return minifyGeneric(s); } },
            label: 'JSON'
        };
        return { fn: minifyGeneric, label: 'generic' };
    }

    /*UI CONTROLLER & DOM HANDLERS*/
    const DZ = document.getElementById('dropzone');
    const FI = document.getElementById('file-input');
    const FCR = document.getElementById('file-chip-region');
    const MB = document.getElementById('minify-btn');
    const MBL = document.getElementById('minify-btn-label');
    const DB = document.getElementById('download-btn');
    const LB = document.getElementById('log-body');
    const LC = document.getElementById('log-clear');
    const TR = document.getElementById('toast-region');

    const RE = document.getElementById('readout-empty');
    const G = document.getElementById('gauge');
    const GPV = document.getElementById('gauge-percent-value');
    const GBF = document.getElementById('gauge-bar-fill');
    const SSB = document.getElementById('stat-size-before');
    const SSA = document.getElementById('stat-size-after');
    const SLB = document.getElementById('stat-lines-before');
    const SLA = document.getElementById('stat-lines-after');

    const SN = document.getElementById('siteNav');

    let currentFile = null,
        currentText = null,
        resultText = null,
        resultFilename = null;

    /* Navbar scroll effect */
    window.addEventListener('scroll', () => {
        SN.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    /* Logging */
    function log(msg, ok) {
        const row = document.createElement('div');
        if (ok) row.classList.add('ok');
        row.innerHTML = '<span class="t">' + ts() + '</span>' + esc(msg);
        LB.appendChild(row);
        LB.scrollTop = LB.scrollHeight;
    }

    /* Toast Notification */
    function toast(msg, err) {
        const el = document.createElement('div');
        el.className = 'toast' + (err ? ' error' : '');
        el.setAttribute('role', 'status');
        el.innerHTML = '<span class="t-dot" aria-hidden="true"></span><span></span>';
        el.querySelector('span:last-child').textContent = msg;
        TR.appendChild(el);

        setTimeout(() => {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.3s ease';
        }, 3200);
        setTimeout(() => { el.remove(); }, 3600);
    }

    LC.addEventListener('click', () => {
        LB.innerHTML = '';
        log('Log cleared.');
    });

    /* File Chips UI */
    function renderChip() {
        if (!currentFile) { FCR.innerHTML = ''; return; }
        FCR.innerHTML =
            '<div class="file-chip">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>' +
            '<span class="fc-name">' + esc(currentFile.name) + '</span>' +
            '<span class="fc-size">' + fmtBytes(currentFile.size) + '</span>' +
            '<button type="button" id="fc-remove" aria-label="Remove selected file">' +
            '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>' +
            '</button>' +
            '</div>';

        document.getElementById('fc-remove').addEventListener('click', (e) => {
            e.stopPropagation();
            resetAll();
        });
    }

    function resetAll() {
        currentFile = null;
        currentText = null;
        resultText = null;
        resultFilename = null;
        FI.value = '';
        MB.disabled = true;
        DB.disabled = true;
        renderChip();
        RE.style.display = 'flex';
        G.classList.remove('is-active');
        GBF.style.width = '0%';
    }

    /* File Loading Handler */
    async function handleFile(file) {
        if (!file) return;
        currentFile = file;
        resultText = null;
        resultFilename = null;
        DB.disabled = true;
        renderChip();
        RE.style.display = 'flex';
        G.classList.remove('is-active');
        GBF.style.width = '0%';
        log('Loaded "' + file.name + '" — ' + fmtBytes(file.size) + '.');
        try {
            currentText = await file.text();
            MB.disabled = false;
            log(countLines(currentText).toLocaleString() + ' lines detected.');
        } catch (err) {
            log('Could not read file: ' + err.message);
            toast('Could not read that file.', true);
            MB.disabled = true;
        }
    }

    /* Dropzone Drag & Drop Events */
    DZ.addEventListener('click', () => FI.click());
    DZ.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            FI.click();
        }
    });
    FI.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
    });

    ['dragenter', 'dragover'].forEach(ev => {
        DZ.addEventListener(ev, (e) => {
            e.preventDefault();
            e.stopPropagation();
            DZ.classList.add('is-dragover');
        });
    });
    ['dragleave', 'drop'].forEach(ev => {
        DZ.addEventListener(ev, (e) => {
            e.preventDefault();
            e.stopPropagation();
            DZ.classList.remove('is-dragover');
        });
    });
    DZ.addEventListener('drop', (e) => {
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) handleFile(f);
    });

    /* Compression Trigger */
    MB.addEventListener('click', () => {
        if (!currentFile || currentText === null) return;
        MB.disabled = true;
        DZ.classList.add('is-busy');
        MBL.textContent = 'Minifying…';
        const sp = document.createElement('span');
        sp.className = 'spinner';
        MB.insertBefore(sp, MB.firstChild);

        const { fn, label } = pickMinifier(currentFile.name);
        log('Detected "' + (extOf(currentFile.name) || 'unknown') + '" — using ' + label + ' rules.');

        setTimeout(() => {
            const t0 = performance.now();
            try {
                const before = currentText;
                const after = fn(before);
                const t1 = performance.now();

                const bSize = new Blob([before]).size;
                const aSize = new Blob([after]).size;
                const bLines = countLines(before);
                const aLines = countLines(after);
                const red = bSize > 0 ? Math.max(0, ((bSize - aSize) / bSize) * 100) : 0;

                resultText = after;
                const ext = extOf(currentFile.name);
                const base = currentFile.name.replace(/\.[a-z0-9]+$/i, '');
                resultFilename = base + '.min' + (ext ? '.' + ext : '');

                RE.style.display = 'none';
                G.classList.add('is-active');
                GPV.textContent = red.toFixed(1) + '%';
                requestAnimationFrame(() => { GBF.style.width = Math.min(100, red) + '%'; });
                SSB.textContent = fmtBytes(bSize);
                SSA.textContent = fmtBytes(aSize);
                SLB.textContent = bLines.toLocaleString();
                SLA.textContent = aLines.toLocaleString();

                log('Minified in ' + (t1 - t0).toFixed(0) + ' ms.', true);
                log('Size: ' + fmtBytes(bSize) + ' → ' + fmtBytes(aSize) + ' (' + red.toFixed(1) + '% smaller).', true);
                log('Lines: ' + bLines.toLocaleString() + ' → ' + aLines.toLocaleString() + '.', true);

                DB.disabled = false;
                toast('Minified — ' + red.toFixed(1) + '% smaller.');
            } catch (err) {
                log('Minify failed: ' + err.message);
                toast('Something went wrong while minifying that file.', true);
            } finally {
                const sp2 = MB.querySelector('.spinner');
                if (sp2) sp2.remove();
                MBL.textContent = 'Compress File';
                MB.disabled = false;
                DZ.classList.remove('is-busy');
            }
        }, 30);
    });

    /* Download Action */
    DB.addEventListener('click', () => {
        if (resultText === null) return;
        const blob = new Blob([resultText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = resultFilename || 'minified.txt';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        log('Downloaded "' + (resultFilename || 'minified.txt') + '".', true);
    });

    /* Mobile Navigation Drawer Toggle */
    const navToggle = document.getElementById('navToggle');
    const navOverlay = document.getElementById('navOverlay');
    const navMobileMenu = document.getElementById('navMobileMenu');

    function toggleNav(open) {
        const isOpen = open !== undefined ? open : navMobileMenu.classList.contains('open');
        if (isOpen) {
            navMobileMenu.classList.remove('open');
            navOverlay.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        } else {
            navMobileMenu.classList.add('open');
            navOverlay.classList.add('open');
            navToggle.setAttribute('aria-expanded', 'true');
        }
    }

    navToggle.addEventListener('click', () => toggleNav());
    navOverlay.addEventListener('click', () => toggleNav(true));
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => toggleNav(true));
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMobileMenu.classList.contains('open')) toggleNav(true);
    });

    /* Cookie Banner Management */
    window.acceptCookies = function () {
        document.getElementById('cookie-banner').classList.add('hidden');
        document.cookie = "cookieConsent=true; max-age=31536000; path=/";
    };
    window.declineCookies = function () {
        document.getElementById('cookie-banner').classList.add('hidden');
        document.cookie = "cookieConsent=false; max-age=31536000; path=/";
    };

    function initCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        if (document.cookie.includes('cookieConsent=')) {
            banner.classList.add('hidden');
        } else {
            banner.classList.remove('hidden');
        }
    }
    initCookieBanner();

})();

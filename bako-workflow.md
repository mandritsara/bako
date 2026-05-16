# bako.blog – Lesson Publishing Workflow

**Site:** bako.blog (also at mandritsara.github.io/bako)  
**Purpose:** Malagasy and Tsimihety language learning, supporting Bako's tutoring work in Mandritsara since 2008.  
**Colour convention:** red = Tsimihety, blue = Official Malagasy — used consistently across all HTML pages.

---

## Site Structure

```
/ (root)
├── index.html               Home page
├── grammar.html             Grammar lesson index
├── introduction.html        Intro lesson index
├── themes.html              Theme lesson index
├── styles.css               Global stylesheet
├── bako-chat.html           Tsimihety AI tutor (teal)
├── malagasy-chat.html       Official Malagasy AI tutor (blue)
├── bako-brain.txt           Tsimihety chatbot knowledge base (fetched at runtime)
│
├── grammar/
│   ├── grammar.js           Loads shared header/footer for grammar pages
│   ├── header.html
│   ├── footer.html
│   ├── grammar1formingsentences.html
│   ├── grammar2phraseswithverbs.html
│   └── … (grammar1–16d)
│
├── introduction/
│   ├── intro.js
│   ├── introlesson1agreetings.html
│   └── … (lessons 1a–6)
│
├── theme/
│   ├── theme.js
│   ├── theme1family.html
│   └── … (themes 1–14b)
│
└── audio/
    ├── grammar/             grammar10.1.1.mp3, grammar10.2.1.mp3 …
    ├── intro/
    └── theme/               theme2.1.1.mp3 …
```

**Audio naming convention:** `[track][lesson].[page].[section].mp3`  
e.g. `grammar10.1.1.mp3` = Grammar lesson 10, page 1, section 1.

**Filename note:** Theme 2 and Theme 3 HTML filenames contain spaces — use `%20` encoding in `href` attributes. All other lesson filenames have no spaces.

**Subfolder JS:** Each subfolder (grammar/, introduction/, theme/) has its own copy of the JS and header/footer files. This is a GitHub Pages constraint — there is no server-side includes.

**Lesson index:** `lessons.json` in the repo root lists all published lessons with titles and URLs. The lesson index pages read this to build their link lists dynamically.

---

## Content Pipeline

Bako drafts lessons in French. J translates to English (with ChatGPT assistance), sends back to Bako for correction, and then publishes.

```
Bako drafts in French (.doc / .odt)
        ↓
J translates to English (ChatGPT → review)
        ↓
Send English draft back to Bako as .odt
        ↓
Bako corrects text + records audio
        ↓
J exports to PDF → uploads to GitHub
        ↓
J converts to HTML → publishes on site
```

---

## Step 1 — English Draft (ODT)

- Receive Bako's French `.doc` source file
- Translate content to English, preserving all Malagasy and Tsimihety text exactly
- Build an `.odt` file structured as: title, numbered sections, tables, vocabulary, exercises, answers
- **No audio placeholders** — Bako decides where audio goes when he records
- Send `.odt` to Bako

**Things to check with Bako at this stage:**
- Any Malagasy text that was unclear or had `????` in the source
- Tsimihety dialect spellings
- French-only glosses that need English equivalents

---

## Step 2 — Bako Reviews and Records

Bako opens the `.odt` in LibreOffice Writer on his computer:

- Corrects any errors in the Malagasy / Tsimihety text
- Records audio and notes the filenames / section references
- Returns corrected `.odt` to J

---

## Step 3 — PDF

Once the corrected `.odt` is received:

1. Apply any text corrections
2. Open in LibreOffice Writer → **File → Export as PDF**
3. Save as e.g. `grammar12indirectpronouns.pdf`
4. Upload to GitHub under the appropriate subfolder (`/grammar/`, `/introduction/`, `/theme/`)
5. Add to `lessons.json` if not already listed

**PDF is the offline-first deliverable.** Users with poor connectivity download these. PDFs with embedded audio (where Bako has added them in LibreOffice) are provided where possible.

---

## Step 4 — HTML

The HTML lesson pages use Bootstrap 5.3, with a consistent structure:

```
- breadcrumb nav
- lesson header (title, subtitle, date)
- sections as Bootstrap cards (border-0, shadow-sm)
- tables for pronoun paradigms, vocabulary, exercises
- audio players: <audio controls class="w-100 mt-3">
- PDF download button
- prev / next lesson nav
- shared header/footer loaded by grammar.js (or intro.js / theme.js)
```

### Publishing steps

1. Open the HTML draft (or write from scratch following the template)
2. Apply all corrections from Bako's reviewed ODT
3. Add `<audio>` elements with correct mp3 paths once files are uploaded:
   ```html
   <audio controls class="w-100 mt-3">
     <source src="/audio/grammar/grammar12.1.1.mp3" type="audio/mpeg" />
   </audio>
   ```
4. Check prev/next navigation links match actual adjacent lesson filenames
5. Check the PDF download link matches the uploaded PDF filename
6. Paste HTML into GitHub's web editor:
   - Press `.` on the repo page to open the browser VS Code editor
   - Navigate to the correct subfolder
   - Create or update the file
   - Commit directly to main
7. Update `lessons.json` if this is a new lesson

**GitHub Pages caching:** newly uploaded files (especially images/audio) may not appear immediately. Append `?v=1` to the URL to force a cache refresh during testing.

---

## AI Chat Tutors

Two chatbots are deployed as standalone HTML pages:

| Page | Model | Colour | Knowledge base |
|------|-------|--------|---------------|
| `bako-chat.html` | Gemini 2.5 Flash | Teal | `bako-brain.txt` (fetched at runtime) |
| `malagasy-chat.html` | Gemini 2.5 Flash | Blue | None (cheaper per message) |

Both use three learning modes: **Guided / Practice / Immersion**.

**API key security:** The Gemini API key is stored as an encrypted secret in a Cloudflare Worker (`bako-gemini-proxy` at ceejay77.workers.dev). The Worker accepts requests only from authorised origins. Never put API keys in the GitHub repo — public repos are scanned automatically.

**Updating the Tsimihety knowledge base:** Edit `bako-brain.txt` in the repo root. The chatbot fetches it fresh at runtime, so no HTML changes are needed.

---

## Useful Technical Notes

- **CSS over images** for colour swatches and simple visual elements (e.g. Lesson 6 colour blocks)
- **Image display:** busy illustration grids use a single combined JPG (max-width ~750–780px); verb illustration sequences use left-aligned images with text beside them
- **`?v=1` cache busting** for newly uploaded images or audio that don't appear
- **Browser VS Code editor:** press `.` on any GitHub repo page
- **UK English spelling** throughout: practise (verb), colour, etc.

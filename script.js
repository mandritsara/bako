// ------------------------------
// Header + Footer (root-relative)
// ------------------------------
function loadHeaderFooter() {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  if (header) {
    fetch("/header.html")
      .then(r => { if (!r.ok) throw new Error("header"); return r.text(); })
      .then(html => { header.innerHTML = html; markActiveNav(header); })
      .catch(err => console.error("Error loading header:", err));
  }

  if (footer) {
    fetch("/footer.html")
      .then(r => { if (!r.ok) throw new Error("footer"); return r.text(); })
      .then(html => footer.innerHTML = html)
      .catch(err => console.error("Error loading footer:", err));
  }
}

// Highlight the nav link for the current page (header.html hardcodes Home)
function markActiveNav(header) {
  const clean = (p) => p.replace(/^\/bako(?=\/)/, "").replace(/index\.html$/, "");
  const here = clean(location.pathname);
  header.querySelectorAll(".topnav a").forEach(a => {
    a.classList.toggle("active", clean(new URL(a.href, location.href).pathname) === here);
  });
}

// ------------------------------
// Lesson progress (saved in this browser only)
// The folder scripts (grammar.js, theme.js, introduction.js) record each lesson page opened.
// ------------------------------
const PROGRESS_KEY = "bako-progress";

// "/bako/theme/theme%202%20the%20house.pdf" → "/theme/theme 2 the house"
function lessonKey(url) {
  const path = decodeURI(new URL(url, location.href).pathname);
  return path.replace(/^\/bako(?=\/)/, "").replace(/\.(html|pdf)$/i, "").toLowerCase();
}

function readProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; } catch (e) { return {}; }
}

function saveProgress(progress) {
  try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)); } catch (e) {}
}

// ------------------------------
// Lessons (root-relative)
// ------------------------------
function loadLessons() {
  const path = location.pathname.toLowerCase();
  const category =
    path.includes("introduction") ? "Introductory Lessons" :
    path.includes("grammar")      ? "Grammar Lessons" :
    path.includes("theme")        ? "Thematic Lessons"   : null;

  if (!category) return;

  fetch("/lessons.json", { cache: "no-store" })
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(data => {
      const box = document.getElementById("lessons-container");
      if (!box) return;

      const cat = (data.lessons || []).find(c => c.category === category);
      if (!cat) return;

      // If lessons.json still has old github.io links, normalize them to root paths
      const normalize = (url) => url.replace(/^https?:\/\/mandritsara\.github\.io\/bako\//, "/");

      const el = (tag, cls, text) => {
        const e = document.createElement(tag);
        if (cls) e.className = cls;
        if (text) e.textContent = text;
        return e;
      };

      // Drop "(I)", "(II)", "(continued 2)" so the parts of a lesson share one title
      const baseTitle = (t) => t.replace(/\s*\((?:I{1,3}|continued[^)]*)\)\s*$/i, "").trim();

      // ── One entry per lesson part ──
      // "Lesson 9b - COMPARISONS (II)" → number "9", letter "b"
      const parts = cat.links.map(lesson => {
        const m = lesson.title.match(/^(Lesson\s+([\d-]+)([a-z]?))\s*(?:-\s+)?(.*)$/i);
        const [title, extra] = (m ? m[4] : lesson.title).split(/\s+\+\s+/);
        const pdf = normalize(lesson.url);
        return {
          label: m ? m[1] : "",
          num: m ? m[2] : lesson.title,
          letter: m ? m[3].toUpperCase() : "",
          title,
          extra: extra ? extra.replace(/^\((.*)\)$/, "$1") : "",
          pdf,
          html: pdf.replace(/\.pdf$/i, ".html"),
          key: lessonKey(pdf),
          image: lesson.image,
          icon: lesson.icon,
          links: [],      // every <a> pointing at this part, updated once we know HTML vs PDF
          pdfOnly: false
        };
      });

      // ── Group consecutive parts with the same lesson number into one card ──
      const lessons = [];
      parts.forEach(p => {
        const last = lessons[lessons.length - 1];
        if (last && last.num === p.num && p.letter) last.parts.push(p);
        else lessons.push({ num: p.num, parts: [p] });
      });

      const progress = readProgress();
      const seen = (p) => Boolean(progress[p.key]);

      const link = (part, cls, text) => {
        const a = el("a", cls, text);
        a.href = part.pdf;
        a.dataset.key = part.key;
        part.links.push(a);
        return a;
      };

      // ── Cards ──
      const grid = el("div", "lesson-grid");

      lessons.forEach(lesson => {
        const first = lesson.parts[0];
        const multi = lesson.parts.length > 1;
        const done = lesson.parts.filter(seen).length;

        const card = el("div", "lesson-tile");
        if (done === lesson.parts.length) card.classList.add("done");
        else if (done) card.classList.add("started");

        if (first.image) {
          const pic = el("div", "lesson-pic");
          const img = el("img");
          img.src = first.image;
          img.alt = "";
          img.loading = "lazy";
          pic.appendChild(img);
          card.appendChild(pic);
        } else if (first.icon) {
          const pic = el("div", "lesson-pic icon");
          const i = el("i", "fa-solid " + first.icon);
          i.setAttribute("aria-hidden", "true");
          pic.appendChild(i);
          card.appendChild(pic);
        }

        const body = el("div", "lesson-body");
        body.appendChild(el("span", "lesson-label", multi ? "Lesson " + lesson.num : first.label));
        body.appendChild(link(first, "lesson-title", multi ? baseTitle(first.title) : first.title));
        if (!multi && first.extra) body.appendChild(el("span", "lesson-extra", first.extra));

        if (multi) {
          // Same topic in every part → compact "Part A / Part B" buttons;
          // different topics → one line per part with its own title
          const sameTopic = lesson.parts.every(p => baseTitle(p.title) === baseTitle(first.title));
          const list = el("div", sameTopic ? "lesson-parts" : "lesson-parts rows");
          lesson.parts.forEach(p => {
            const a = link(p, "lesson-part" + (seen(p) ? " seen" : ""), "Part " + p.letter);
            if (!sameTopic && p !== first) a.appendChild(el("span", "part-title", " · " + p.title));
            list.appendChild(a);
          });
          body.appendChild(list);
        }

        card.appendChild(body);
        if (done === lesson.parts.length) {
          const tick = el("span", "lesson-tick");
          tick.setAttribute("aria-label", "Opened");
          card.appendChild(tick);
        }
        grid.appendChild(card);
      });

      // ── Progress + "continue where you left off" ──
      const doneCount = lessons.filter(l => l.parts.every(seen)).length;
      const visited = parts.filter(seen).sort((a, b) => progress[b.key] - progress[a.key]);
      const banner = el("div", "lesson-banner");

      if (visited.length) {
        const last = visited[0];
        const next = parts[parts.indexOf(last) + 1];
        banner.appendChild(el("p", "banner-kicker", "Continue where you left off"));
        banner.appendChild(el("p", "banner-title", last.label + " · " + last.title));
        const actions = el("div", "banner-actions");
        if (next) actions.appendChild(link(next, "banner-btn primary", "Next: " + next.label));
        actions.appendChild(link(last, "banner-btn", "Open " + last.label + " again"));
        banner.appendChild(actions);

        const meter = el("div", "lesson-meter");
        meter.appendChild(el("span", "", doneCount + " of " + lessons.length + " lessons opened"));
        const bar = el("div", "meter-bar");
        const fill = el("div", "meter-fill");
        fill.style.width = Math.round(100 * doneCount / lessons.length) + "%";
        bar.appendChild(fill);
        meter.appendChild(bar);
        const reset = el("button", "meter-reset", "Reset");
        reset.type = "button";
        reset.addEventListener("click", () => {
          if (!confirm("Clear your progress for " + category + "?")) return;
          const p = readProgress();
          parts.forEach(part => delete p[part.key]);
          saveProgress(p);
          location.reload();
        });
        meter.appendChild(reset);
        banner.appendChild(meter);
      } else {
        banner.appendChild(el("p", "banner-kicker", "New here? Start at the beginning"));
        banner.appendChild(el("p", "banner-title", parts[0].label + " · " + parts[0].title));
        const actions = el("div", "banner-actions");
        actions.appendChild(link(parts[0], "banner-btn primary", "Start " + parts[0].label));
        banner.appendChild(actions);
      }

      box.appendChild(banner);
      box.appendChild(grid);

      // Opening a lesson from here counts as progress (covers PDF-only lessons too)
      box.addEventListener("click", e => {
        const a = e.target.closest("a[data-key]");
        if (!a) return;
        const p = readProgress();
        p[a.dataset.key] = Date.now();
        saveProgress(p);
      });

      // Prefer HTML if present, otherwise PDF
      parts.forEach(part => {
        fetch(part.html, { method: "HEAD" })
          .then(res => {
            if (res.ok) part.links.forEach(a => { a.href = part.html; });
            else part.links.forEach(a => a.appendChild(el("span", "lesson-pdf", "PDF")));
          })
          .catch(() => {});
      });
    })
    .catch(err => console.error("Error loading lessons:", err));
}

// ------------------------------
// Init
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
  loadLessons();
});

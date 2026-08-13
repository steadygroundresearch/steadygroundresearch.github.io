/*
  Renders INSIGHTS (from insights-data.js) into whichever of the three
  spots exist on the current page. Include this file, after
  insights-data.js and before script.js, on index.html, insights.html,
  and learning.html. Every function guards on its target container, so
  it's safe to include everywhere.
*/

const CATEGORY_PREFIX = { financialStability: 'fs', macroprudential: 'mp', panelData: 'pd', dataDecisions: 'dd' };

// ---------------------------------------------------------------
// VALIDATION — a mistyped category or subtopic in insights-data.js doesn't
// throw an error anywhere: the "Click for a broader perspective" link just
// silently points at a Learning Hub anchor that doesn't exist (clicking it
// does nothing), or the piece silently never appears under any Emerging
// Developments stack. Both fail quietly, so this checks every INSIGHTS
// entry's category/subtopic pairing against the same list documented at
// the top of insights-data.js, and logs a console warning (visitors never
// see this — only whoever opens the browser console) for anything that
// doesn't match. Runs once at load, before anything is rendered.
// ---------------------------------------------------------------
const VALID_SUBTOPICS_BY_CATEGORY = {
  financialStability: ['cbdc', 'digitalAssets'],
  macroprudential: ['nbfi', 'systemicInterconnectedness'],
  panelData: ['modelSelection', 'interpretingResults'],
  dataDecisions: ['performanceMeasurement', 'decisionAnalytics']
};

function validateInsightsData() {
  INSIGHTS.forEach(item => {
    if (!CATEGORY_PREFIX[item.category]) {
      console.warn(`[insights-data] "${item.id}" has category "${item.category}", which CATEGORY_PREFIX doesn't recognise — its hub link URL (if it has a subtopic) will be malformed.`);
    }
    if (item.subtopic) {
      const validForCategory = VALID_SUBTOPICS_BY_CATEGORY[item.category] || [];
      if (!validForCategory.includes(item.subtopic)) {
        console.warn(`[insights-data] "${item.id}" pairs category "${item.category}" with subtopic "${item.subtopic}", which isn't one of the valid pairs. Its "Click for a broader perspective" link will point at a Learning Hub anchor that doesn't exist.`);
      }
      if (!item.hubTeaser) {
        console.warn(`[insights-data] "${item.id}" has a subtopic set but no hubTeaser — falling back to the generic teaser text.`);
      }
    }
    if (item.learningHubOnly && !item.subtopic) {
      console.warn(`[insights-data] "${item.id}" has learningHubOnly:true but no subtopic — it won't appear anywhere on the site.`);
    }
  });
}
validateInsightsData();

// ⚠️ Your Kit (formerly ConvertKit) account subdomain. From your form's
// inline embed snippet — <script async data-uid="..." src="https://sg-research.kit.com/.../index.js"> —
// "sg-research" is the part before ".kit.com". Update if you rename your
// Kit account.
const KIT_ACCOUNT_SUBDOMAIN = "sg-research";

// Loads Kit's real inline-embed script into every .ed-gate-kit-embed inside
// the given container. Kit's script renders its own form directly at that
// spot — no button, no popup, no click-handling on our side. Kit owns the
// email field, submission, and confirmation message from there.
//
// IMPORTANT: a <script> tag inserted via innerHTML does NOT execute in the
// browser — that's just how innerHTML works. So this creates the <script>
// element the proper way (document.createElement) and appends it, rather
// than relying on the tag being present in the HTML string.
function loadKitForms(container){
  container.querySelectorAll('.ed-gate-kit-embed').forEach(embed => {
    const uid = embed.dataset.kitUid;
    if (!uid || embed.dataset.loaded === 'true') return;

    // Our own "envelope + prompt text" framing is only meant to hold the
    // spot before Kit's real form shows up. Once Kit actually renders
    // something into this container — its form, and later its own
    // confirmation message after someone submits — our static text should
    // step aside rather than keep sitting there looking stale/contradictory.
    const lockedBox = embed.closest('.ed-gate-locked');
    const observer = new MutationObserver(() => {
      const hasRealContent = Array.from(embed.children).some(el => el.tagName !== 'SCRIPT');
      if (hasRealContent && lockedBox) {
        lockedBox.classList.add('ed-gate-kit-active');
        observer.disconnect();
      }
    });
    observer.observe(embed, { childList: true });

    // A unique query string per instance, even when two embeds share the
    // same form UID (as CBDC and Tokenisation currently do), so the browser
    // treats each <script> load as a distinct request rather than a repeat
    // of one it's already seen. This is a low-risk attempt at the reported
    // "second embed of the same UID doesn't render" issue — it fixes things
    // if the cause is browser-side request/response caching, but NOT if
    // Kit's own script keeps an internal registry keyed by UID and skips
    // re-initialising a UID it's already rendered once on the page. If the
    // Tokenisation embed still doesn't show after this, the real fix is
    // giving it its own separate Kit form UID in insights-data.js.
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-uid', uid);
    script.src = `https://${KIT_ACCOUNT_SUBDOMAIN}.kit.com/${uid}/index.js?_=${Date.now()}${Math.floor(Math.random() * 10000)}`;
    embed.appendChild(script);
    embed.dataset.loaded = 'true';
  });
}

// Sorts newest-first by dateSort. When two entries share the exact same
// dateSort (e.g. both just say "2026-07" with no day), a plain sort leaves
// them in whatever order they happen to sit in the array — which meant a
// brand-new entry could get bumped off the homepage's top-3 by an older
// entry that simply appeared earlier in the file. As a safety net, ties are
// broken by array position instead, treating whichever entry comes LATER in
// the file as the more recently added one. This is a fallback only — giving
// dateSort an actual day (see the field docs in insights-data.js) is the
// real fix, since it makes ties rare in the first place.
function sortedInsights(list) {
  return list
    .map((item, i) => ({ item, i }))
    .sort((a, b) => {
      const cmp = b.item.dateSort.localeCompare(a.item.dateSort);
      return cmp !== 0 ? cmp : b.i - a.i;
    })
    .map(x => x.item);
}

// ---------------------------------------------------------------
// SHARED LINK-ROW LOGIC — used by both insightItemHTML (homepage) and
// insightAccordionHTML (archive), so the two treatments can never drift
// out of sync with each other.
//
// The rule: whether "Click for a broader perspective →" appears is driven
// entirely by item.subtopic — set it, and the item is understood to have
// a genuine connection to a Learning Hub focus area/key topic, worth
// giving the reader as a second path. Leave it out, and the piece is
// treated as Insight-only: nothing to draw a broader perspective from,
// just the source.
//
// The source link's own wording changes depending on whether the hub
// link is present alongside it: "Prefer the primary source?" only makes
// sense when there's something else being offered to prefer OVER — when
// the hub link is the only other option. If there's no hub link, that
// phrasing reads oddly (prefer it to what?), so the source link falls
// back to a plain "Read the full paper →" instead.
// ---------------------------------------------------------------
function insightHubTeaserHTML(item) {
  return item.subtopic
    ? `<p class="insight-hub-teaser-text">${item.hubTeaser || 'This piece also connects to a topic in the Learning Hub.'}</p>`
    : '';
}

function insightLinksRowHTML(item) {
  const hubLink = item.subtopic
    ? `<a class="insight-related" href="learning.html#ed-insight-${CATEGORY_PREFIX[item.category]}-${item.subtopic}">Click for a broader perspective →</a>`
    : '';

  const sourceLinkText = hubLink
    ? 'Prefer the primary source? Read the full paper →'
    : 'Read the full paper →';

  const sourceLink = item.sourceUrl
    ? `<a class="insight-source" href="${item.sourceUrl}" target="_blank" rel="noopener">${sourceLinkText}</a>`
    : '';

  // If a piece has neither (no subtopic, no sourceUrl) the row is omitted
  // entirely rather than rendering an empty wrapper div.
  return (hubLink || sourceLink)
    ? `<div class="insight-links-row">${hubLink}${sourceLink}</div>`
    : '';
}

function insightItemHTML(item, showCategory) {
  const catLabel = INSIGHT_CATEGORY_LABELS[item.category] || item.category;
  const catBadge = showCategory
    ? `<span class="insight-category-badge">${catLabel}</span>`
    : '';

  // Teaser text (if this piece connects to a Learning Hub subtopic) stays on
  // its own line, above the links row.
  const hubTeaserText = insightHubTeaserHTML(item);
  const linksRow = insightLinksRowHTML(item);

  return `
    <div class="insight-item" data-category="${item.category}">
      <span class="insight-date">${item.date}</span>
      ${catBadge}
      <h4>${item.title}</h4>
      <div class="insight-summary-wrap">
        <div class="insight-summary" data-clamped="true">${item.summary}</div>
        <button type="button" class="insight-read-more-btn" hidden>Read more ↓</button>
      </div>
      ${hubTeaserText}
      ${linksRow}
    </div>
  `;
}

// Clamps each .insight-summary to a few lines and only reveals its
// "Read more" toggle when the text actually overflows that clamp — a short
// summary gets no button at all. Re-run this any time new insight-item
// markup is injected (homepage latest-3, and each archive draw/show-more).
function initReadMoreToggles(scope) {
  scope.querySelectorAll('.insight-summary-wrap').forEach(wrap => {
    const summary = wrap.querySelector('.insight-summary');
    const btn = wrap.querySelector('.insight-read-more-btn');
    if (!summary || !btn) return;

    summary.dataset.clamped = 'true';
    btn.hidden = true;
    btn.textContent = 'Read more ↓';

    requestAnimationFrame(() => {
      if (summary.scrollHeight > summary.clientHeight + 2) btn.hidden = false;
    });

    btn.onclick = () => {
      const isClamped = summary.dataset.clamped === 'true';
      summary.dataset.clamped = isClamped ? 'false' : 'true';
      btn.textContent = isClamped ? 'Read less ↑' : 'Read more ↓';
    };
  });
}

// ---------------------------------------------------------------
// ARCHIVE ROW — collapsed by default (date + category pill + title only),
// expands via <details> to reveal the summary, hub teaser, and links row.
// This is what keeps the Insights archive from turning into a long stack
// of always-open cards as more entries are added. Used ONLY by the archive
// (renderInsightsArchive) — the homepage's latest-2 list stays as full,
// always-open cards via insightItemHTML above, since 2 items is never
// enough to feel overwhelming.
// ---------------------------------------------------------------
function insightAccordionHTML(item) {
  const catLabel = INSIGHT_CATEGORY_LABELS[item.category] || item.category;

  const hubTeaserText = insightHubTeaserHTML(item);
  const linksRow = insightLinksRowHTML(item);

  return `
    <details class="insight-accordion-item" data-category="${item.category}">
      <summary>
        <span class="insight-accordion-date">${item.date}</span>
        <span class="insight-category-badge">${catLabel}</span>
        <span class="insight-accordion-title">${item.title}</span>
      </summary>
      <div class="insight-accordion-body">
        <div class="insight-summary">${item.summary}</div>
        ${hubTeaserText}
        ${linksRow}
      </div>
    </details>
  `;
}

// ---------------------------------------------------------------
// 1. HOMEPAGE — latest 3, no category badge needed (single teaser list)
// ---------------------------------------------------------------
function renderHomepageInsights() {
  const container = document.getElementById('insights-latest');
  if (!container) return;
  const latest = sortedInsights(INSIGHTS.filter(i => !i.learningHubOnly)).slice(0, 2);
  container.innerHTML = latest.map(item => insightItemHTML(item, false)).join('');
  initReadMoreToggles(container);
}

// ---------------------------------------------------------------
// 2. INSIGHTS ARCHIVE — everything, with category filter pills
// ---------------------------------------------------------------
function renderInsightsArchive() {
  const container = document.getElementById('insights-archive');
  const pillsContainer = document.getElementById('insights-filters');
  const moreRow = document.getElementById('insights-show-more-row');
  const countLabel = document.getElementById('insightsCount');
  if (!container || !pillsContainer) return;

  const all = sortedInsights(INSIGHTS.filter(i => !i.learningHubOnly));

  // Build filter pills: All + one per category actually in use
  const categoriesInUse = [...new Set(all.map(i => i.category))];
  const pillsHTML = ['<button class="xpill active" data-cat="all">All</button>']
    .concat(categoriesInUse.map(cat =>
      `<button class="xpill" data-cat="${cat}">${INSIGHT_CATEGORY_LABELS[cat] || cat}</button>`
    ));
  pillsContainer.innerHTML = pillsHTML.join('');

  // Only the first INITIAL_SHOW entries render on load / on a filter switch —
  // keeps the first view compact as the archive grows. "Show more" reveals
  // the rest of that filtered set in one click; switching filters resets
  // back to INITIAL_SHOW again.
  const INITIAL_SHOW = 6;

  function renderList(filter) {
    const items = filter === 'all' ? all : all.filter(i => i.category === filter);
    let visibleCount = Math.min(INITIAL_SHOW, items.length);

    if (countLabel) {
      countLabel.textContent = filter === 'all'
        ? 'Showing all Insights'
        : `${INSIGHT_CATEGORY_LABELS[filter] || filter} — ${items.length} Insight${items.length === 1 ? '' : 's'}`;
    }

    function draw() {
      const visible = items.slice(0, visibleCount);
      container.innerHTML = visible.length
        ? visible.map(item => insightAccordionHTML(item)).join('')
        : '<p class="xempty-note">No Insights published yet in this category.</p>';

      if (!moreRow) return;
      const remaining = items.length - visibleCount;
      moreRow.innerHTML = remaining > 0
        ? `<button type="button" class="insights-show-more-btn">Show ${remaining} more Insight${remaining === 1 ? '' : 's'} ↓</button>`
        : '';
      const btn = moreRow.querySelector('.insights-show-more-btn');
      if (btn) btn.addEventListener('click', () => { visibleCount = items.length; draw(); });
    }

    draw();
  }

  // Preselect a category from ?cat= in the URL, if present (used by the
  // "+N earlier" links from the Learning Hub)
  const params = new URLSearchParams(window.location.search);
  const requestedCat = params.get('cat');
  const initialCat = (requestedCat && categoriesInUse.includes(requestedCat)) ? requestedCat : 'all';

  pillsContainer.querySelectorAll('.xpill').forEach(pill => {
    if (pill.dataset.cat === initialCat) pill.classList.add('active');
    else pill.classList.remove('active');
    pill.addEventListener('click', () => {
      pillsContainer.querySelectorAll('.xpill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderList(pill.dataset.cat);
    });
  });

  renderList(initialCat);
}

// ---------------------------------------------------------------
// 3. LEARNING HUB — inject latest 2 per subtopic into each
//    #ed-insight-{prefix}-{subtopic} stack, replacing the empty state
// ---------------------------------------------------------------
function renderEmergingDevInsights() {
  const stacks = document.querySelectorAll('.ed-insight-stack[id^="ed-insight-"]');
  if (!stacks.length) return;

  // Group insights by category+subtopic — entries with no subtopic are
  // Insights-only and are intentionally excluded from the Learning Hub
  const grouped = {};
  INSIGHTS.forEach(item => {
    if (!item.subtopic) return;
    const key = `${CATEGORY_PREFIX[item.category]}-${item.subtopic}`;
    (grouped[key] = grouped[key] || []).push(item);
  });

  stacks.forEach(stack => {
    const key = stack.id.replace('ed-insight-', '');
    const items = sortedInsights(grouped[key] || []);
    if (!items.length) return; // leave the existing empty-state placeholder as-is

    const shown = items.slice(0, 2);
    const remaining = items.length - shown.length;
    const category = shown[0].category;

    stack.innerHTML = shown.map(item => {
      const preview = item.hubPreview || item.summary;
      const hubHeadline = item.hubTitle || item.title;

      // OPTIONAL — a sentence or two of the actual gated piece, rendered
      // directly beneath the email box (but outside its dashed border, as
      // its own separate element) blurred/faded into unreadable background
      // texture. Purely a visual "there's real content back here" cue, not
      // meant to actually be read — aria-hidden so screen readers skip it,
      // and pointer-events/user-select disabled so it can't be selected or
      // copied out. Only ever appears alongside an actual gate (kitFormUid
      // set); the free Preview text above the gate is untouched by any of
      // this.
      const gatedExcerptHTML = (item.kitFormUid && item.gatedExcerpt)
        ? `<div class="ed-gate-teaser-wrap" aria-hidden="true"><p class="ed-gate-teaser-excerpt">${item.gatedExcerpt}</p></div>`
        : '';

      // fullArticlePdf and fullArticleFile both take precedence over the
      // Kit gate whenever set — this is the deliberate on/off switch for
      // gating. fullArticlePdf wins if both are somehow set on the same
      // entry, since it's the simpler/more robust of the two (a plain
      // link, no fetch, no separate image files to keep track of).
      const showFullArticlePdf = !!item.fullArticlePdf;
      const showFullArticleFile = !showFullArticlePdf && !!item.fullArticleFile;
      const showFullArticle = showFullArticlePdf || showFullArticleFile;

      const gateBlock = (item.kitFormUid && !showFullArticle) ? `
        <div class="ed-gate">
          <div class="ed-gate-locked">
            <span class="ed-gate-icon">✉️</span>
            <p class="ed-gate-copy">${item.gateLabel || 'Enter your email and the full piece will be sent to you.'}</p>
            <div class="ed-gate-kit-embed" data-kit-uid="${item.kitFormUid}"></div>
          </div>
          ${gatedExcerptHTML}
        </div>
      ` : '';

      // Only shown alongside an actual gate (kitFormUid set, and not
      // overridden by fullArticle) — tells the reader up front, right
      // under the free Preview text, that the rest of the piece is
      // unlocked by email rather than by clicking anything.
      const unlockNote = (item.kitFormUid && !showFullArticle)
        ? `<p class="ed-unlock-note">Enter your email below to unlock and receive the full piece.</p>`
        : '';

      // UNGATED FULL ARTICLE — same "Preview text stays, click for more"
      // shape as the gate it replaces. Two flavours:
      //   (a) fullArticlePdf — a plain link that opens the PDF in a new
      //       tab. No fetch, no separate image files, nothing that can
      //       silently break on a path mismatch — just a link to a file
      //       that either exists at that path or doesn't.
      //   (b) fullArticleFile — the article's HTML is fetched on first
      //       click and revealed inline (see initFullArticleToggles).
      const fullArticlePdfBlock = showFullArticlePdf ? `
        <div class="ed-full-article">
          <a class="ed-full-article-pdf-link" href="${item.fullArticlePdf}" target="_blank" rel="noopener">Read the full article (PDF) →</a>
        </div>
      ` : '';

      const fullArticleFileBlock = showFullArticleFile ? `
        <div class="ed-full-article">
          <button type="button" class="ed-full-article-toggle" aria-expanded="false" data-article-src="${item.fullArticleFile}">Read the full article →</button>
          <div class="ed-full-article-body" hidden></div>
        </div>
      ` : '';

      return `
        <details class="ed-insight-box" id="ed-insight-item-${item.id}">
          <summary>
            <span class="ed-insight-date">${item.date}</span>
            <span class="ed-insight-title">${hubHeadline}</span>
          </summary>
          <div class="ed-insight-expanded">
            <div class="ed-insight-summary"><strong class="ed-insight-key-label">Preview:</strong> ${preview}</div>
            ${unlockNote}
            ${gateBlock}
            ${fullArticlePdfBlock}
            ${fullArticleFileBlock}
          </div>
        </details>
      `;
    }).join('');

    initFullArticleToggles(stack);

    if (remaining > 0) {
      stack.insertAdjacentHTML('afterend',
        `<p class="ed-insight-more"><a href="insights.html?cat=${category}">+${remaining} earlier on this topic →</a></p>`
      );
    }
  });
}

// Click-to-expand for an ungated .ed-full-article block — mirrors
// initReadMoreToggles above but toggles a whole article body rather than
// clamped summary text.
//
// UNLIKE the old inline "fullArticle" field (full HTML pasted directly
// into insights-data.js), the article's HTML now lives in its own small
// file (see fullArticleFile in insights-data.js) and is only fetched the
// FIRST time someone actually clicks to expand it — nothing is downloaded
// just from the piece appearing in the list. dataset.loaded marks a body
// that's already been fetched, so re-toggling closed/open afterwards is
// instant and never re-fetches.
function initFullArticleToggles(scope){
  scope.querySelectorAll('.ed-full-article-toggle').forEach(btn => {
    btn.addEventListener('click', async () => {
      const body = btn.nextElementSibling;
      if (!body) return;

      if (body.dataset.loaded !== 'true') {
        const src = btn.dataset.articleSrc;
        btn.disabled = true;
        btn.textContent = 'Loading…';
        try {
          const res = await fetch(src);
          if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
          body.innerHTML = await res.text();
          body.dataset.loaded = 'true';
        } catch (err) {
          body.innerHTML = '<p class="xempty-note">Sorry — this article couldn\'t be loaded right now. Please try again shortly.</p>';
          console.warn(`[insights-render] failed to fetch fullArticleFile "${src}":`, err);
        } finally {
          btn.disabled = false;
        }
      }

      const isOpen = !body.hidden;
      body.hidden = isOpen;
      btn.textContent = isOpen ? 'Read the full article →' : 'Show less ↑';
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (!isOpen) body.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
}

// ---------------------------------------------------------------
// DEEP LINKING — two flavours of #ed-insight-... hash, both handled the
// same way below:
//   #ed-insight-fs-cbdc              (topic-level — points at a whole
//                                      subtopic stack; used by the
//                                      "Click for a broader perspective"
//                                      links from the homepage/archive)
//   #ed-insight-item-CBDC-Note-2026-07  (entry-level — points at one
//                                      specific piece's own accordion box,
//                                      using that entry's "id" field; this
//                                      is the one to share externally,
//                                      e.g. on LinkedIn, so a reader lands
//                                      directly on that piece rather than
//                                      the general topic area)
// Either way: open that panel and any collapsed accordion levels above it,
// then scroll to it. Written generically so it works whether a panel uses
// the older single-toggle-per-theme pattern (.ed-subtopics) or the newer
// nested Focus Area / Key Topic pattern (.ed-focus-body / .ed-topic-body).
// ---------------------------------------------------------------
function openDeepLinkedInsight() {
  const hash = window.location.hash;
  if (!hash || !hash.startsWith('#ed-insight-')) return;

  const target = document.querySelector(hash);
  if (!target) return;

  const panel = target.closest('.hub-panel');
  if (panel && panel.hidden) {
    panel.hidden = false;
    const toggleBtn = document.querySelector(`.hub-toggle[data-target="${panel.id}"]`);
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.textContent = 'Hide this section ↑';
    }
  }

  let node = target.parentElement;
  while (node && node !== panel) {
    if (node.hidden) {
      node.hidden = false;
      const toggle = node.previousElementSibling;
      if (toggle && toggle.tagName === 'BUTTON') {
        toggle.setAttribute('aria-expanded', 'true');
      }
    }
    node = node.parentElement;
  }

  // Entry-level links (#ed-insight-item-...) point directly at a <details>
  // accordion box — open it so the reader sees the Preview text and the
  // "Read the full article" link/button immediately, without an extra
  // click just to reveal the box itself. (They still have to click "Read
  // the full article" themselves to actually leave for the PDF/article —
  // this only handles getting them TO that button.) Topic-level links
  // (#ed-insight-fs-cbdc) point at the whole stack instead, which isn't a
  // <details> itself, so this simply doesn't apply to those.
  if (target.tagName === 'DETAILS') target.open = true;

  // If the entry reached this way happens to be gated (kitFormUid, no
  // fullArticlePdf/fullArticleFile override), its Kit embed still needs to
  // load — normally that only happens on a manual click-through via the
  // ed-topic-toggle/ed-focus-toggle handlers in script.js, which a deep
  // link bypasses entirely. Harmless no-op for an ungated entry.
  if (panel && typeof loadKitForms === 'function') loadKitForms(panel);

  setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
}

renderHomepageInsights();
renderInsightsArchive();
renderEmergingDevInsights();
openDeepLinkedInsight();
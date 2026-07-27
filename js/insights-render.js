/*
  Renders INSIGHTS (from insights-data.js) into whichever of the three
  spots exist on the current page. Include this file, after
  insights-data.js and before script.js, on index.html, insights.html,
  and learning.html. Every function guards on its target container, so
  it's safe to include everywhere.
*/

const CATEGORY_PREFIX = { financialStability: 'fs', macroprudential: 'mp', panelData: 'pd', dataDecisions: 'dd' };

function sortedInsights(list) {
  return [...list].sort((a, b) => b.dateSort.localeCompare(a.dateSort));
}

function insightItemHTML(item, showCategory) {
  const catLabel = INSIGHT_CATEGORY_LABELS[item.category] || item.category;
  const catBadge = showCategory
    ? `<span class="insight-category-badge">${catLabel}</span>`
    : '';

  // Teaser text (if this piece connects to a Learning Hub subtopic) stays on
  // its own line, above the links row.
  const hubTeaserText = item.subtopic
    ? `<p class="insight-hub-teaser-text">${item.hubTeaser || 'This piece also connects to a topic in the Learning Hub.'}</p>`
    : '';

  const hubLink = item.subtopic
    ? `<a class="insight-related" href="learning.html#ed-insight-${CATEGORY_PREFIX[item.category]}-${item.subtopic}">Click for further insights →</a>`
    : '';

  const sourceLink = item.sourceUrl
    ? `<a class="insight-source" href="${item.sourceUrl}" target="_blank" rel="noopener">Read the full paper →</a>`
    : '';

  // Both links (Learning Hub + source) sit together on one row. If a piece
  // has neither (no subtopic, no sourceUrl) the row is omitted entirely.
  const linksRow = (hubLink || sourceLink)
    ? `<div class="insight-links-row">${hubLink}${sourceLink}</div>`
    : '';

  return `
    <div class="insight-item" data-category="${item.category}">
      <span class="insight-date">${item.date}</span>
      ${catBadge}
      <h4>${item.title}</h4>
      <p>${item.summary}</p>
      ${hubTeaserText}
      ${linksRow}
    </div>
  `;
}

// ---------------------------------------------------------------
// 1. HOMEPAGE — latest 3, no category badge needed (single teaser list)
// ---------------------------------------------------------------
function renderHomepageInsights() {
  const container = document.getElementById('insights-latest');
  if (!container) return;
  const latest = sortedInsights(INSIGHTS.filter(i => !i.learningHubOnly)).slice(0, 3);
  container.innerHTML = latest.map(item => insightItemHTML(item, false)).join('');
}

// ---------------------------------------------------------------
// 2. INSIGHTS ARCHIVE — everything, with category filter pills
// ---------------------------------------------------------------
function renderInsightsArchive() {
  const container = document.getElementById('insights-archive');
  const pillsContainer = document.getElementById('insights-filters');
  if (!container || !pillsContainer) return;

  const all = sortedInsights(INSIGHTS.filter(i => !i.learningHubOnly));

  // Build filter pills: All + one per category actually in use
  const categoriesInUse = [...new Set(all.map(i => i.category))];
  const pillsHTML = ['<button class="xpill active" data-cat="all">All</button>']
    .concat(categoriesInUse.map(cat =>
      `<button class="xpill" data-cat="${cat}">${INSIGHT_CATEGORY_LABELS[cat] || cat}</button>`
    ));
  pillsContainer.innerHTML = pillsHTML.join('');

  function renderList(filter) {
    const items = filter === 'all' ? all : all.filter(i => i.category === filter);
    container.innerHTML = items.length
      ? items.map(item => insightItemHTML(item, true)).join('')
      : '<p class="xempty-note">No Insights published yet in this category.</p>';
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
      const keyMessage = item.hubKeyMessage || item.summary;
      const sourceLink = item.sourceUrl
        ? `<a class="ed-insight-source-link" href="${item.sourceUrl}" target="_blank" rel="noopener">Read the full paper →</a>`
        : '';
      return `
        <details class="ed-insight-box">
          <summary>
            <span class="ed-insight-date">${item.date}</span>
            <span class="ed-insight-title">${item.title}</span>
          </summary>
          <div class="ed-insight-expanded">
            <p class="ed-insight-summary"><strong class="ed-insight-key-label">Key Perspective:</strong> ${keyMessage}</p>
            ${sourceLink}
          </div>
        </details>
      `;
    }).join('');

    if (remaining > 0) {
      stack.insertAdjacentHTML('afterend',
        `<p class="ed-insight-more"><a href="insights.html?cat=${category}">+${remaining} earlier on this topic →</a></p>`
      );
    }
  });
}

// ---------------------------------------------------------------
// DEEP LINKING — if arriving at learning.html#ed-insight-fs-digitalAssets,
// open that panel and any collapsed accordion levels above it, then scroll
// to it. Written generically so it works whether a panel uses the older
// single-toggle-per-theme pattern (.ed-subtopics) or the newer nested
// Focus Area / Key Topic pattern (.ed-focus-body / .ed-topic-body).
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

  setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
}

renderHomepageInsights();
renderInsightsArchive();
renderEmergingDevInsights();
openDeepLinkedInsight();
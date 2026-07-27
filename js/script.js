const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const top = section.offsetTop;
      if (pageYOffset >= top - 120) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  const nodeContent = {

  panel: {
  type: 'text',
  title: 'Panel Data',

  body: `
    <h4>1. Where Did the Name “Panel Data” Come From?</h4>
    
    <p>
      Panel data emerged from the need to answer a fundamental question: 
    </p>

    <blockquote>
      How can the same entities be observed over time in order to distinguish 
      permanent differences between them from changes that occur through time?
    </blockquote>

    <p>
      The term <strong>panel</strong> did not actually originate from economics or statistics.
      Its roots lie in sociology and market research during the 1930s and 1940s.
    </p>

    <p>
      A key figure in its development was <strong>Paul Lazarsfeld</strong>, a professor of sociology and founder of the Bureau of Applied Social Research at Columbia University.
      While studying voting behaviour and consumer preferences, Lazarsfeld developed a method of interviewing the exact same group of respondents at regular intervals. 
    </p>

    <p>
      He referred to this group as a <em>panel</em>, borrowing the legal/public term for a selected group of individuals (like a jury panel or a panel of experts).
    </p>

    <p>
      Over time economists adopted the approach and datasets that followed the same units across multiple periods became known as <strong>panel data</strong>.
    </p>

    <h4>2. The Many Names of Panel Data</h4>

    <p>
      Although the underlying data structure is similar, different disciplines use different terminology:
    </p>

    <ul>
      <li><strong>Panel data</strong> – Econometrics and Economics</li>
      <li><strong>Longitudinal Data</strong> – Biostatistics, Epidemiology, and Sociology</li>
      <li><strong>Repeated Measures</strong> – Psychology and Experimental Design</li>
      <li><strong>Cross-Sectional Time Series (or Time-Series Cross-Sectional) Data</strong> – An earlier term widely used in econometrics and 
      still common in political science, comparative analysis and international relations.</li>
    </ul>
  `
   },

  what: {
    type: 'text',
    title: 'What is Panel Data?',
    body: `
      <p>
        Panel data is a dataset that follows the same entities over time. These entities may be individuals, firms, banks, countries, animals, regions,
        or any other unit that is observed repeatedly through time.
      </p>

      <p>
        Because the same entities are observed repeatedly, panel data combines two important dimensions of data analysis:
      </p>
        
      <ol>
        <li>
         The cross-sectional dimension, which captures many entities at a single point in time, and 
        </li>
         
        <li>
         The time series dimension, which follows a single entity across multiple time periods.
        </li>

      </ol>
      
      <p>
        By combining these two dimensions, panel data enables researchers to analyse both differences across entities and changes within entities over time.
      </p>

        <h4>Key feature:</h4>
          <blockquote>
            The defining characteristic of panel data is that the same entities are observed repeatedly across multiple time periods.
          </blockquote>

        <h4>Examples of panel data include:</h4>
      <ul>   
        <li>Annual financial statements of commercial banks over ten years.</li>
        <li>Household income surveys conducted on the same families every year.</li>
        <li>Economic indicators observed for multiple countries over several decades.</li>
        <li>Student performance records tracked throughout their years of schooling.</li>
        <li>Weight measurements of 48 pigs observed over nine successive weeks.</li>
      </ul>
      
       <strong>What Does a Panel Dataset Look Like?</strong>
      <p>
       The figure below illustrates a panel dataset organised in both long and wide formats.<br>
       Click the image to enlarge it.
      </p>

       <img
        src="resources/panel-data-methods/PanelDataformatInfographic.svg"
        class="zoom-infographic clickable-infographic"
        alt="Long and Wide Panel Data Formats">

        <strong>Reflection:</strong>
        <blockquote>
          There are many more examples of panel datasets than those listed above. 
          Can you think of a few?
        </blockquote>
    `
  },

  why: {
    type: 'text',
    title: 'Why Does Panel Data Matter?',
    body: `
      <p class="topic-lede">Panel data has become one of the most widely used data structures in economics, finance, sociology, epidemiology, and many other disciplines — because it offers several key advantages over purely cross-sectional or time-series data.</p>

      <div class="reason-grid">
        <div class="reason-card">
          <div class="reason-num">01</div>
          <h5>Tracks Change Over Time</h5>
          <p>Researchers can study how outcomes evolve over time and identify patterns of persistence, adjustment, and change.</p>
          <ul>
            <li>Changes in bank profitability</li>
            <li>Air pollution levels across countries</li>
            <li>Disease progression in patients after treatment</li>
            <li>Academic performance of students over successive school years</li>
          </ul>
        </div>
        <div class="reason-card">
          <div class="reason-num">02</div>
          <h5>Provides More Information and Greater Variability</h5>
          <p>Combining observations across both entities and time generally produces richer datasets than cross-sectional or time-series data alone, resulting in:</p>
          <ul>
            <li>Greater variability in the data</li>
            <li>More degrees of freedom</li>
          </ul>
          <p style="margin-top:10px;">These features can improve the precision and efficiency of statistical estimation.</p>
        </div>
        <div class="reason-card">
          <div class="reason-num">03</div>
          <h5>Helps Control for Unobserved Differences</h5>
          <p>Many entities possess characteristics that are difficult to measure directly but remain relatively constant over time, such as:</p>
          <ul>
            <li>Household preferences</li>
            <li>Individual ability</li>
            <li>Institutional characteristics</li>
            <li>Geographical conditions</li>
          </ul>
          <p style="margin-top:10px;">Panel data provides the information needed for panel data methods to account for many of these time-invariant characteristics.</p>
        </div>
        <div class="reason-card">
          <div class="reason-num">04</div>
          <h5>Facilitates the Study of Dynamic Behaviour</h5>
          <p>Many economic, biological, financial, and social processes evolve gradually rather than instantaneously. Panel data enables researchers to examine:</p>
          <ul>
            <li>Adjustment processes</li>
            <li>Persistence of behaviour</li>
            <li>Lagged effects</li>
            <li>Dynamic relationships</li>
          </ul>
        </div>
      </div>

      <blockquote class="connector-quote">
        <span class="kicker">Key Insight</span>
        <strong>The principal strength of panel data is its ability to distinguish between differences across entities and changes within the same entity over time.</strong>
        By combining these two dimensions, panel data provides a richer source of information that allows researchers to address questions that cannot be adequately examined using cross-sectional or time-series data alone.
      </blockquote>

      <div class="topic-footer">Sources: Hsiao, C. (2022). Analysis of Panel Data (4th ed.). Cambridge University Press. · Baltagi, B. H. (2021). Econometric Analysis of Panel Data (6th ed.). Springer.</div>
    `
  },

  type: {
    type: 'text',
    title: 'Types of Panel Data Structures',
    body: `
      <p class="topic-lede">Panel data tracks <strong>units (i)</strong> across <strong>time (t)</strong> — but "panel" is not one shape. How units are sampled, how complete the grid is, and what scale the units sit at, all change which structure you're working with. Eleven structures, drawn from Baltagi, Wooldridge, Hsiao, and Arellano, are outlined below.</p>

      <blockquote class="connector-quote">
        <span class="kicker">Note</span>
        <strong>The structures are not mutually exclusive — a real dataset is always a combination of several at once.</strong>
        A researcher rarely says just "panel data"; they say things like a <strong>"Short, Unbalanced, True Panel"</strong> or a <strong>"Long, Balanced, Macro Panel"</strong> — stacking one label from Time Depth, one from Completeness, one from Sample Design, and so on.
      </blockquote>

      <p class="ixt-caption">A small unbalanced panel — 3 units (i), 4 time periods (t)</p>
      <table class="ixt-table">
        <thead><tr><th></th><th>t1</th><th>t2</th><th>t3</th><th>t4</th></tr></thead>
        <tbody>
          <tr><th>i1</th><td><span class="ixt-cell filled"></span></td><td><span class="ixt-cell filled"></span></td><td><span class="ixt-cell filled"></span></td><td><span class="ixt-cell filled"></span></td></tr>
          <tr><th>i2</th><td><span class="ixt-cell filled"></span></td><td><span class="ixt-cell filled"></span></td><td><span class="ixt-cell empty"></span></td><td><span class="ixt-cell filled"></span></td></tr>
          <tr><th>i3</th><td><span class="ixt-cell filled"></span></td><td><span class="ixt-cell filled"></span></td><td><span class="ixt-cell filled"></span></td><td><span class="ixt-cell filled"></span></td></tr>
        </tbody>
      </table>

      <div class="xfilters" id="pd-type-filters">
        <button class="xpill active" data-filter="all">All 11</button>
        <button class="xpill" data-filter="completeness">Completeness</button>
        <button class="xpill" data-filter="time">Time Depth</button>
        <button class="xpill" data-filter="scale">Aggregation Level</button>
        <button class="xpill" data-filter="sample">Sample Design</button>
        <button class="xpill" data-filter="dim">Dimensionality</button>
      </div>

      <div class="icon-legend">
        <div class="lg-item"><span class="lg-swatch lg-filled"></span> Rows = units (i) · Columns = time periods (t)</div>
        <div class="lg-item"><span class="lg-swatch lg-filled"></span> Brass cells = observed unit-time combinations</div>
        <div class="lg-item"><span class="lg-swatch lg-empty"></span> Grey cells = missing observations</div>
        <div class="lg-item"><span class="lg-swatch lg-alt"></span> Teal cells = a different unit/sample group</div>
      </div>

      <p class="section-label-note" id="pd-type-count">Showing all 11 structures</p>

      <div class="pd-grid" id="pd-type-grid">

        <div class="pd-card" data-cat="completeness">
          <div class="pd-card-top"><div><div class="pd-cat-tag">Completeness</div><h5>Balanced Panel</h5></div>
            <div class="pd-icon-col"><div class="micro-grid mg-balanced"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><span class="pd-mg-caption">no gaps — full grid</span></div>
          </div>
          <p class="pd-oneline">Every unit is observed in every time period — a complete N×T rectangle.</p>
          <details><summary>Explain</summary><div class="pd-details-body">There are no gaps: each of the N units has a full run of T observations. This is the simplest case and the one most estimation theory is initially built around.</div></details>
        </div>

        <div class="pd-card" data-cat="completeness">
          <div class="pd-card-top"><div><div class="pd-cat-tag">Completeness</div><h5>Unbalanced Panel</h5></div>
            <div class="pd-icon-col"><div class="micro-grid mg-unbalanced"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><span class="pd-mg-caption">some cells missing</span></div>
          </div>
          <p class="pd-oneline">Some units are missing observations in some periods.</p>
          <details><summary>Explain</summary><div class="pd-details-body">Gaps appear due to survey non-response, firms entering or exiting a market, deaths, migration, or discontinued data collection — the norm rather than the exception in real-world data.</div></details>
        </div>

        <div class="pd-card" data-cat="time">
          <div class="pd-card-top"><div><div class="pd-cat-tag">Time Depth</div><h5>Short Panel</h5></div>
            <div class="pd-icon-col"><div class="micro-grid mg-short"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><span class="pd-mg-caption">many units, few periods</span></div>
          </div>
          <p class="pd-oneline">Large number of units (N), but only a few time periods (T).</p>
          <details><summary>Explain</summary><div class="pd-details-body">Typically single digits to low double-digits of time periods. Most household and firm surveys fall here — e.g. thousands of firms tracked for five years.</div></details>
        </div>

        <div class="pd-card" data-cat="time">
          <div class="pd-card-top"><div><div class="pd-cat-tag">Time Depth</div><h5>Long Panel</h5></div>
            <div class="pd-icon-col"><div class="micro-grid mg-long"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><span class="pd-mg-caption">few units, many periods</span></div>
          </div>
          <p class="pd-oneline">Small-to-moderate number of units (N), but many time periods (T).</p>
          <details><summary>Explain</summary><div class="pd-details-body">Often spans decades of data. Country-level macro series — GDP, trade, inflation across countries — are the classic example.</div></details>
        </div>

        <div class="pd-card" data-cat="scale">
          <div class="pd-card-top"><div><div class="pd-cat-tag">Aggregation Level</div><h5>Micro Panel</h5></div>
            <div class="pd-icon-col"><div class="micro-grid mg-micro"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><span class="pd-mg-caption">many individual units</span></div>
          </div>
          <p class="pd-oneline">The unit of observation is an individual, household, or firm.</p>
          <details><summary>Explain</summary><div class="pd-details-body">These panels usually have large N and dominate labor economics, household finance, and industrial organization research — think PSID or NLSY.</div></details>
        </div>

        <div class="pd-card" data-cat="scale">
          <div class="pd-card-top"><div><div class="pd-cat-tag">Aggregation Level</div><h5>Macro Panel</h5></div>
            <div class="pd-icon-col"><div class="micro-grid mg-macro"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><span class="pd-mg-caption">few, larger units</span></div>
          </div>
          <p class="pd-oneline">The unit of observation is an aggregate — country, state, region, or industry.</p>
          <details><summary>Explain</summary><div class="pd-details-body">These panels tend to have smaller N and are common in growth economics, international finance, and macro-development research — think Penn World Tables.</div></details>
        </div>

        <div class="pd-card" data-cat="sample">
          <div class="pd-card-top"><div><div class="pd-cat-tag">Sample Design</div><h5>True Panel</h5></div>
            <div class="pd-icon-col"><div class="micro-grid mg-true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><span class="pd-mg-caption">same units, tracked</span></div>
          </div>
          <p class="pd-oneline">The exact same units are re-observed at each time point.</p>
          <details><summary>Explain</summary><div class="pd-details-body">Same households, same firms — individually identifiable across every wave. This is what "panel data" means in the strictest sense.</div></details>
        </div>

        <div class="pd-card" data-cat="sample">
          <div class="pd-card-top"><div><div class="pd-cat-tag">Sample Design</div><h5>Pseudo-Panel</h5></div>
            <div class="pd-icon-col"><div class="micro-grid mg-pseudo"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><span class="pd-mg-caption">different sample each column</span></div>
          </div>
          <p class="pd-oneline">A fresh random sample is drawn from the population each period.</p>
          <details><summary>Explain</summary><div class="pd-details-body">Since individuals can't be tracked, researchers group observations into cohorts — e.g. birth year — and follow cohort averages over time. Traces back to Deaton (1985).</div></details>
        </div>

        <div class="pd-card" data-cat="sample">
          <div class="pd-card-top"><div><div class="pd-cat-tag">Sample Design</div><h5>Rotating Panel</h5></div>
            <div class="pd-icon-col"><div class="micro-grid mg-rotating"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><span class="pd-mg-caption">units shift in/out over time</span></div>
          </div>
          <p class="pd-oneline">Units cycle in and out of the sample on a fixed schedule.</p>
          <details><summary>Explain</summary><div class="pd-details-body">A household might stay in the sample for four consecutive quarters, then be replaced. Common in official labor force surveys — e.g. the US Current Population Survey.</div></details>
        </div>

        <div class="pd-card" data-cat="dim">
          <div class="pd-card-top"><div><div class="pd-cat-tag">Dimensionality</div><h5>Two-Dimensional Panel</h5></div>
            <div class="pd-icon-col"><div class="micro-grid mg-2d"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><span class="pd-mg-caption">unit × time only</span></div>
          </div>
          <p class="pd-oneline">The standard structure — just two indices, unit (i) and time (t).</p>
          <details><summary>Explain</summary><div class="pd-details-body">This is what's implicitly assumed whenever "panel data" is mentioned without qualification.</div></details>
        </div>

        <div class="pd-card" data-cat="dim">
          <div class="pd-card-top"><div><div class="pd-cat-tag">Dimensionality</div><h5>Three-Dimensional / Nested Panel</h5></div>
            <div class="pd-icon-col"><div class="micro-grid mg-3d"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><span class="pd-mg-caption">extra layer beyond unit × time</span></div>
          </div>
          <p class="pd-oneline">An extra structural dimension sits alongside unit and time.</p>
          <details><summary>Explain</summary><div class="pd-details-body">Workers nested within firms within industries, over years; or students within classrooms within schools over time. Sometimes labeled "hierarchical" or "multilevel" panel data.</div></details>
        </div>

      </div>

      <div class="topic-footer">Sources: Baltagi — Econometric Analysis of Panel Data · Wooldridge — Econometric Analysis of Cross Section and Panel Data · Hsiao — Analysis of Panel Data · Arellano — Panel Data Econometrics · Deaton (1985) on pseudo-panels</div>
    `
  }

};

  // ---------------------------------------------------------------
  // PANEL DATA CONCEPT MAP — node clicks now render inline instead
  // of opening a modal (financialStability / macroprudential are no
  // longer here — they're standalone hub-panels in learning.html)
  // ---------------------------------------------------------------
  const map = document.getElementById('panel-map');

  map.addEventListener('load', () => {

  const svgDoc = map.contentDocument;
  const nodes = svgDoc.querySelectorAll('.node');

  nodes.forEach(node => {

    node.style.cursor = 'pointer';

    const shape = node.querySelector('path');
    const title = node.querySelector('title')?.textContent;

    node.addEventListener('mouseenter', () => {
      if (shape) {
        shape.style.fill = '#e6f0ff';
        shape.style.stroke = '#0056b3';
        shape.style.strokeWidth = '2px';
      }
    });

    node.addEventListener('mouseleave', () => {
      if (shape) {
        shape.style.fill = '';
        shape.style.stroke = '';
        shape.style.strokeWidth = '';
      }
    });

    node.addEventListener('click', () => {
      openNodeContent(nodeContent[title]);
    });

  });

});

function openNodeContent(content) {
  if (!content) return;
  const area = document.getElementById('panel-node-content');
  if (!area) return;

  area.innerHTML = '';
  area.hidden = false;

  const heading = document.createElement('h4');
  heading.className = 'node-inline-title';
  heading.textContent = content.title;
  area.appendChild(heading);

  if (content.type === 'text') {
    const body = document.createElement('div');
    body.innerHTML = content.body;
    area.appendChild(body);
    initTypeFilters(); // no-op unless the "type" node's filter markup is present
  } else if (content.type === 'iframe') {
    area.classList.add('is-loading');
    const iframe = document.createElement('iframe');
    iframe.src = content.src;
    iframe.title = content.title;
    iframe.style.cssText = 'width:100%; max-width:900px; height:78vh; border:none; border-radius:8px; display:block; margin:0 auto;';
    iframe.addEventListener('load', () => {
      area.classList.remove('is-loading');
      if (iframe.contentWindow) iframe.contentWindow.focus();
    }, { once: true });
    area.appendChild(iframe);
  }

  area.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function initTypeFilters(){
  const pills = document.querySelectorAll('#pd-type-filters .xpill');
  if (!pills.length) return;
  const cards = document.querySelectorAll('#pd-type-grid .pd-card');
  const countLabel = document.getElementById('pd-type-count');
  const labels = { all:'Showing all 11 structures', completeness:'Completeness', time:'Time Depth', scale:'Aggregation Level', sample:'Sample Design', dim:'Dimensionality' };

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const f = pill.dataset.filter;
      let shown = 0;
      cards.forEach(c => { const match = f === 'all' || c.dataset.cat === f; c.style.display = match ? '' : 'none'; if (match) shown++; });
      countLabel.textContent = f === 'all' ? labels.all : `${labels[f]} — ${shown} structure${shown === 1 ? '' : 's'}`;
    });
  });
}

// for infographics re: panel dataset long and wide formats.
const imageModal = document.getElementById("image-modal");
const expandedImage = document.getElementById("expanded-image");
const closeImage = document.querySelector(".close-image");

document.addEventListener("click", function(e){
    if(e.target.classList.contains("clickable-infographic")){
        expandedImage.src = e.target.src;
        imageModal.classList.add("active");
    }
});

closeImage.addEventListener("click", function(){
    imageModal.classList.remove("active");
});

imageModal.addEventListener("click", function(e){
    if(e.target === imageModal){
        imageModal.classList.remove("active");
    }
});

// ---------------------------------------------------------------
// HUB CARD ACCORDION — Financial Stability / Macroprudential Policy /
// Panel Data Methods / Data-Driven Decision-Making each toggle their own
// panel; opening one closes whichever else is open. A "✕ Close this
// section" button at the bottom of each panel (see .hub-panel-close) lets
// the reader collapse it without scrolling back up to the card.
// ---------------------------------------------------------------
function closeHubPanel(panel){
  if (!panel || panel.hidden) return;
  panel.hidden = true;
  const toggleBtn = document.querySelector(`.hub-toggle[data-target="${panel.id}"]`);
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.textContent = 'Explore further →';
    toggleBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

document.querySelectorAll('.hub-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const panel = document.getElementById(button.dataset.target);
    if (!panel) return;
    const isOpen = !panel.hidden;

    document.querySelectorAll('.hub-panel').forEach(p => { if (p !== panel) p.hidden = true; });
    document.querySelectorAll('.hub-toggle').forEach(b => {
      if (b !== button) { b.setAttribute('aria-expanded', 'false'); b.textContent = 'Explore further →'; }
    });

    panel.hidden = isOpen;
    button.setAttribute('aria-expanded', String(!isOpen));
    button.textContent = isOpen ? 'Explore further →' : 'Hide this section ↑';
    if (!isOpen) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.querySelectorAll('.hub-panel-close').forEach(button => {
  button.addEventListener('click', () => {
    closeHubPanel(button.closest('.hub-panel'));
  });
});

// ---------------------------------------------------------------
// FACT CAROUSEL — reusable for Financial Stability and Macroprudential
// ---------------------------------------------------------------
function initFactCarousel(containerId){
  const container = document.getElementById(containerId);
  if (!container) return;
  const slides = container.querySelectorAll('.fact-slide');
  const counterEl = container.querySelector('.fact-counter');
  let current = 0, timer;

  function updateCounter(){ counterEl.textContent = (current + 1) + ' / ' + slides.length; }
  function goTo(i){
    slides[current].classList.remove('active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
    updateCounter();
    resetTimer();
  }
  function resetTimer(){ clearInterval(timer); timer = setInterval(() => goTo(current + 1), 7000); }

  container.querySelectorAll('.fact-arrow').forEach(btn => {
    btn.addEventListener('click', () => goTo(current + parseInt(btn.dataset.dir)));
  });
  updateCounter();
  resetTimer();
}
initFactCarousel('fact-carousel-fs');
initFactCarousel('fact-carousel-mp');
initFactCarousel('fact-carousel-ddm');

// ---------------------------------------------------------------
// EMERGING DEVELOPMENTS — cluster accordion (Financial Stability,
// Macroprudential Policy, and Panel Data Methods all use this same
// pattern: click a theme to reveal its two subtopics)
// ---------------------------------------------------------------
document.querySelectorAll('.ed-cluster-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const subtopics = toggle.nextElementSibling;
    const isOpen = !subtopics.hidden;
    subtopics.hidden = isOpen;
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });
});

// ---------------------------------------------------------------
// EMERGING DEVELOPMENTS — Focus Area / Key Topic accordions (used where
// the theme itself is always shown open, and only its Focus Areas and
// Key Topics are individually click-to-expand, e.g. Financial Stability)
// ---------------------------------------------------------------
document.querySelectorAll('.ed-focus-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const body = toggle.nextElementSibling;
    if (!body) return;
    const isOpen = !body.hidden;
    body.hidden = isOpen;
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });
});

document.querySelectorAll('.ed-topic-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const body = toggle.nextElementSibling;
    if (!body) return;
    const isOpen = !body.hidden;
    body.hidden = isOpen;
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });
});

// added for app
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered');
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
*/
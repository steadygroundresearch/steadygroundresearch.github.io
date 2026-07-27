/*
  SINGLE SOURCE OF TRUTH FOR ALL INSIGHTS.
  Add a new insight by copying an object below and filling it in — it will
  automatically appear on: the homepage (latest 3), the Insights archive
  (with category filtering), and the matching Learning Hub subtopic under
  Emerging Developments (latest 2 per subtopic, oldest rolling off).

  FIELDS
  - id:        unique slug, lowercase-hyphenated, never reused
  - date:      display text, e.g. "July 2026"
  - dateSort:  "YYYY-MM" — used only for sorting, always zero-padded
  - title:     the headline
  - summary:   2-3 sentences — shown on the homepage and the Insights archive.
               Keep this scannable — a quick "what this is about," not the
               deep takeaway.
  - category:  one of: "financialStability" | "macroprudential" | "panelData"
  - subtopic:  OPTIONAL. Include it only if this piece should also appear in
               the Learning Hub's Emerging Developments section under the
               matching subtopic. Omit it entirely for an Insights-only piece
               (still shows on the homepage and the Insights archive — just
               won't be pushed into any Learning Hub subtopic, and shows no
               Learning Hub link at all).
               When included, it must match one of the keys listed below.
  - learningHubOnly: OPTIONAL, boolean, default false. Set to "true" for a
               piece that should appear ONLY in its Learning Hub subtopic —
               it will be completely excluded from the homepage's latest-3
               list and from the full Insights archive (and won't count
               toward that page's category pills/counts either). Requires
               "subtopic" to be set — otherwise the piece would show nowhere
               at all. Leave omitted (or explicitly "false") for the normal
               case, where a piece appears everywhere its other fields say it
               should.
  - hubTeaser: REQUIRED whenever "subtopic" is set. One sentence, written to
               the reader, naming the specific connection — e.g. "This paper
               also speaks to how digitalisation is reshaping financial
               stability risk." This is what the reader sees before deciding
               to click through, so make it specific to this piece, not generic.
  - hubKeyMessage: OPTIONAL, only relevant when "subtopic" is set. 2-3
               sentences giving the actual key finding or takeaway of the
               piece — written for a reader who has already clicked into this
               Learning Hub subtopic and wants more substance than the
               homepage summary. Shown in the Learning Hub box INSTEAD OF
               "summary". If omitted, "summary" is reused there as a fallback.
  - sourceUrl: link to the full piece (external paper, or "insights.html#id")

  VALID category + subtopic PAIRS (must match Learning Hub subtopic ids):
    financialStability : cbdc | digitalAssets
    macroprudential     : nbfi | systemicInterconnectedness
    panelData           : modelSelection | interpretingResults
    dataDecisions       : performanceMeasurement | decisionAnalytics
*/

const INSIGHTS = [
  {
    id: "mythos-ai-cyber-risk-2026-07",
    date: "July 2026",
    dateSort: "2026-07",
    title: "Can AI Become a Source of Systemic Risk? ",
    summary: "Artificial intelligence is rapidly reshaping the financial system, creating new opportunities while also introducing potential sources of systemic risk. A BIS Bulletin by Aldasoro et al. examines the channels through which AI could affect financial stability and why these risks warrant the attention of policymakers, supervisors, and financial institutions.",
    category: "macroprudential",
    subtopic: "systemicInterconnectedness",
    learningHubOnly: false,
    hubTeaser: "Explore how frontier AI is redefining cyber risk and what it could mean for the resilience of the financial system.",
    // DRAFT — replace with the paper's actual key finding once you've read
    // it in full; this is a placeholder so you can see the feature working.
    hubKeyMessage: "The increasing use of AI highlights why macroprudential policy focuses on safeguarding the stability of the financial system as a whole, rather than the safety of individual institutions. Even if individual firms manage AI responsibly, widespread reliance on similar models, shared infrastructure, or common technology providers can create vulnerabilities that extend across the financial system. The paper demonstrates how technological innovation can create new channels through which systemic risk may emerge and spread, reinforcing the need to assess risks from a system-wide perspective.",
    sourceUrl: "https://www.bis.org/publ/bisbull129.pdf"
  },
  {
    id: "AI-adoption-risks-2026-07",
    date: "July 2026",
    dateSort: "2026-07",
    title: "AI and Financial Stability: Balancing Innovation with Resilience",
    summary: "As AI adoption accelerates across financial institutions, the challenge is no longer whether to use it, but how to manage the risks it introduces. The IMF highlights the importance of balancing innovation with financial resilience through effective governance and oversight.",
    category: "financialStability",
    subtopic: "digitalAssets",
    learningHubOnly: false,
    hubTeaser: "Learn why understanding the financial stability risks of AI is becoming increasingly important.",
    // DRAFT — replace with the paper's actual key finding once you've read
    // it in full; this is a placeholder so you can see the feature working.
    hubKeyMessage: "The IMF's core message is that AI adoption inside financial institutions is outpacing the governance built to manage it. Institutions that bolt on AI oversight after the fact — rather than building it into risk management from the start — are the ones most exposed if models misbehave or fail under stress.",
    sourceUrl: "#"
  },
  {
    id: "[CBDC-2020-10]",
    date: "October 2020",
    dateSort: "2020-10",
    title: "What happens when central bank money becomes digital?",
    summary: "Central bank digital currencies (CBDCs) represent a major innovation in payment systems, offering potential benefits such as faster, more efficient, and more resilient payments. However, their introduction also raises important financial stability considerations, including their impact on financial intermediation, bank funding, liquidity dynamics, and the evolving role of central bank money within the financial system.",
    category: "financialStability",
    subtopic: "cbdc",
    learningHubOnly: true,
    hubTeaser: "[One sentence, written to the reader — not actually used anywhere since this piece is Learning-Hub-only, same note as summary above.]",
    hubKeyMessage: "CBDCs highlight the balance between financial innovation and financial stability. While digital central bank money could enhance payment efficiency, resilience, and accessibility, careful design is essential to ensure that it complements existing financial systems and does not create new vulnerabilities for financial institutions or the wider economy.",
    sourceUrl: "https://www.bis.org/publ/othp33.pdf"
  }
];

// Category display labels — used by the insights.html filter pills
const INSIGHT_CATEGORY_LABELS = {
  financialStability: "Financial Stability",
  macroprudential: "Macroprudential Policy",
  panelData: "Panel Data Methods",
  dataDecisions: "Data-Driven Decision Making"
};
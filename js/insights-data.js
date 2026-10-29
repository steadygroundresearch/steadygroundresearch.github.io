/*
  INSIGHTS — single source of truth for every Insight on the site.

  Each entry below appears automatically in:
    • the homepage (latest 2 Insights)
    • the Insights archive (with category filters)
    • its Learning Hub topic under Emerging Developments (latest 2 per topic;
      older ones are linked as "+N earlier on this topic")

  HOW IT WORKS
  The homepage/archive entry (title, summary, sourceUrl) is a short hook that
  points to an external paper. The Learning Hub side (hubTitle, hubPreview and
  a delivery option) teases your own original article, which the paper inspired.

  ADDING AN ENTRY — pick the scenario that fits
  Every entry starts with the same six fields:
    id, date, dateSort, title, summary, category
  Then add only the fields for your scenario.

  1. Insight only (homepage + archive; never in the Learning Hub)
     Add:  sourceUrl
     Do NOT add hubTeaser or subtopic.
     Example: "AI-adoption-risks-2026-07"

  2. Insight now, Learning Hub article planned but not written yet
     Add:  sourceUrl, hubTeaser, subtopic, hubLinkReady: false
     The teaser shows on the homepage card, but the "Click for a broader
     perspective" link stays hidden until the article is ready.
     Example: "stablecoins"

  3. Insight plus a finished Learning Hub article
     Add:  sourceUrl, hubTeaser, subtopic, hubTitle, hubPreview,
           hubDate + hubDateSort (only if posted on a different date),
           and ONE delivery option: fullArticlePdf (recommended),
           fullArticleFile, or kitFormUid.
     If the entry was in scenario 2, delete its hubLinkReady: false line,
     otherwise the link stays hidden.
     Example: "CBDC-Note-2026-07"

  4. Learning Hub only (not shown on the homepage or archive)
     Add:  learningHubOnly: true, subtopic, hubTitle, hubPreview,
           and one delivery option.
     hubTeaser and hubLinkReady have no effect here.

  FIELD REFERENCE
  - id:        unique slug, lowercase-hyphenated, never reused. It also forms
               the deep link to the entry: learning.html#ed-insight-item-<id>
  - date:      display text, e.g. "July 2026"
  - dateSort:  "YYYY-MM-DD", used only for sorting. Use a real day: entries
               with the same value are ordered by position in this file
               (later in the file counts as newer).
  - title:     the headline. Write it as a hook, not the paper's own title.
  - summary:   2-3 sentences for the homepage and archive. Lead with the
               plain-language takeaway: the card shows roughly the first 3
               lines before "Read more", and most visitors won't open the
               paper. Avoid openings like "This IMF Note presents...".
               HTML is allowed: <strong>, <em>, and <p>...</p> around each
               paragraph.
  - category:  "financialStability" | "macroprudential" | "panelData"
               | "dataDecisions"
  - hubTeaser: one sentence naming the specific connection to the Learning
               Hub topic, shown on the homepage/archive card. Set it whenever
               subtopic is set (a generic line appears if it is missing).
  - sourceUrl: link to the external paper, shown as "Read the full paper →"
               on the homepage/archive card only.

  LEARNING HUB FIELDS (these only apply once "subtopic" is set)
  - subtopic:  the Learning Hub topic this piece belongs to. Must match a
               valid pair listed at the bottom of this comment. Leave it out
               for an Insight-only piece.
  - learningHubOnly: true hides the entry from the homepage and archive.
               Requires subtopic.
  - hubLinkReady: false hides ONLY the "Click for a broader perspective" link
               on the homepage/archive card (the teaser still shows). The
               entry still appears in its Learning Hub stack with just the
               Preview text. Delete the line once the article is ready.
  - hubTitle:  headline in the Learning Hub box. Falls back to title.
  - hubPreview: text under "Preview:" in the Learning Hub box. This is the
               hook for your own article, not a summary of the external
               paper. No length limit. HTML is allowed (<strong>, <em>,
               <p>, <a href="...">). Falls back to summary.
  - hubDate, hubDateSort: when the Learning Hub article was posted, if that
               differs from the Insight. Set both together. hubDateSort
               ("YYYY-MM-DD") only orders the Learning Hub stack; the
               homepage and archive always sort by dateSort. They fall back
               to date and dateSort.

  DELIVERY OPTIONS (use one per entry)
  - fullArticlePdf: path to the PDF from the site root, e.g.
               "resources/insights/pdfs/pdfs-2026/cbdc-2026-07.pdf".
               Shows a "Read the full article (PDF) →" link under the Preview.
               File names are case-sensitive and must match exactly, with no
               stray spaces. The same file can be shared directly on LinkedIn.
               Takes precedence over fullArticleFile and kitFormUid.
  - fullArticleFile: path to an HTML file containing only the article body
               (<p>, <h4>, <img>, <ul>..., no <html> or <body> tags). Loaded
               when the reader clicks "Read the full article →". Image paths
               inside it are relative to the site root. Takes precedence
               over kitFormUid.
  - kitFormUid: turns on the email gate. Use the "data-uid" value from the
               Kit form's INLINE embed code. Ignored while fullArticlePdf or
               fullArticleFile is set; remove those to switch the gate back
               on. The article itself is delivered in the Kit email, so
               nothing needs to be hosted on the site.
  - gateLabel: optional prompt on the email box. Default: "Enter your email
               and the full piece will be sent to you."
  - gatedExcerpt: optional, with kitFormUid only. A sentence or two from the
               gated piece, shown blurred under the form as a visual cue.
               Plain text works best.

  VALID category + subtopic PAIRS
    financialStability : cbdc | digitalAssets | cash
    macroprudential    : nbfi | systemicInterconnectedness
    panelData          : modelSelection | interpretingResults
    dataDecisions      : performanceMeasurement | decisionAnalytics
*/


const INSIGHTS = [
  {
    id: "AI-adoption-risks-2026-07",
    date: "July 2026",
    dateSort: "2026-07-01",
    title: "AI and Financial Stability: Balancing Innovation with Resilience",
    summary: "<p>AI is moving into everyday financial decision-making faster than the oversight built to manage it, and that gap is where the real risk sits. Institutions that build governance in from the start, rather than bolting it on after something goes wrong, are the ones best placed to benefit from AI without taking on risk they haven't priced in.</p><p>The IMF's broader message: oversight, not the technology itself, is what will determine whether AI strengthens or undermines financial resilience over time.</p>",
    category: "financialStability",
    // Insight only: no subtopic, so it never appears in the Learning Hub.
    sourceUrl: "#"
  },

  {
    id: "mythos-ai-cyber-risk-2026-07",
    date: "July 2026",
    dateSort: "2026-07-10",
    title: "Can AI become systemic cyber risk?",
    summary: "<p>The concern with AI in finance isn't just what happens if one firm's model fails, it's what happens when many institutions lean on the same handful of AI providers, models, or infrastructure at once. A BIS Bulletin looks at how that kind of shared reliance could turn an isolated AI problem into a system-wide one.</p><p>Even firms that manage their own AI responsibly can still be exposed if the wider market becomes dependent on the same small set of tools, since a single outage or flaw could then ripple across many institutions at the same time.</p>",
    category: "macroprudential",
    hubTeaser: " Explore how frontier AI is redefining cyber risk and what it could mean for the resilience of the financial system.",
    sourceUrl: "https://www.bis.org/publ/bisbull129.pdf",
    learningHubOnly: false,
    subtopic: "systemicInterconnectedness",
    // TO DO: hubPreview still reads as commentary on the BIS paper. Replace it
    // with a hook for an original piece, then add fullArticlePdf.
    hubPreview: "The increasing use of AI highlights why macroprudential policy focuses on safeguarding the stability of the financial system as a whole, rather than the safety of individual institutions. Even if individual firms manage AI responsibly, widespread reliance on similar models, shared infrastructure, or common technology providers can create vulnerabilities that extend across the financial system. Understanding these system-wide risks is essential as AI becomes more deeply embedded in financial services."
  },

  {
    id: "CBDC-Note-2026-07",
    date: "August 2026",
    dateSort: "2026-08-12",
    title: "CBDC Implementation: The Benefits Are In The Details",
    summary: "<p>Retail central bank digital currencies (CBDCs) are often pitched as a safer and more efficient form of digital money. Nevertheless, introducing a CBDC is not simply a matter of replacing cash with a digital alternative. The real question is whether it can improve the way payments and the financial system work without creating new risks. An IMF Note \"<em>Evaluating the Implications of CBDC for Financial Stability</em>\" explains that the answer depends on the details. <p>The way a CBDC is designed, how widely it is adopted, and the structure of a country's financial system all influence whether it strengthens payment systems, supports financial inclusion, and preserves financial stability.</p>",
    category: "financialStability",
    hubTeaser: "Although developed primarily for policymakers, the Note provides valuable information for anyone seeking to understand the relationship between retail CBDCs and financial stability.",
    sourceUrl: "https://www.imf.org/-/media/files/publications/ftn063/2025/english/ftnea2025008.pdf",
    learningHubOnly: false,
    subtopic: "cbdc",
    hubTitle: "CBDC: Could the Biggest Impact Occur Behind the Scenes?",
    hubPreview: "Central Bank Digital Currencies (CBDCs) are often discussed in terms of how they could change the way people make payments, use cash, and interact with money. But the more consequential transformation may be happening elsewhere. While retail CBDCs have attracted much of the public attention, central banks are also exploring how digital forms of central bank money could reshape the infrastructure through which financial institutions transfer money and settle transactions. Could the biggest impact of CBDCs occur not in the money people use every day, but in the financial infrastructure operating behind it?",
    // Ungated while fullArticlePdf is set. Remove it to switch back to the
    // kitFormUid email gate.
    fullArticlePdf: "resources/insights/pdfs/pdfs-2026/cbdc-2026-07.pdf",
    kitFormUid: "29ff756091", // inactive while fullArticlePdf is set
    gateLabel: "Enter your email and we will send you the full piece.",
    gatedExcerpt: "<p>Yet, beyond these considerations another important development is taking place behind the scenes. Central banks alongside other financial institutions are exploring how digital forms of central bank money could reshape the financial system, particularly, how money is transferred and financial transactions are settled.</p>"
  },

  {
    id: "tokenizedfinance",
    date: "July 2026",
    dateSort: "2026-07-30",
    title: "Tokenised Finance: Potentially Transformative But Can It Really Deliver?",
    summary: "<p>Turning assets like deposits and securities into digital tokens promises faster, cheaper transactions, but whether tokenisation actually delivers on that promise depends on how well the new risks it introduces are managed. An IMF Note \"<em>Tokenized Finance</em>\" examines what policymakers need to consider for tokenisation to deliver greater efficiency without introducing risks that could undermine financial stability.</p><p>The policy choices made along the way, not just the technology itself, are what will determine whether tokenised deposits, securities, and smart contracts end up making finance more efficient or simply more complex.</p>",
    category: "financialStability",
    hubTeaser: "Explore the IMF's latest analysis to see why the future of finance depends as much on policy and trust as it does on technology.",
    sourceUrl: "https://www.imf.org/-/media/files/publications/imf-notes/2026/english/insea2026001.pdf",
    learningHubOnly: false,
    subtopic: "digitalAssets",
    hubTitle: "Beyond the Hype: Can Tokenisation Transform Cross-Border Finance?",
    fullArticlePdf: "resources/insights/pdfs/pdfs-2026/tokenizedfinance.pdf",
    hubPreview: "As financial markets and payment systems become increasingly digital, tokenisation could reshape how assets are issued, transferred, settled, and managed, as well as change how money moves across borders. Yet the technology may be only part of the story. The bigger question is whether the institutions and rules surrounding cross-border finance can evolve with it. \"<em><strong>Beyond the Hype: Can Tokenisation Transform Cross-Border Finance?</strong></em>\" explores what tokenisation could really change - and what may stand in its way.",
    kitFormUid: "29ff756091", // inactive while fullArticlePdf is set
    gateLabel: "Enter your email and we'll send you the full piece."
  },

  {
    id: "cash-in-use",
    date: "August 2026",
    dateSort: "2026-08-21",
    title: "Will We Really Become Cashless?",
    summary: "<p>For years, the rise of digital payments has fuelled predictions that cash would eventually disappear. But what if the transition to a cashless society is not as inevitable as we once thought?</p><p>A European Central Bank study, published in 2025, offers an interesting challenge to the conventional narrative. The study finds that while use in everyday transactions has continued to decline, cash continues to be used across generations, suggesting that its future may be more persistent than the traditional “cashless society” narrative implies.</p>",
    category: "financialStability",
    hubTeaser: "Why does cash continue to persist, and what role will it play in an increasingly digital payment system?",
    sourceUrl: "https://www.ecb.europa.eu/press/economic-bulletin/articles/2025/html/ecb.ebart202505_03~d74cb56069.en.html",
    subtopic: "cash",
    learningHubOnly: false,
    hubTitle: "Will We Really Become Cashless? A Global Perspective on the Future of Cash",
    fullArticlePdf: "resources/insights/pdfs/pdfs-2026/cash-in-use.pdf",
    hubPreview: "For years, the rise of digital payments has fuelled predictions that cash would eventually disappear.</p><p>In many economies, this transition is already well advanced. Recent evidence suggests that cash is accounting for a declining share of everyday transactions, while the use of digital payment methods continues to expand.</p><p>But is declining transactional use of cash equivalent to the disappearance of cash? This article examines this question by looking at the role of cash across the euro area, the United States, Sweden, India and South Africa, economies that differ in their payment systems, levels of financial inclusion and patterns of cash use.</p>",
    hubDate: "September 2026",
    hubDateSort: "2026-09-03"
  },

  {
    id: "quantitative-methods",
    date: "September 2026",
    dateSort: "2026-09-11",
    title: "Quantitative Models: A Reality Check",
    summary: "<p>Quantitative models help us understand complex problems, assess risks, explore scenarios, and inform decisions. But models are simplifications of reality, built on data, assumptions, and choices. Their value therefore depends not only on the results they produce, but on understanding what those results mean, and where their limitations lie.</p><p>A McKinsey article “Demystifying modeling: How quantitative models can—and can’t—explain the world” provides a useful introduction to what quantitative models can, and cannot, tell us.</p>",
    category: "panelData",
    hubTeaser: "Quantitative models are essential for helping us make sense of a world that is too complex to understand all at once. Their usefulness, however, depends on understanding both their strengths and limitations.",
    sourceUrl: "https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/demystifying-modeling-how-quantitative-models-can-and-cant-explain-the-world",
    subtopic: "modelSelection",
    learningHubOnly: false,
    hubTitle: "Beyond the Hausman Test: Choosing the Right Panel Data Model",
    fullArticlePdf: "resources/insights/pdfs/pdfs-2026/Hausman-test.pdf",
    hubPreview: "A range of quantitative approaches can be used to analyse panel data, with fixed-effects (FE) and random-effects (RE) models among the most common. Choosing between these models is important because they make different assumptions about the relationship between unobserved unit-specific characteristics and the explanatory variables or, in other words, the factors being used to explain an outcome. This means that, the choice of model has important implications for the validity and efficiency of the conclusions drawn from the analysis.</p><p>The Hausman test, introduced by Hausman (1978), is commonly used to inform the choice but, should the choice of a panel-data model depend primarily on the outcome of a statistical test?</p><p>This article explores that question by examining the Hausman test, including why it was developed, its purpose, strengths and limitations. It then considers the broader factors that should be considered when deciding on the right panel data model.</p>",
    hubDate: "September 2026",
    hubDateSort: "2026-09-30"
  },

  {
    id: "consumer-segmentation",
    date: "October 2026",
    dateSort: "2026-10-01",
    title: "B2C E-Commerce: What Do Consumers Want and What Do Businesses Deliver?",
    summary: "<p>E-commerce has reshaped how consumers shop and how businesses operate. The DHL 2026 E-Commerce Trends Report examines global e-commerce from both sides of the market, drawing on the views of 29,000 online shoppers across 29 countries and 5,800 e-commerce businesses across 28 countries. It explores changing shopping behaviour and expectations across areas including cross-border commerce, delivery and returns, payments, social commerce, AI and sustainability.</p><p>The report provides insights into what consumers expect from online shopping and how businesses are responding through their e-commerce practices, highlighting areas where shopper expectations and business practices align and where gaps remain.</p>",
    category: "dataDecisions",
    hubTeaser: "Online shopping behaviour provides valuable insights into how consumers are engaging with e-commerce and what they expect from businesses. These insights can help businesses and policymakers better understand changing consumer preferences, market trends and the evolving e-commerce landscape.",
    sourceUrl: "https://www.dhl.com/content/dam/dhl/local/global/dhl-ecommerce/documents/pdf/g0-ec-trends-report-2026.pdf",
    subtopic: "decisionAnalytics",
    learningHubOnly: false,
    hubTitle: "Customer Segmentation: Is It a Necessary Business Decision?",
    fullArticlePdf: "resources/insights/pdfs/pdfs-2026/CustomerSegmentation.pdf",
    hubPreview: "Many businesses are encouraged to adopt customer segmentation. Its use has been documented across diverse sectors, including entertainment, retail, hospitality, and travel, and is widely advocated as an important business decision, both in academic research and by management consultancies. Nevertheless, popularity and the growing ease of segmenting customers do not settle a more basic question: Is customer segmentation a necessary business decision?</p><p>To address this question, this article examines the benefits of customer segmentation, how digitalisation has changed it, and its limitations. It then considers whether customer segmentation is a necessary business decision.</p>",
    hubDate: "October 2026",
    hubDateSort: "2026-10-28"
  },

  {
    id: "stablecoins",
    date: "October 2026",
    dateSort: "2026-10-11",
    title: "Will Stablecoins Scale As a Payment Option?",
    summary: "<p>Stablecoins have been promoted as an innovative payment option with the potential to transform how payments are made. Nevertheless, the growing attention surrounding this innovation has yet to translate into widespread business adoption.</p><p>In July 2025, the United States passed the GENIUS Act, establishing a federal regulatory framework for payment stablecoins intended to ease supply-side constraints. However, easing these constraints does not necessarily translate into greater demand.</p><p>A recent Cleveland Fed survey of 148 firms in its Fourth District found limited interest in adopting stablecoins for transactions. The firms cited several reasons for their reluctance, including limited demand from customers and suppliers, uncertainty about the benefits, satisfaction with existing payment methods, and a desire to see how the market develops.</p>",
    category: "financialStability",
    hubTeaser: "Widespread adoption of stablecoins may require more than clear regulatory rules and availability. It may also require a demonstrable benefit, confidence that the risks are manageable, and time for businesses to assess their value.",
    sourceUrl: "https://www.clevelandfed.org/publications/economic-commentary/2026/ec-202622-will-us-firms-adopt-stablecoins",
    subtopic: "digitalAssets",
    hubLinkReady: false // remove this line once the Learning Hub article is ready
  }
];

// Category display labels — used by the insights.html filter pills
const INSIGHT_CATEGORY_LABELS = {
  financialStability: "Financial Stability",
  macroprudential: "Macroprudential Policy",
  panelData: "Panel Data Methods",
  dataDecisions: "Data-Driven Decision Making"
};
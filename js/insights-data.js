/*
  SINGLE SOURCE OF TRUTH FOR ALL INSIGHTS.
  Add a new insight by copying an object below and filling it in — it will
  automatically appear on: the homepage (latest 3), the Insights archive
  (with category filtering), and the matching Learning Hub subtopic under
  Emerging Developments (latest 2 per subtopic, oldest rolling off).

  MODEL: the homepage/archive entry (title, summary, sourceUrl) is a hook
  pointing at an EXTERNAL paper. The Learning Hub side is no longer a
  summary/commentary on that paper — it's a teaser ("hubPreview") for a piece
  of ORIGINAL material you create (a blog note, a chart, an infographic)
  that the paper merely inspired. That original piece is DELIVERED BY EMAIL
  (via a Kit sequence you set up separately) — nothing about the piece
  itself lives in this file or in the page's HTML/JS. See KIT_ACCOUNT_SUBDOMAIN
  at the top of insights-render.js, and the "kitFormUid" field below, for the
  one-time setup this needs.

  FIELDS
  - id:        unique slug, lowercase-hyphenated, never reused
  - date:      display text, e.g. "July 2026"
  - dateSort:  "YYYY-MM-DD" — used only for sorting, always zero-padded. Use
               a real day whenever you can (even a rough guess), not just the
               month — several pieces published in the same month will tie
               on a month-only value, and the tiebreak then falls back to
               array order (see the note in insights-render.js), which is a
               safety net, not a substitute for an accurate date. "YYYY-MM"
               still works on its own (it compares fine against day-level
               values) but is no longer the recommended format
  - title:     the headline — write this as a hook, not a restatement of the
               external paper's own title.
  - summary:   2-3 sentences — shown on the homepage and the Insights archive.
               Write for the non-technical reader FIRST: most visitors won't
               click through to the source paper, so the opening sentence(s)
               need to carry the actual "so what does this mean for my
               business" takeaway on their own, in plain language, not a
               restatement of the paper's own framing (avoid phrasing like
               "This IMF Note presents a framework..." or naming the paper's
               authors/title in the summary itself, since that's the
               technical reader's territory, not the plain-language reader's).
               The clamp shows roughly the first 3 lines before "Read more"
               — put the plain-language takeaway there, and use the text
               that follows (revealed by "Read more") for one layer deeper,
               still in plain language, not a second, denser register.
               Readers who do want the primary source have the "Prefer the
               primary source? Read the full paper" link in the same card
               (see sourceUrl below) — the summary itself doesn't need to
               do that job.
               Renders as HTML: use <strong>...</strong> or <em>...</em> to
               bold/italicise a phrase. For a real second paragraph, wrap
               each one in its own <p>...</p> tag (e.g. "<p>First
               point.</p><p>Second point.</p>") rather than typing a raw
               paragraph break — plain text with no <p> tags still works
               exactly as before, so nothing existing needs to change.
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
  - hubTeaser: REQUIRED whenever "subtopic" is set (and not learningHubOnly).
               One sentence, written to the reader, naming the specific
               connection — e.g. "This paper also speaks to how
               digitalisation is reshaping financial stability risk." This
               is what the reader sees on the HOMEPAGE/archive, before
               deciding to click through to the Learning Hub — make it
               specific to this piece, not generic.
  - hubTitle:  OPTIONAL, only relevant when "subtopic" is set. The headline
               shown in the Learning Hub's "Further Insights" box, in place
               of "title". Use this when the original piece deserves its own
               headline distinct from the homepage/archive hook — since
               "title" is written as a hook for the EXTERNAL paper, while
               the Learning Hub box is about YOUR original piece, the two
               don't always want the same words. If omitted, "title" is
               reused here as a fallback (previous behaviour, unchanged).
  - hubPreview: OPTIONAL, only relevant when "subtopic" is set. The enticing
               text shown in the Learning Hub box under the bold "Preview:"
               label. Renders as HTML, same as "summary" above — <strong>
               and <em> work for bolding/italicising a phrase, and wrapping
               separate <p>...</p> tags gives you real paragraph breaks.
               This is NOT a summary of the external paper — it's the
               hook for your own original piece (the thing someone gets
               access to after entering their email below it). Give the
               reader a genuinely good overview — there's no length limit
               here (no truncation, no character cap), so use as much space
               as the piece actually needs. Just leave enough unsaid that
               there's still a reason to sign up. If omitted, "summary" is
               reused here as a fallback.
               To cite the external paper, do it inline as a plain sentence
               within this text (e.g. "...building on a recent BIS Bulletin
               on AI-driven cyber risk, we mapped...") — you can embed a raw
               <a href="..."> tag directly, since this field renders as HTML.
               There's no automatic "Read the full paper" button in the
               Learning Hub box anymore; the citation belongs in your prose.
  - Delivery: write/paste the actual piece directly into the Kit email
               itself (in Kit's own automation/sequence editor) — attach the
               image, write the accompanying text right there. Nothing about
               the piece needs to live on this site at all. This is simpler
               than hosting a separate page per piece, and it's also more
               private: since there's no public URL for the piece anywhere,
               there's nothing to leak — only someone who actually receives
               that specific email can see it.
  - kitFormUid: OPTIONAL. Set once you've actually built the original piece
               AND set up a Kit form + sequence to deliver it. This is the
               "data-uid" value from that form's INLINE embed snippet in Kit
               (Kit dashboard → your form → Embed → make sure the "Inline"
               tab is selected, not Toggle/Modal/WordPress) — it's what
               makes Kit's real signup form render directly under this
               entry, in place of the free Preview text alone. Leave omitted
               while a topic's original piece doesn't exist yet — visitors
               just see the Preview text, no form.
               All entries can share the same kitFormUid (one form/sequence
               for everything) or use different ones per piece, if you set
               up separate Kit forms/sequences later.
  - gateLabel: OPTIONAL. Custom prompt text on the locked box, e.g. "Enter
               your email and we'll send the full infographic." Defaults to
               a generic "Enter your email and the full piece will be sent
               to you."
  - gatedExcerpt: OPTIONAL, only relevant when "kitFormUid" is also set. A
               sentence or two, LIFTED VERBATIM from the actual gated piece
               (the one you're delivering by email), rendered directly
               beneath the email signup box — blurred and faded so it's
               visually present but not actually readable. It's a "there's
               real content back here" cue, not something meant to be read;
               it's purely decorative (hidden from screen readers). Doesn't
               need to make sense out of context or avoid spoilers — since
               it's illegible, the exact wording barely matters, but pulling
               a real line from the piece (rather than writing new filler)
               keeps the effect honest. Leave omitted for no excerpt teaser
               (the gate box just ends after the email form, as before).
               Renders as HTML like summary/hubPreview above, but since the
               text is blurred, any bold/italic formatting won't be visible
               — plain text is simplest here.
  - sourceUrl: link to the external paper. Used ONLY on the homepage/Insights
               archive as the "Read the full paper →" link — no longer
               auto-linked anywhere in the Learning Hub box.

  VALID category + subtopic PAIRS (must match Learning Hub subtopic ids):
    financialStability : cbdc | digitalAssets
    macroprudential     : nbfi | systemicInterconnectedness
    panelData           : modelSelection | interpretingResults
    dataDecisions       : performanceMeasurement | decisionAnalytics
*/

const INSIGHTS = [
  {
    id: "AI-adoption-risks-2026-07",
    date: "July 2026",
    dateSort: "2026-07",
    title: "AI and Financial Stability: Balancing Innovation with Resilience",
    summary: "<p>AI is moving into everyday financial decision-making faster than the oversight built to manage it, and that gap is where the real risk sits. Institutions that build governance in from the start, rather than bolting it on after something goes wrong, are the ones best placed to benefit from AI without taking on risk they haven't priced in.</p><p>The IMF's broader message: oversight, not the technology itself, is what will determine whether AI strengthens or undermines financial resilience over time.</p>",
    category: "financialStability",
    // TEST CASE — Insight-only. No "subtopic" here on purpose: this piece
    // shows on the homepage and the Insights archive with just a "Read the
    // full paper" link, and does NOT appear anywhere in the Learning Hub.
    // (It previously had subtopic: "digitalAssets" set, which actually put
    // it in all three places at once — homepage, archive, AND the Learning
    // Hub's Tokenisation/CBDC stack — not "Learning Hub only" as intended.
    // If you'd rather test the opposite case — appearing ONLY in the
    // Learning Hub, hidden from the homepage/archive — that's
    // learningHubOnly: true, paired with a subtopic. Let me know and I'll
    // swap this entry to that instead, or set up a fresh one.)
    sourceUrl: "#"
  },

  {
    id: "mythos-ai-cyber-risk-2026-07",
    date: "July 2026",
    dateSort: "2026-07",
    title: "Can AI become systemic cyber risk?",
    summary: "<p>The concern with AI in finance isn't just what happens if one firm's model fails, it's what happens when many institutions lean on the same handful of AI providers, models, or infrastructure at once. A BIS Bulletin looks at how that kind of shared reliance could turn an isolated AI problem into a system-wide one.</p><p>Even firms that manage their own AI responsibly can still be exposed if the wider market becomes dependent on the same small set of tools, since a single outage or flaw could then ripple across many institutions at the same time.</p>",
    category: "macroprudential",
    subtopic: "systemicInterconnectedness",
    learningHubOnly: false,
    hubTeaser: " Explore how frontier AI is redefining cyber risk and what it could mean for the resilience of the financial system.",
    // DRAFT — this still reads as commentary on the BIS paper rather than a
    // teaser for an original piece. Replace with a hook for whatever you
    // create (e.g. a visual on AI-related outage/incident trends), then add
    // kitFormUid once the Kit form/sequence for it is built.
    hubPreview: "The increasing use of AI highlights why macroprudential policy focuses on safeguarding the stability of the financial system as a whole, rather than the safety of individual institutions. Even if individual firms manage AI responsibly, widespread reliance on similar models, shared infrastructure, or common technology providers can create vulnerabilities that extend across the financial system. Understanding these system-wide risks is essential as AI becomes more deeply embedded in financial services.",
    sourceUrl: "https://www.bis.org/publ/bisbull129.pdf"
  },
  
  {
    id: "IMF-CBDC-Note-2026-07",
    date: "July 2026",
    dateSort: "2026-07",
    title: "CBDC Implementation: The Benefits Are In The Details",
    summary: "<p>Retail central bank digital currencies (CBDCs) are often pitched as a safer and more efficient form of digital money. Nevertheless, introducing a CBDC is not simply a matter of replacing cash with a digital alternative. The real question is whether it can improve the way payments and the financial system work without creating new risks. An IMF Note \"<em>Evaluating the Implications of CBDC for Financial Stability</em>\" explains that the answer depends on the details. <p>The way a CBDC is designed, how widely it is adopted, and the structure of a country's financial system all influence whether it strengthens payment systems, supports financial inclusion, and preserves financial stability.</p>",
    category: "financialStability",
    subtopic: "cbdc",
    learningHubOnly: false,
    hubTeaser: "Although developed primarily for policymakers, the Note provides valuable information for anyone seeking to understand the relationship between retail CBDCs and financial stability.",
    // OPTIONAL — headline shown in the Further Insights box, if it should
    // differ from the "title" hook above. Delete this line to just reuse
    // "title" instead.
    hubTitle: "CBDC: Could the Biggest Impact Occur Behind the Scenes?",
    // EXAMPLE — this is what actually shows in the Learning Hub box, under
    // the bold "Preview:" label. Tease your original piece here; cite the
    // source paper inline if relevant (plain <a> tag works fine).
    hubPreview: "The public conversation around Central Bank Digital Currencies (CBDCs) has increasingly focused on their potential implications for consumers, particularly with respect to privacy, government surveillance, programmability, and the future role of cash. Central banks, meanwhile, have emphasised potential benefits including faster and more efficient payments, greater financial inclusion, and improved cross-border transactions.",
    kitFormUid: "29ff756091", // this is the form/sequence they'll actually get by signing up here
    gateLabel: "Enter your email and we will send you the full piece.",
    sourceUrl: "https://www.imf.org/-/media/files/publications/ftn063/2025/english/ftnea2025008.pdf",
    gatedExcerpt: "<p>Yet, beyond these considerations another important development is taking place behind the scenes. Central banks alongside other financial institutions are exploring how digital forms of central bank money could reshape the financial system, particularly, how money is transferred and financial transactions are settled.</p>"
  },

{
    id: "IMF-tokenizedfinance-Note-2026-03",
    date: "July 2026",
    dateSort: "2026-07",
    title: "Tokenised Finance: Potentially Transformative But Can It Really Deliver?",
    summary: "<p>Turning assets like deposits and securities into digital tokens promises faster, cheaper transactions, but whether tokenisation actually delivers on that promise depends on how well the new risks it introduces are managed. An IMF Note \"<em>Tokenized Finance</em>\" examines what policymakers need to consider for tokenisation to deliver greater efficiency without introducing risks that could undermine financial stability.</p><p>The policy choices made along the way, not just the technology itself, are what will determine whether tokenised deposits, securities, and smart contracts end up making finance more efficient or simply more complex.</p>",
    category: "financialStability",
    subtopic: "digitalAssets",
    learningHubOnly: false,
    hubTeaser: "Explore the IMF's latest analysis to see why the future of finance depends as much on policy and trust as it does on technology.",
    // OPTIONAL — headline shown in the Further Insights box, if it should
    // differ from the "title" hook above. Delete this line to just reuse
    // "title" instead.
    hubTitle: "Beyond the Hype: Can Tokenisation Transform Cross-Border Finance?",
    // EXAMPLE — this is what actually shows in the Learning Hub box, under
    // the bold "Preview:" label. Tease your original piece here; cite the
    // source paper inline if relevant (plain <a> tag works fine).
    hubPreview: "Cross-border payments remain slower, more expensive, and more complex than many businesses would like. Tokenisation has the potential to make international transactions faster and more efficient, but it must overcome legal, regulatory, and operational barriers before those benefits can be realised. This insight explores where tokenisation could make a real difference, and where expectations may be ahead of reality.",
    kitFormUid: "29ff756091", // this is the form/sequence they'll actually get by signing up here
    gateLabel: "Enter your email and we'll send you the full piece.",
    sourceUrl: "https://www.imf.org/-/media/files/publications/ftn063/2025/english/ftnea2025008.pdf"
  }



];

// Category display labels — used by the insights.html filter pills
const INSIGHT_CATEGORY_LABELS = {
  financialStability: "Financial Stability",
  macroprudential: "Macroprudential Policy",
  panelData: "Panel Data Methods",
  dataDecisions: "Data-Driven Decision Making"
};
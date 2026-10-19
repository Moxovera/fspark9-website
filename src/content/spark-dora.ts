import { dominoBackupNames, dominoInstitutions, dominoProviders } from "@/content/dora-domino";
import type { DominoContent, Locale, SparkDoraReport } from "@/types/content";

/**
 * Spark sektör raporları Nº 02 · DORA (layout "dora"). TR metin kelimesi
 * kelimesine Spark/sector reports/Spark Sektör Raporu DORA.md'den; başlık,
 * alt başlık ve arayüz metinleri Claude Code görevinden. EN çeviri ayrı
 * dil olarak burada. "**", "*" ve "[metin](service:slug)" işaretleri
 * DoraInline'da kalın, italik ve hizmet linki olur.
 * Site bunu Sanity'den okuyor (sparkEpisode.reportBody); bu dosya
 * seed-v3'ün kaynağı ve check:drift'in aynası.
 */

function domino(locale: Locale, rest: Omit<DominoContent, "providers" | "institutions" | "backupNames">): DominoContent {
  return {
    providers: dominoProviders.map((p) => ({ id: p.id, name: p.name[locale] })),
    institutions: dominoInstitutions.map((i) => ({ ...i, name: i.name[locale], type: i.type[locale] })),
    backupNames: { proc2: dominoBackupNames.proc2[locale], dc2: dominoBackupNames.dc2[locale] },
    ...rest,
  };
}

export const dora: Record<Locale, SparkDoraReport> = {
  en: {
    number: 2,
    subject: "DORA: EU Bank Resilience",
    hook: "When the cloud goes down, who answers?",
    seo: {
      title: "When the cloud goes down, who answers? | fspark9",
      description:
        "DORA's first two years: who paid how much, what it fixed and the market that grew behind it. With a domino simulation and one customer's story.",
    },
    nav: [
      { id: "nedir", label: "What it is" },
      { id: "kapsam", label: "Who it covers" },
      { id: "sutunlar", label: "Five pillars" },
      { id: "domino", label: "Domino" },
      { id: "karne", label: "Scorecard" },
      { id: "zorluklar", label: "Challenges" },
      { id: "cozdukleri", label: "What it fixed" },
      { id: "elif", label: "Elif" },
      { id: "pazar", label: "Market" },
      { id: "sonuclar", label: "Outlook" },
      { id: "ingiltere", label: "UK" },
      { id: "turkiye", label: "Türkiye" },
      { id: "sen-olsan", label: "Your call" },
      { id: "takvim", label: "Calendar" },
      { id: "not", label: "fspark9 note" },
      { id: "kaynaklar", label: "Sources" },
    ],
    hero: {
      meta: ["Spark", "02 Sector reports", "October 2026", "18 min read"],
      bigNo: "02",
      titleLead: "When the cloud goes down,",
      titleCut: "who answers?",
      sub: "DORA's first two years. The rule that turned Europe's \"what if your systems fail?\" question into law: who paid how much, what it fixed, and the market that grew behind it.",
      glance: {
        heading: "DORA in 60 seconds",
        items: [
          "The European Union's digital resilience law for the financial sector. Its official name is Regulation (EU) 2022/2554.",
          "It has applied directly since 17 January 2025. Member states don't need to pass their own laws.",
          "It covers 20 different types of financial firm: banks, payment institutions, e-money firms, insurers, investment firms, crypto asset service providers and more.",
          "The real novelty: a bank's technology suppliers are now inside the supervisory net too. 19 giants such as AWS, Microsoft, Google Cloud and SAP sit directly under European supervisors.",
          "The first year's scorecard: 3,383 major ICT incidents were reported in 2025. Roughly one in three started on the supplier's side.",
          "The hardest part for banks wasn't technical. It was the inventory: which supplier, which service, which subcontractor, which contract clause.",
          "That pain created its own market: supplier risk software, incident reporting tools, register automation, attack simulation services.",
        ],
      },
    },
    origin: {
      id: "nedir",
      head: { index: "01", label: "What it is", title: "What is DORA, and where did it come from?" },
      blocks: [
        {
          type: "p",
          text: "DORA is the European law that makes a bank write down, in advance, what it will do when its systems go down. The name stands for Digital Operational Resilience Act.",
        },
        {
          type: "p",
          text: "Before DORA, the picture was scattered. Every country had its own rules: BAIT in Germany, other circulars elsewhere, and EBA outsourcing guidelines on top. ICT risk sat as a sub-item under the general operational risk heading. Meanwhile banks had long since come to depend on a handful of big cloud and software companies. One of them stumbling could stop hundreds of firms at once.",
        },
        {
          type: "p",
          text: "The EU's answer was a single rulebook. It has two goals: manage ICT risk in the same language from country to country, and bring the tech giants behind the banks under direct supervision for the first time.",
        },
      ],
      timeline: {
        heading: "Timeline",
        events: [
          { date: "September 2020", text: "The European Commission proposed DORA as part of its Digital Finance Package" },
          { date: "December 2022", text: "The law was adopted and published in the EU Official Journal" },
          { date: "16 January 2023", text: "It entered into force and a two year preparation period began" },
          { date: "2024", text: "The technical standards that fill in the details were published one by one" },
          { date: "17 January 2025", text: "Application began. No transition period" },
          { date: "February and April 2025", text: "The TARGET payment system outage and the Iberian Peninsula blackout became the first big tests" },
          { date: "April 2025", text: "Banks submitted their supplier registers (Register of Information) for the first time" },
          { date: "18 November 2025", text: "European supervisors named 19 critical technology providers" },
          { date: "19 November 2025", text: "The Commission published its Digital Omnibus proposal, aimed at simplifying reporting" },
          { date: "March 2026", text: "Second annual submission of the register" },
          { date: "3 June 2026", text: "The first annual report on major ICT incidents under DORA came out" },
          { date: "December 2026", text: "BAIT is fully withdrawn for banks in Germany, leaving the field to DORA" },
          { date: "17 January 2028", text: "End of the first attack simulation (TLPT) cycle for selected firms and the law's first major review" },
        ],
        today: { date: "October 2026", label: "Today", after: 10 },
      },
    },
    scope: {
      id: "kapsam",
      head: { index: "02", label: "Who it covers", title: "Who does it apply to?" },
      blocks: [
        {
          type: "p",
          text: "Short answer: almost everyone working under a licence in the EU, and everyone who sells them technology. The Commission's impact assessment puts more than 20,000 firms in scope.",
        },
        { type: "h", text: "Directly in scope (20 types of firm)" },
        {
          type: "ul",
          items: [
            "Banks and credit institutions",
            "Payment institutions and electronic money institutions",
            "Investment firms, asset managers, exchanges, clearing houses",
            "Insurance and reinsurance companies, insurance intermediaries",
            "Crypto asset service providers",
            "Crowdfunding platforms, credit rating agencies, pension funds",
          ],
        },
        {
          type: "p",
          text: "Being small doesn't get you out. A payment institution licensed under PSD2 is inside DORA even with a team of five. The only difference is how deep it goes: smaller firms get a lighter framework, and the heaviest tests fall only on large, systemic ones.",
        },
        { type: "h", text: "Pulled in indirectly" },
        { type: "p", text: "This is where the real surprise is. DORA brings technology companies inside in two ways:" },
        {
          type: "ol",
          items: [
            "**Through the contract.** Every software, cloud or data provider that delivers a critical service to a bank runs into the DORA clauses the bank is obliged to get signed: audit rights, incident reporting, an exit plan, subcontractor transparency. It makes no difference whether the company sits in Istanbul, Bangalore or California.",
            "**Through direct oversight.** Providers of systemic importance are designated \"critical\" (CTPP) and come under the direct watch of European supervisors. The first list has 19 names.",
          ],
        },
        {
          type: "p",
          text: "**Who's left out?** A fintech standing behind a bank in a BaaS model isn't directly subject to DORA if it has no licence of its own. But as the bank's supplier it has to carry every DORA clause in the contract. So in practice it's inside too.",
        },
      ],
    },
    pillars: {
      id: "sutunlar",
      head: { index: "03", label: "Five pillars", title: "Five pillars: what exactly does DORA ask for?" },
      blocks: [
        {
          type: "p",
          text: "DORA wants answers to five questions. What they all share is that the answer has to live in a working process, not on paper.",
        },
        {
          type: "table",
          head: ["Pillar", "The question it asks", "What it means inside a bank"],
          rows: [
            [
              "ICT risk management",
              "Do you know your risk, and who owns it?",
              "The board is directly responsible for ICT risk. An asset inventory, a risk framework, backup and recovery plans must be written down and tested",
            ],
            [
              "Incident management and reporting",
              "When something breaks, how fast do you tell people?",
              "Once a major incident is classified, the first notification goes in within 4 hours (no later than 24 hours after it was detected), an intermediate report at 72 hours, a final report within a month",
            ],
            [
              "Resilience testing",
              "Does it actually work, and have you tried it?",
              "Annual tests for everyone. For selected large firms, TLPT every three years on live systems, with teams that act like real attackers",
            ],
            [
              "Third party risk",
              "Who do you depend on, and what happens if they go?",
              "A record of every technology contract (Register of Information), mandatory contract clauses, an exit plan for critical services",
            ],
            [
              "Information sharing",
              "Do you share the threats you see with others?",
              "Sharing cyber threat intelligence within the sector. Not mandatory, but encouraged",
            ],
          ],
        },
        {
          type: "p",
          text: "**The detail people miss:** The fourth pillar looked like the quietest one, but it created the most work. A bank's technology contracts number in the hundreds, and behind each of them sit more subcontractors.",
        },
      ],
    },
    domino: {
      id: "domino",
      head: { index: "04", label: "Domino", title: "Domino: pull the plug on a provider" },
      blocks: [
        {
          type: "p",
          text: "When a single technology provider goes down, how many firms, how many countries, how many services go dark? Don't read about it, try it.",
        },
      ],
      note: "The simulation is illustrative. The firms and providers are fictional; the dependency structure is inspired by the table in the ESAs' 2025 incident report.",
      after: [
        {
          type: "p",
          text: "**What the simulation tells you:** DORA doesn't prevent the outage. It changes how many people it touches, for how long, and how much they're left in the dark.",
        },
        {
          type: "p",
          text: "**From real life:** About 29% of the major ICT incidents reported in Europe in 2025 started at a provider, and a third spilled across borders. The TARGET outage in February 2025 and the Iberian Peninsula blackout in April 2025 showed that a failure at a single point can trigger reports from dozens of firms.",
        },
      ],
      sim: domino("en", {
        countries: { DE: "Germany", NL: "Netherlands", FR: "France", ES: "Spain" },
        services: { app: "App", card: "Card", transfer: "Transfer" },
        labels: {
          stage: "Domino simulation",
          choose: "Pick a provider",
          pull: "Pull the plug",
          replay: "Replay the same outage in DORA mode",
          reset: "Reset",
          down: "down",
          backup: "backup",
          informed: "informed",
          dependsOn: "Runs on",
          hint: "Pick a provider, then pull the plug.",
          counters: {
            institutions: "Firms affected",
            countries: "Countries affected",
            services: "Services in the dark",
            notice: "First word to customers",
          },
          noticeNormal: "48 hours",
          noticeDora: "within 4 hours",
          noticeNote: "Illustrative. Under DORA, the first notification goes in within 4 hours of an incident being classified as major.",
          resultNormal: "{institutions} institutions, {countries} countries, {services} services in the dark. Customers hear about it 48 hours later.",
          resultDora: "{services} services still went down, {rerouted} switched to a backup. No customer was left in the dark.",
          sharedRail: "The shared rail has no backup. Here DORA doesn't shrink the outage, but it doesn't leave anyone in the dark.",
          modeNormal: "Before DORA",
          modeDora: "DORA mode",
        },
      }),
    },
    scorecard: {
      id: "karne",
      head: { index: "05", label: "Scorecard", title: "The first two years in numbers" },
      blocks: [
        {
          type: "p",
          text: "The most striking finding: most of the major incidents reported in 2025 came not from hackers but from ordinary system failures and outside events.",
        },
        {
          type: "table",
          figures: true,
          head: ["Figure", "What it tells you", "Source"],
          rows: [
            ["3,383", "Major ICT incidents reported in the EU financial sector in 2025. An average of 0.18 per firm", "ESAs annual incident report, June 2026"],
            ["~29%", "Share of incidents that started at a third party provider", "ESAs annual incident report"],
            ["1/3", "Share of incidents with cross-border impact. Shared infrastructure creates a domino effect", "ESAs annual incident report"],
            ["~15%", "Share of incidents left out of the statistics because the final report didn't arrive on time", "ESAs annual incident report"],
            ["19", "Critical technology providers placed under the direct oversight of European supervisors", "ESAs, November 2025"],
            ["40%", "Share of firms in Luxembourg that had submitted their register two weeks before the deadline (16 March 2026)", "CSSF"],
            ["43%", "Share of firms saying they spent more than 1 million euros over two years on DORA and similar compliance", "Rubrik Zero Labs survey"],
            ["70%", "Share of firms that think DORA will permanently raise their technology running costs", "McKinsey survey"],
            ["37%", "Share of firms saying their technology suppliers raised prices after DORA", "Veeam survey, 2025"],
          ],
        },
        {
          type: "p",
          text: "**Two big tests:** The TARGET payment system outage in February 2025 and the Iberian Peninsula blackout in April 2025 each triggered a large number of notifications on their own. One failure means separate reports from dozens of firms. These two events explain better than anything why DORA is so focused on shared infrastructure.",
        },
        {
          type: "p",
          text: "**The good news:** According to the report, the impact on customers and transactions stayed limited in most incidents. Detection and recovery usually worked fast.",
        },
        {
          type: "note",
          text: "Note: The survey figures come from different samples, and some measure DORA together with UK rules. They show the direction, not a precise measure of the market.",
        },
      ],
    },
    challenges: {
      id: "zorluklar",
      head: { index: "06", label: "Challenges", title: "What it put on banks' plates" },
      blocks: [
        {
          type: "p",
          text: "The biggest challenge wasn't technology. It was information. Banks had never written down their own technology dependencies in this much detail.",
        },
        {
          type: "ol",
          items: [
            "**The never ending spreadsheet.** The Register of Information isn't a single list. It's a data model made of linked tables. Dozens of fields for every contract, an identifier for every supplier, and for every service, which function it supports and who it's been subcontracted to. If the file sent to the supervisor has errors, it comes back, gets fixed and is sent again. Even in 2026 that loop hasn't ended.",
            "**The contract table.** Hundreds of contracts needed mandatory clauses added: audit rights, incident reporting, exit plans. A small bank can't negotiate with a big cloud provider, so it signs the standard addendum. Delays in the subcontracting rules also left negotiations hanging for months.",
            "**Clock pressure.** Deciding within hours whether an incident is \"major\" and filing the first notification within 4 hours means a new on-call setup at most banks. On top of that, a single shared infrastructure failure demands a separate report from every firm.",
            "**The talent gap.** The red teams and threat intelligence that TLPT needs are scarce. Team leads are expected to have at least 5 years of penetration testing experience. In Europe, people with that profile are few and far between.",
            "**Cost and fatigue.** Almost half of the firms surveyed went past one million euros in two years. Pressure on IT and security teams grew, and suppliers passed the cost of DORA compliance on in their prices.",
            "**A pile of rules.** DORA didn't come alone. NIS2, GDPR, the Cyber Resilience Act and the AI Act touch the same systems from other angles. AFME, the association for Europe's capital markets, complains in particular that DORA and the Cyber Resilience Act put double rules on the same banking applications.",
            "**The burden on the small.** There is a proportionality principle, but the register, incident reporting and contract clauses are the same for a small payment institution. For a fintech with no compliance team, that's a serious fixed cost.",
            "**Slower product speed.** *(Our observation)* Adding a new partner or SaaS tool is no longer just a technical integration. First comes DORA due diligence, then contract addenda, then a register update. At a bank, that adds a few weeks, sometimes months, to the time it takes a new product to go live.",
          ],
        },
      ],
    },
    solved: {
      id: "cozdukleri",
      head: { index: "07", label: "What it fixed", title: "What did it fix?" },
      blocks: [
        {
          type: "p",
          text: "DORA's real achievement is drawing the first technology map of Europe's financial system. Without that map, nobody could talk about concentration risk or hold the giants to account.",
        },
        {
          type: "ul",
          items: [
            "**27 countries, one language.** A single regulation replaced the national rules. A group operating in more than one EU country no longer follows a separate ICT guide for each. In Germany, BAIT is fully withdrawn for banks at the end of 2026.",
            "**Hidden dependency became visible.** The registers banks submitted became the main data European supervisors used to pick the 19 critical providers. So the spreadsheet banks struggled with turned into the ruler for measuring systemic risk.",
            "**Balance at the table with the giants.** A small bank can't audit AWS or Microsoft on its own. Now European supervisors do it. A critical provider that breaks the rules can be fined up to 1% of its average daily worldwide turnover, for up to six months.",
            "**Shared incident data.** For the first time, Europe collected major ICT incidents in the financial sector under one definition and in one format. The first report, with 3,383 incidents, is the starting line for every debate from here on.",
            "**The topic moved up to the board.** ICT risk is no longer the IT manager's problem but something the board is responsible for, with its signature on it. In McKinsey's survey, the large majority of firms say they put DORA on the board's agenda.",
            "**People started asking \"what if they leave?\"** The mandatory exit plan for critical services brought supplier dependency, unspoken for years, to the table.",
            "**A shared language in contracts.** *(Our take)* Because every bank asked for the same clauses, suppliers prepared standard DORA addenda. The first year was painful, but over time a template emerged that could speed up new partnerships.",
          ],
        },
      ],
    },
    story: {
      id: "elif",
      head: { index: "08", label: "Elif", title: "A customer's story: Elif's three outages" },
      intro: "An illustrative story. The character is fictional; the events and rules behind it are real.",
      lead: "Elif runs a small online shop in Cologne selling handmade ceramics. Her account is with a mid-sized digital bank, and she takes payments through a payment institution. She has never heard of DORA. But in the last three years she has run into it three times.",
      scenes: [
        {
          title: "November 2023. A silent outage.",
          body: "Friday evening, customer payments aren't landing in her account. The app shows a single line: \"We're experiencing a technical issue.\" The call centre doesn't know when it will be fixed. On Monday everything fixes itself. Over the weekend Elif cancels three orders, because she doesn't want to ship before she sees the money. Nobody tells her what happened.",
        },
        {
          title: "February 2025. Same kind of outage, a different attitude.",
          body: "Europe's TARGET payment system stalls for hours. Elif's outgoing transfer is delayed. This time the difference is this: within a few hours an information box appears in the app, followed by an email. The problem isn't at the bank but in the shared infrastructure, the payments are queued, the estimated time is such and such. DORA gave firms a duty to inform customers about major incidents that affect their money. Elif doesn't know that, but she feels the difference: instead of panicking, she plans.",
        },
        {
          title: "Spring 2026. A delayed feature.",
          body: "Her bank had announced invoice payment and collection for small businesses as \"coming soon\". The launch slips by two months. Elif is annoyed. What's happening in the background *(our estimate)*: the new invoicing infrastructure provider the bank picked will support a critical function, so it's going through DORA due diligence, audit and exit clauses are being added to the contract, the register is being updated. All Elif gets is a delay. But the same process means that if that provider ever goes under, the bank can still process her money another way.",
        },
      ],
      summary: "**The story in short:** Customers don't see DORA directly. What they see is two things: faster, more honest news when something breaks, and a slightly longer wait for new features. A good bank is one that can balance the two.",
      phone: {
        account: "My account",
        sceneLabel: "Screen",
        s1: {
          balanceLabel: "Balance",
          balance: "1.240,50 €",
          banner: "We're experiencing a technical issue.",
          pendingHeading: "Pending payments",
          pendingLabel: "Pending",
          rows: [
            { label: "Incoming payment", amount: "48,00 €" },
            { label: "Incoming payment", amount: "112,50 €" },
            { label: "Incoming payment", amount: "36,90 €" },
          ],
          support: "Customer service · Wait time: 34 min",
        },
        s2: {
          pushApp: "My account",
          push: "Your outgoing transfers may be delayed",
          info: "There's an outage on Europe's shared payment system (TARGET). The problem isn't on our side. Your transfers are queued and safe. Next update: 16:00",
          rowLabel: "Outgoing transfer",
          rowAmount: "320,00 €",
          queuedLabel: "Queued",
          time: "13:12",
        },
        s3: {
          title: "Invoice collection",
          before: "Coming soon",
          after: "Postponed: June",
          note: "We're finishing the security and continuity checks on our new infrastructure provider.",
        },
      },
    },
    market: {
      id: "pazar",
      head: { index: "09", label: "Market", title: "The market DORA opened" },
      blocks: [
        {
          type: "p",
          text: "Yes, products built specifically for DORA appeared, and a category was born. Every pillar banks struggled with now has a piece of software or a service sitting across from it.",
        },
        {
          type: "table",
          head: ["Category", "What it solves", "Example players"],
          rows: [
            ["Register automation", "Collects supplier data and produces a validated file in the format the supervisor wants", "Formalize, OneTrust, Panorays, Prevalent"],
            ["Third party risk management (TPRM)", "Monitors suppliers continuously, keeps questionnaires and scores, shows concentration risk", "BitSight, UpGuard, Panorays, Riskonnect"],
            ["Compliance automation (GRC)", "Brings the five pillars together in one dashboard, produces evidence and an audit trail", "Vanta, OneTrust, LogicGate, SureCloud, CyberArrow"],
            ["Incident classification and reporting", "Classifies the incident against DORA criteria, runs the 4 hour, 72 hour and one month clocks", "DORA modules of GRC platforms"],
            ["TLPT and threat intelligence", "Red team testing on live systems with real attacker scenarios", "Red team firms, intelligence platforms such as Filigran"],
            ["Data resilience", "Backup, recovery and recovery from ransomware", "Veeam, Rubrik"],
            ["Cloud provider packages", "Ready made DORA mappings and contract addenda from the cloud giants for banks", "Microsoft and the other cloud giants"],
            ["Consulting and legal", "Gap analysis, register submission, contract addendum templates", "The Big Four, law firms"],
          ],
        },
        {
          type: "p",
          text: "**How big the market is.** There's no market measure specific to DORA, but for the closest category, third party risk management, research firms put the size at between $7.7 and $10.8 billion in 2025, with 14-16% annual growth. Nearly all of them count DORA as the main growth engine in Europe. The numbers vary a lot from firm to firm; the direction is the same.",
        },
        {
          type: "p",
          text: "**Price range.** Platforms for large firms quote on request. Tools aimed at mid-sized firms show plans starting at around 900 euros a month.",
        },
        { type: "h", text: "Three layers of the market" },
        {
          type: "ol",
          items: [
            "**Software:** register, TPRM, GRC. The fastest growing layer. In 2024 most of these were general compliance tools; in 2026 there are new players positioning themselves as \"built for DORA\".",
            "**Services:** consulting, legal, red teaming, threat intelligence. TLPT's 2028 timetable will keep this layer busy for the next two years.",
            "**The supplier side:** For every SaaS company selling to banks, \"we're DORA ready\" is now a sales argument. A supplier that can't offer a ready contract addendum, an audit package and exit plan support is more and more often knocked out before the tender (our observation).",
          ],
        },
        {
          type: "p",
          text: "**Watch out:** Buying a tool doesn't solve the problem. The shared view in the industry is that the pain in the register comes not from the tool but from how messy the underlying data is.",
        },
      ],
    },
    outcomes: {
      id: "sonuclar",
      head: { index: "10", label: "Outlook", title: "What will change in the years ahead?" },
      blocks: [
        {
          type: "p",
          text: "DORA's first two years went on preparation; with 2026 the supervision phase began. From here its effect will move out of compliance teams and into business models.",
        },
        {
          type: "ol",
          items: [
            "**From guidance to enforcement.** National supervisors went into the field in 2026 and are automatically cross-checking register data. The ceiling on fines varies by country, for example up to 5 million euros in Germany. The first public fines will be a test for those who say \"DORA stays on paper\".",
            "**Fewer but stronger suppliers.** *(Our estimate)* Every new supplier means new rows in the register, new contract addenda and new monitoring. Banks will move to cut their supplier count and work with large players that are DORA ready.",
            "**The concentration paradox.** *(Our take)* DORA came out to reduce concentration risk on a handful of giants. But the ones that find compliance easiest are those same giants with ready made packages. The rule may, without meaning to, push risk towards the very place it's trying to reduce it. How supervisors balance this is an open question.",
            "**The maths changes for small fintechs.** The fixed cost of running on your own licence went up. Going through a bank or a licensed platform (BaaS, embedded finance) may make sense for more companies. On the other hand, banks will also put DORA maturity first when they choose partners.",
            "**Simpler reporting.** The Commission's Digital Omnibus proposal would gather incident reports under NIS2, GDPR and DORA into a single entry point run by ENISA: report once, and it goes to everyone who needs it. If the proposal becomes law, the channel is planned to open in about 18 months.",
            "**The big review in 2028.** The Commission will assess DORA from scratch by 17 January 2028. Proportionality is in focus: is the burden on small firms in proportion to their systemic importance?",
            "**AI is entering the register.** The AI services banks use are ICT services too. Model providers will show up in registers, in contract addenda and maybe one day on the critical provider list. The UK is facing open political pressure in this direction.",
          ],
        },
      ],
    },
    uk: {
      id: "ingiltere",
      head: { index: "11", label: "UK", title: "The UK: same film, different cinema" },
      blocks: [
        {
          type: "p",
          text: "The UK isn't in the EU, but it's giving its own answer to the same question. The Critical Third Parties (CTP) regime is the British version of DORA's critical provider leg.",
        },
        {
          type: "table",
          head: ["", "EU (DORA)", "UK (CTP regime)"],
          rows: [
            ["Legal basis", "Regulation (EU) 2022/2554", "Financial Services and Markets Act 2023"],
            ["When the rules started", "17 January 2025", "1 January 2025"],
            ["First critical provider list", "18 November 2025, 19 companies", "10 July 2026, 4 companies (in effect from 13 July)"],
            ["Who's on the list", "Cloud, data centre, telecoms, IT services and financial data providers", "AWS, Google Cloud, Microsoft, Oracle"],
            ["Who supervises", "EBA, ESMA, EIOPA", "FCA, PRA and the Bank of England"],
            ["Firms' supplier records", "Submitted every year", "Annual submission of material supplier records starts on 18 March 2027"],
          ],
        },
        {
          type: "p",
          text: "**Where's the difference?** The EU cast a wide net; the UK caught only the four biggest fish and says openly that it wants to stick to a \"small number\" of providers. But it's clear the list will grow. Parliament's Treasury Committee wants AI providers brought into the regime too.",
        },
        {
          type: "p",
          text: "**For those working in both markets:** A group licensed in London and Frankfurt will manage two separate records and two separate sets of supervisory expectations for the same supplier. Different format, same logic.",
        },
      ],
    },
    turkey: {
      id: "turkiye",
      head: { index: "12", label: "Türkiye", title: "The Türkiye bridge" },
      blocks: [
        {
          type: "p",
          text: "DORA isn't a Turkish law, but every financial bridge from Türkiye to Europe runs over it. It's felt directly in three places.",
        },
        {
          type: "p",
          text: "**1. Turkish-owned banks and payment institutions in Europe.** Any firm licensed in Germany, the Netherlands or another EU country is directly in scope. The point people miss here is intragroup services. DORA's contract rules apply not only to outside suppliers but also to arrangements within the group. The core banking system, data centre or software provided by the parent bank or a group company in Istanbul goes into the register, and the contract gets audit rights and an exit plan. \"Our parent company is already ours\" isn't enough under DORA.",
        },
        {
          type: "p",
          text: "**2. Turkish technology companies selling into the EU.** A Turkish firm providing software, cloud or data services to a European bank runs into the DORA clauses its customer gets signed: incident reporting, being open to audit, subcontractor transparency, exit support. A firm that can offer this as a ready package starts European tenders a step ahead.",
        },
        {
          type: "p",
          text: "**3. Turkish fintechs that want to expand into Europe.** Getting a licence in Romania, Lithuania or Germany means living with DORA from day one. The register, the incident process and the test plan have become a natural part of the licence application. Going in through a partner bank doesn't remove the responsibility; it moves it into the contract.",
        },
        {
          type: "p",
          text: "**Compared with the rules in Türkiye.** There are serious parallels between BDDK's Regulation on Information Systems and Electronic Banking Services and DORA on risk management, business continuity and outsourcing. Two important differences stand out: Türkiye has a strong approach of keeping critical data and systems inside the country, which limits cloud use. DORA, on the other hand, isn't against the cloud; it wants dependency on the cloud to be managed, and it supervises the tech giants directly.",
        },
        {
          type: "p",
          text: "**Both ends of the bridge:** For a group that complies with BDDK in Türkiye and with BaFin and DORA in Germany at the same time, keeping a single supplier inventory is much cheaper than running two separate compliance projects. *(Our suggestion)*",
        },
      ],
    },
    desks: {
      id: "sen-olsan",
      head: { index: "13", label: "Your call", title: "What would you do?" },
      blocks: [{ type: "p", text: "Two desks, two decisions. Make your pick, then see our take." }],
      items: [
        {
          title: "Desk 1: The fast partner or the ready partner?",
          scenario: "You're head of product at a digital bank. You want to ship an invoice collection feature for SMEs in three months. There are two candidates.",
          options: [
            { key: "A", text: "A 40-person startup with a great interface. It has never seen a DORA addendum and objects to the audit rights clause" },
            { key: "B", text: "A big, established provider with an ordinary interface. It has a ready DORA package, but integration takes two months longer" },
            { key: "C", text: "I go with the startup, but we prepare the DORA clauses together first and start the launch as a limited pilot" },
          ],
          take: "**Our take:** The right answer usually depends not on the launch date but on whether this feature counts as a \"critical or important function\". If it does, audit rights aren't up for negotiation. Is the startup ready to accept that, or will you find out in the first negotiation?",
        },
        {
          title: "Desk 2: Where should the infrastructure sit when you expand into Europe?",
          scenario: "You're a payments company that grew up in Türkiye, and you want a licence in Romania. All your infrastructure is in Istanbul.",
          options: [
            { key: "A", text: "I move the infrastructure entirely to the EU" },
            { key: "B", text: "I provide it from Istanbul as an intragroup service and document it with a DORA contract and an exit plan" },
            { key: "C", text: "I start out through a partner licensed in the EU and get my own licence later" },
          ],
          take: "**Our take:** All three paths are possible, and their cost and speed differ a lot. The supervisor may accept an intragroup service, but it will expect a written, tested answer to the question \"if the system in Istanbul becomes unreachable one day, what happens to the Romanian customer's money?\" Can you give that answer today?",
        },
      ],
    },
    calendar: {
      id: "takvim",
      head: { index: "14", label: "Calendar", title: "What's next on the calendar?" },
      blocks: [
        {
          type: "p",
          text: "The DORA calendar is busy over the next 15 months. The most important date is January 2028, when the first attack simulation cycle for large firms closes.",
        },
        {
          type: "table",
          head: ["When", "What happens"],
          rows: [
            ["November 2026 (expected)", "First annual update of the critical provider list. The list is renewed every year"],
            ["December 2026", "BAIT is fully withdrawn for banks in Germany"],
            ["March 2027", "Third annual submission of the Register of Information (with data as of 31 December 2026)"],
            ["18 March 2027", "In the UK, firms start submitting their material supplier records every year"],
            ["2027 (if the proposal becomes law)", "The single incident reporting point goes live through the Digital Omnibus"],
            ["17 January 2028", "End of the first TLPT cycle for selected firms and the Commission's DORA review"],
          ],
        },
      ],
    },
    note: {
      id: "not",
      head: { index: "15", label: "fspark9 note", title: "fspark9 note" },
      blocks: [
        {
          type: "p",
          text: "At most banks DORA started as a compliance project and stayed on the compliance team's desk. We think its real effect will be felt at the product desk. Because now every new feature, every new partner, every new market starts with a DORA question.",
        },
        { type: "p", text: "It's easy to judge from the outside. So instead of a verdict, we'll leave a few questions:" },
        {
          type: "ul",
          items: [
            "When you look at your register, do you see only a list of suppliers, or also where your product roadmap is going to get stuck?",
            "When you pick a new partner, do you talk about the DORA clauses in the first meeting, or find out about them at the contract table?",
            "Does your next feature count as a \"critical or important function\"? Who decides that, and when?",
            "Would your exit plan for services you get from within the group actually work, or does it only exist on paper?",
            "Does choosing among DORA ready partners mean giving up the experience your customers want? It shouldn't.",
          ],
        },
        {
          type: "p",
          text: "As people who built two banks from scratch and took products live in both Germany and Türkiye, here's what we've seen: however heavy the rule, the team that builds it into the design from day one ends up moving fastest. It's possible to treat DORA not as a checklist bolted on later, but as the first step in choosing partners and shaping the product flow.",
        },
        {
          type: "p",
          text: "If choosing the right partner for a new digital product, or setting up a launch flow that works with DORA, is on your desk, [New Product Line](service:product-strategy) and [The Right Bank Partner](service:embedded-finance) exist for exactly that.",
        },
      ],
    },
    close: {
      text: "Want to ship your next product without getting stuck on DORA?",
      bookLabel: "Book a call",
    },
    sources: {
      head: { index: "", label: "Sources", title: "Where every figure comes from." },
      groups: [
        {
          heading: "Official sources",
          items: [
            { label: "ESAs: designation of critical ICT third party providers, November 2025", href: "https://www.eba.europa.eu/publications-and-media/press-releases/european-supervisory-authorities-designate-critical-ict-third-party-providers-under-digital" },
            { label: "ESAs: list of the 19 critical providers (PDF)", href: "https://www.esma.europa.eu/sites/default/files/2025-11/List_of_designated_CTPPs.pdf" },
            { label: "ESAs: 2025 report on major ICT-related incidents (PDF)", href: "https://www.esma.europa.eu/sites/default/files/2026-06/JC_2026_16_ESAs_2025_report_on_major_ICT-related_incidents.pdf" },
            { label: "CSSF: DORA scope and the 20 types of firm", href: "https://cssf.lu/en/digital-operational-resilience-act-dora" },
            { label: "CSSF: register submission update, March 2026", href: "https://www.cssf.lu/en/2026/03/dora-register-of-information-collection/" },
            { label: "Central Bank of Ireland: register submission 2026", href: "https://edit.centralbank.ie/regulation/digital-operational-resilience-act-dora/reporting-registers-of-information" },
            { label: "GOV.UK: the UK's first four critical third parties, July 2026", href: "https://www.gov.uk/government/news/uk-financial-system-strengthened-with-new-safeguards-for-major-technology-providers" },
          ],
        },
        {
          heading: "Analysis and news",
          items: [
            { label: "Paperjam: the details of the 3,383 incidents", href: "https://en.paperjam.lu/article/dora-exposes-3-383-major-ict-incidents-across-eu-financial-sector" },
            { label: "Fundación Mapfre: summary of the ESAs incident report", href: "https://documentacion.fundacionmapfre.org/documentacion/publico/en/bib/192764.do" },
            { label: "Morgan Lewis: on the critical provider list", href: "https://www.morganlewis.com/ru/blogs/sourcingatmorganlewis/2025/11/dora-eu-regulators-announce-list-of-critical-ict-third-party-providers" },
            { label: "Morgan Lewis: DORA contract clauses", href: "https://morganlewis.com/blogs/sourcingatmorganlewis/2024/06/preparing-for-dora-mind-the-gap" },
            { label: "Simmons & Simmons: implementation and fines by country", href: "https://www.simmons-simmons.com/en/publications/cm60fpyud06qktr0k9h3ch8vg/dora-implementation-day-is-here" },
            { label: "McKinsey: DORA readiness survey", href: "https://www.mckinsey.de/capabilities/risk-and-resilience/our-insights/europes-new-resilience-regime-the-race-to-get-ready-for-dora" },
            { label: "Infosecurity Magazine: Rubrik cost survey", href: "https://www.infosecurity-magazine.com/news/dora-compliance-costs-soar/" },
            { label: "SecurityBrief: Veeam survey", href: "https://securitybrief.co.uk/story/financial-firms-in-emea-face-data-resilience-gaps-post-dora" },
            { label: "CMS: the Digital Omnibus and the single reporting point", href: "https://cms.law/en/gbr/legal-updates/the-eu-s-digital-omnibus-simplification-consolidation-and-a-sharper-edge-on-compliance" },
            { label: "AFME: the overlap between DORA and the Cyber Resilience Act", href: "https://www.afme.eu/news-insights/press-releases/afme-comments-on-eu-digital-omnibus-package-eu-risks-missing-opportunity-to-simplify-cyber-regulation/" },
            { label: "Lewis Silkin: UK CTP designations", href: "https://www.lewissilkin.com/insights/2026/07/15/uk-designates-first-technology-providers-under-the-critical-third-parties-regime-102nbxt" },
            { label: "Morrison Foerster: UK supplier record timetable", href: "https://www.mofo.com/resources/insights/260716-uk-announces-list-of-first-critical-third-parties" },
            { label: "Copla: TLPT requirements", href: "https://copla.com/blog/compliance-regulations/dora-threat-led-penetration-testing-tlpt-requirements/" },
            { label: "Legiscope: DORA software compared", href: "https://www.legiscope.com/blog/best-dora-compliance-software.html" },
            { label: "ComplyJet: DORA software review", href: "https://www.complyjet.com/blog/best-dora-compliance-software" },
            { label: "Fortune Business Insights: TPRM market size", href: "https://www.fortunebusinessinsights.com/third-party-risk-management-market-117395" },
            { label: "Akbank: what DORA means for Turkish companies", href: "https://www.akbank.com/blog/dijital-dayanikliligi-saglamanin-10-yolu" },
            { label: "Capital: BDDK, DORA and the cloud debate", href: "https://www.capital.com.tr/haberler/tum-haberler/finans-sektorunde-teknoloji-kullanimi-ve-beklentileri-hangi-yone-gidiyor" },
          ],
        },
      ],
      note: "Note: The customer story is an illustrative piece of fiction. Places marked \"our observation / estimate / take\" are fspark9's inferences, not sourced findings.",
    },
  },
  tr: {
    number: 2,
    subject: "DORA: AB Banka Dayanıklılığı",
    hook: "Bulut düşerse kim sorumlu?",
    seo: {
      title: "Bulut düşerse kim sorumlu? | fspark9",
      description:
        "DORA'nın ilk iki yılı: kime ne kadara patladı, neyi düzeltti ve arkasında nasıl bir pazar doğdu. Domino simülasyonu ve bir müşterinin hikayesiyle.",
    },
    nav: [
      { id: "nedir", label: "Nedir" },
      { id: "kapsam", label: "Kapsam" },
      { id: "sutunlar", label: "Beş sütun" },
      { id: "domino", label: "Domino" },
      { id: "karne", label: "Karne" },
      { id: "zorluklar", label: "Zorluklar" },
      { id: "cozdukleri", label: "Çözdükleri" },
      { id: "elif", label: "Elif" },
      { id: "pazar", label: "Pazar" },
      { id: "sonuclar", label: "Sonuçlar" },
      { id: "ingiltere", label: "İngiltere" },
      { id: "turkiye", label: "Türkiye" },
      { id: "sen-olsan", label: "Sen olsan" },
      { id: "takvim", label: "Takvim" },
      { id: "not", label: "fspark9 notu" },
      { id: "kaynaklar", label: "Kaynaklar" },
    ],
    hero: {
      meta: ["Spark", "02 Sektör raporları", "Ekim 2026", "18 dk okuma"],
      bigNo: "02",
      titleLead: "Bulut düşerse",
      titleCut: "kim sorumlu?",
      sub: "DORA'nın ilk iki yılı. Avrupa'nın bankalara \"sistemin çökerse ne yaparsın\" sorusunu yasa yaptığı düzenleme, kime ne kadara patladı, neyi düzeltti ve arkasında nasıl bir pazar doğdu.",
      glance: {
        heading: "60 saniyede DORA",
        items: [
          "Avrupa Birliği'nin finans sektörü için çıkardığı dijital dayanıklılık yasası. Resmi adı Regulation (EU) 2022/2554.",
          "17 Ocak 2025'ten beri doğrudan uygulanıyor. Ülkelerin ayrıca kanun çıkarmasına gerek yok.",
          "20 farklı türde finans kuruluşunu kapsıyor: bankalar, ödeme kuruluşları, e-para şirketleri, sigortacılar, yatırım firmaları, kripto varlık hizmet sağlayıcıları ve fazlası.",
          "Asıl yeniliği şu: bankanın teknoloji tedarikçileri de artık denetimin içinde. AWS, Microsoft, Google Cloud, SAP gibi 19 dev doğrudan Avrupa denetçilerinin gözetiminde.",
          "İlk yılın karnesi: 2025'te 3.383 büyük BT olayı bildirildi. Yaklaşık her üç olaydan biri tedarikçi tarafında başladı.",
          "Bankalar için en zor kısım teknik değil, envanter oldu: hangi tedarikçi, hangi hizmet, hangi alt yüklenici, hangi sözleşme maddesi.",
          "Bu zorluk kendi pazarını yarattı: tedarikçi risk yazılımları, olay bildirim araçları, kayıt (register) otomasyonu, saldırı simülasyonu hizmetleri.",
        ],
      },
    },
    origin: {
      id: "nedir",
      head: { index: "01", label: "Nedir", title: "DORA nedir, nereden çıktı?" },
      blocks: [
        {
          type: "p",
          text: "DORA, bir bankanın sistemi çöktüğünde ne yapacağını önceden yazılı hale getirmesini zorunlu kılan Avrupa yasası. Açılımı Digital Operational Resilience Act, Türkçesiyle Dijital Operasyonel Dayanıklılık Yasası.",
        },
        {
          type: "p",
          text: "DORA'dan önce tablo dağınıktı. Her ülkenin kendi kuralı vardı: Almanya'da BAIT, başka ülkelerde başka genelgeler, üstüne EBA'nın dış kaynak kullanımı rehberleri. BT riski, genel operasyonel risk başlığının altında bir alt madde gibi duruyordu. Oysa bankalar çoktan birkaç büyük bulut ve yazılım şirketine bağımlı hale gelmişti. Birinin aksaması, aynı anda yüzlerce kurumu durdurabilirdi.",
        },
        {
          type: "p",
          text: "AB'nin cevabı tek bir kural kitabı oldu. Hedef iki şey: BT riskini ülkeden ülkeye aynı dille yönetmek ve bankaların arkasındaki teknoloji devlerini ilk kez doğrudan denetim altına almak.",
        },
      ],
      timeline: {
        heading: "Zaman çizelgesi",
        events: [
          { date: "Eylül 2020", text: "Avrupa Komisyonu DORA'yı Dijital Finans Paketi'nin parçası olarak önerdi" },
          { date: "Aralık 2022", text: "Yasa kabul edildi ve AB Resmi Gazetesi'nde yayımlandı" },
          { date: "16 Ocak 2023", text: "Yürürlüğe girdi, iki yıllık hazırlık süresi başladı" },
          { date: "2024", text: "Detayları belirleyen teknik standartlar tek tek yayımlandı" },
          { date: "17 Ocak 2025", text: "Uygulama başladı. Geçiş süresi yok" },
          { date: "Şubat ve Nisan 2025", text: "TARGET ödeme sistemi kesintisi ve İber Yarımadası elektrik kesintisi, ilk büyük sınavlar oldu" },
          { date: "Nisan 2025", text: "Bankalar tedarikçi kayıtlarını (Register of Information) ilk kez teslim etti" },
          { date: "18 Kasım 2025", text: "Avrupa denetçileri 19 kritik teknoloji sağlayıcısını açıkladı" },
          { date: "19 Kasım 2025", text: "Komisyon, raporlamayı sadeleştirmeyi hedefleyen Dijital Omnibus teklifini yayımladı" },
          { date: "Mart 2026", text: "Register'ın ikinci yıllık teslimi" },
          { date: "3 Haziran 2026", text: "DORA kapsamındaki büyük BT olaylarının ilk yıllık raporu çıktı" },
          { date: "Aralık 2026", text: "Almanya'da bankalar için BAIT tamamen kalkıyor, alan DORA'ya kalıyor" },
          { date: "17 Ocak 2028", text: "Seçilen kurumlar için ilk saldırı simülasyonu (TLPT) döngüsünün sonu ve yasanın ilk büyük gözden geçirmesi" },
        ],
        today: { date: "Ekim 2026", label: "Bugün", after: 10 },
      },
    },
    scope: {
      id: "kapsam",
      head: { index: "02", label: "Kapsam", title: "Kim için geçerli?" },
      blocks: [
        {
          type: "p",
          text: "Kısa cevap: AB'de lisansla çalışan neredeyse herkes ve onlara teknoloji satan herkes. Komisyonun etki analizine göre kapsamda 20.000'i aşkın kurum var.",
        },
        { type: "h", text: "Doğrudan kapsamdakiler (20 kurum türü)" },
        {
          type: "ul",
          items: [
            "Bankalar ve kredi kuruluşları",
            "Ödeme kuruluşları ve elektronik para kuruluşları",
            "Yatırım firmaları, portföy yöneticileri, borsalar, takas kuruluşları",
            "Sigorta ve reasürans şirketleri, sigorta aracıları",
            "Kripto varlık hizmet sağlayıcıları",
            "Kitle fonlaması platformları, kredi derecelendirme kuruluşları, emeklilik fonları",
          ],
        },
        {
          type: "p",
          text: "Büyüklük kurtarmıyor. PSD2 kapsamında lisanslı bir ödeme kuruluşu, beş kişilik bir ekiple çalışsa da DORA'nın içinde. Fark sadece ne kadar derine indiğinde: küçükler için daha sade bir çerçeve var, en ağır testler ise sadece büyük ve sistemik kurumlara düşüyor.",
        },
        { type: "h", text: "Dolaylı yoldan kapsama girenler" },
        { type: "p", text: "Asıl sürpriz burada. DORA teknoloji şirketlerini iki yoldan içeri alıyor:" },
        {
          type: "ol",
          items: [
            "**Sözleşme yoluyla.** Bir bankaya kritik bir hizmet veren her yazılım, bulut veya veri sağlayıcısı, bankanın imzalatmak zorunda olduğu DORA maddeleriyle karşılaşıyor: denetim hakkı, olay bildirimi, çıkış planı, alt yüklenici şeffaflığı. Şirket İstanbul'da, Bangalore'da ya da Kaliforniya'da olsun, fark etmiyor.",
            "**Doğrudan denetim yoluyla.** Sistemik önemdeki sağlayıcılar \"kritik\" (CTPP) ilan ediliyor ve Avrupa denetçilerinin doğrudan gözetimine giriyor. İlk listede 19 isim var.",
          ],
        },
        {
          type: "p",
          text: "**Kimler dışarıda?** BaaS modelinde bankanın arkasında duran bir fintek kendi lisansı yoksa DORA'ya doğrudan tabi değil. Ama bankanın tedarikçisi olarak sözleşmedeki bütün DORA maddelerini taşımak zorunda. Yani pratikte o da içeride.",
        },
      ],
    },
    pillars: {
      id: "sutunlar",
      head: { index: "03", label: "Beş sütun", title: "Beş sütun: DORA tam olarak ne istiyor?" },
      blocks: [
        {
          type: "p",
          text: "DORA beş soruya cevap istiyor. Hepsinin ortak noktası, cevabın kâğıtta değil işleyen bir süreçte olması.",
        },
        {
          type: "table",
          head: ["Sütun", "Sorduğu soru", "Bankada somut karşılığı"],
          rows: [
            [
              "BT risk yönetimi",
              "Riskini biliyor musun, sahibi kim?",
              "Yönetim kurulu BT riskinden doğrudan sorumlu. Varlık envanteri, risk çerçevesi, yedekleme ve geri dönüş planları yazılı ve test edilmiş olmalı",
            ],
            [
              "Olay yönetimi ve bildirimi",
              "Bir şey bozulduğunda ne kadar hızlı haber verirsin?",
              "Büyük olay tespit edilince ilk bildirim 4 saat içinde (en geç fark edildikten 24 saat sonra), ara rapor 72 saatte, nihai rapor bir ayda",
            ],
            [
              "Dayanıklılık testleri",
              "Gerçekten çalışıyor mu, denedin mi?",
              "Herkese yıllık testler. Seçilen büyük kurumlara üç yılda bir gerçek saldırgan gibi davranan ekiplerle canlı sistemlerde TLPT",
            ],
            [
              "Üçüncü taraf riski",
              "Kime bağımlısın ve o giderse ne olur?",
              "Tüm teknoloji sözleşmelerinin kaydı (Register of Information), zorunlu sözleşme maddeleri, kritik hizmetler için çıkış planı",
            ],
            [
              "Bilgi paylaşımı",
              "Gördüğün tehdidi başkalarıyla paylaşıyor musun?",
              "Sektör içinde siber tehdit istihbaratı paylaşımı. Zorunlu değil, teşvik ediliyor",
            ],
          ],
        },
        {
          type: "p",
          text: "**Gözden kaçan detay:** Dördüncü sütun en sessiz görüneniydi ama en çok iş çıkaran o oldu. Çünkü bir bankanın teknoloji sözleşmesi sayısı yüzlerle ölçülüyor ve her birinin arkasında başka alt yükleniciler var.",
        },
      ],
    },
    domino: {
      id: "domino",
      head: { index: "04", label: "Domino", title: "Domino: bir sağlayıcının fişini çek" },
      blocks: [
        {
          type: "p",
          text: "Tek bir teknoloji sağlayıcısı düştüğünde kaç kurum, kaç ülke, kaç servis karanlıkta kalır? Okumak yerine dene.",
        },
      ],
      note: "Simülasyon temsili. Kurumlar ve sağlayıcılar kurgu, bağımlılık yapısı ESAs'ın 2025 olay raporundaki tablodan esinleniyor.",
      after: [
        {
          type: "p",
          text: "**Simülasyonun söylediği:** DORA arızayı engellemiyor. Arızanın kaç kişiye, ne kadar süre ve ne kadar habersiz dokunacağını değiştiriyor.",
        },
        {
          type: "p",
          text: "**Gerçek hayattan:** 2025'te Avrupa'da raporlanan büyük BT olaylarının yaklaşık %29'u bir sağlayıcıda başladı, üçte biri sınır ötesine taştı. Şubat 2025'teki TARGET kesintisi ve Nisan 2025'teki İber Yarımadası elektrik kesintisi, tek bir noktadaki arızanın onlarca kurumdan rapor doğurabildiğini gösterdi.",
        },
      ],
      sim: domino("tr", {
        countries: { DE: "Almanya", NL: "Hollanda", FR: "Fransa", ES: "İspanya" },
        services: { app: "Uygulama", card: "Kart", transfer: "Havale" },
        labels: {
          stage: "Domino simülasyonu",
          choose: "Bir sağlayıcı seç",
          pull: "Fişi çek",
          replay: "Aynı arızayı DORA modunda oynat",
          reset: "Sıfırla",
          down: "kapalı",
          backup: "yedek",
          informed: "bilgilendirildi",
          dependsOn: "Bağlı",
          hint: "Bir sağlayıcı seç, sonra fişi çek.",
          counters: {
            institutions: "Etkilenen kurum",
            countries: "Etkilenen ülke",
            services: "Karanlıkta kalan servis",
            notice: "Müşteriye ilk haber",
          },
          noticeNormal: "48 saat",
          noticeDora: "4 saat içinde",
          noticeNote: "Temsili. DORA'da ilk bildirim, olay büyük diye sınıflandırıldıktan sonra 4 saat içinde.",
          resultNormal: "{institutions} kurum, {countries} ülke, {services} servis karanlıkta. Müşteriye ilk haber 48 saat sonra.",
          resultDora: "{services} servis yine düştü, {rerouted} servis yedeğe geçti. Hiçbir müşteri habersiz kalmadı.",
          sharedRail: "Ortak altyapının yedeği yok. DORA burada arızayı küçültmüyor, ama kimseyi karanlıkta bırakmıyor.",
          modeNormal: "DORA öncesi",
          modeDora: "DORA modu",
        },
      }),
    },
    scorecard: {
      id: "karne",
      head: { index: "05", label: "Karne", title: "İlk iki yılın karnesi: rakamlarla DORA" },
      blocks: [
        {
          type: "p",
          text: "En çarpıcı bulgu: 2025'te raporlanan büyük olayların çoğu hacker saldırısından değil, sıradan sistem arızalarından ve dış olaylardan çıktı.",
        },
        {
          type: "table",
          figures: true,
          head: ["Rakam", "Ne anlatıyor", "Kaynak"],
          rows: [
            ["3.383", "2025'te AB finans sektöründe bildirilen büyük BT olayı. Kurum başına ortalama 0,18", "ESAs yıllık olay raporu, Haziran 2026"],
            ["~%29", "Olayların üçüncü taraf sağlayıcıda başlayan payı", "ESAs yıllık olay raporu"],
            ["1/3", "Sınır ötesi etkisi olan olayların payı. Ortak altyapılar domino etkisi yaratıyor", "ESAs yıllık olay raporu"],
            ["~%15", "Nihai raporu zamanında gelmediği için istatistiğe giremeyen olay payı", "ESAs yıllık olay raporu"],
            ["19", "Avrupa denetçilerinin doğrudan gözetimine aldığı kritik teknoloji sağlayıcısı", "ESAs, Kasım 2025"],
            ["%40", "Lüksemburg'da, son teslim tarihine iki hafta kala register'ını teslim etmiş kurumların oranı (16 Mart 2026)", "CSSF"],
            ["%43", "İki yılda DORA ve benzeri uyuma 1 milyon Euro'dan fazla harcadığını söyleyen kurumların oranı", "Rubrik Zero Labs anketi"],
            ["%70", "DORA'nın teknoloji işletme maliyetlerini kalıcı olarak artıracağını düşünen kurumların oranı", "McKinsey anketi"],
            ["%37", "DORA sonrası teknoloji tedarikçilerinin fiyat artırdığını söyleyen kurumların oranı", "Veeam anketi, 2025"],
          ],
        },
        {
          type: "p",
          text: "**İki büyük sınav:** Şubat 2025'teki TARGET ödeme sistemi kesintisi ve Nisan 2025'teki İber Yarımadası elektrik kesintisi tek başlarına çok sayıda bildirime yol açtı. Tek bir arıza, onlarca kurumdan ayrı ayrı rapor demek. DORA'nın neden ortak altyapıya bu kadar takıldığını en iyi bu iki olay anlatıyor.",
        },
        {
          type: "p",
          text: "**İyi haber:** Rapora göre olayların büyük kısmında müşteriye ve işlemlere etki sınırlı kaldı. Tespit ve toparlanma çoğu zaman hızlı çalıştı.",
        },
        {
          type: "note",
          text: "Not: Anket rakamları farklı örneklemlerden geliyor, bazıları DORA ile İngiltere kurallarını birlikte ölçüyor. Eğilimi gösteriyorlar, kesin pazar ölçüsü değiller.",
        },
      ],
    },
    challenges: {
      id: "zorluklar",
      head: { index: "06", label: "Zorluklar", title: "Bankalara çıkardığı zorluklar" },
      blocks: [
        {
          type: "p",
          text: "En büyük zorluk teknoloji değil, bilgi oldu. Bankalar kendi teknoloji bağımlılıklarını bu kadar ayrıntılı hiç yazmamıştı.",
        },
        {
          type: "ol",
          items: [
            "**Bitmeyen Excel.** Register of Information tek bir liste değil, birbirine bağlı tablolardan oluşan bir veri modeli. Her sözleşme için onlarca alan, her tedarikçi için kimlik kodu, her hizmet için hangi işlevi desteklediği ve kimlere alt yüklenici olarak verildiği. Denetçiye giden dosya hatalıysa geri dönüyor, düzeltilip yeniden gönderiliyor. 2026'da bile bu döngü bitmedi.",
            "**Sözleşme masası.** Yüzlerce sözleşmeye denetim hakkı, olay bildirimi, çıkış planı gibi zorunlu maddelerin eklenmesi gerekti. Küçük bir banka büyük bir bulut sağlayıcısıyla pazarlık edemiyor, standart ek protokolü imzalıyor. Alt yüklenici kurallarının gecikmesi de müzakereleri aylarca askıda tuttu.",
            "**Saat baskısı.** Bir olayın \"büyük\" olup olmadığına saatler içinde karar vermek ve ilk bildirimi 4 saatte yapmak, çoğu bankada yeni bir nöbet düzeni demek. Üstelik tek bir ortak altyapı arızası her kurumdan ayrı rapor istiyor.",
            "**Yetenek açığı.** TLPT için gereken kırmızı takım ekipleri ve tehdit istihbaratı az. Ekip liderinde en az 5 yıllık sızma testi deneyimi aranıyor. Avrupa'da bu profil sayılı.",
            "**Maliyet ve yorgunluk.** Ankete katılan kurumların neredeyse yarısı iki yılda bir milyon Euro'yu aştı. BT ve güvenlik ekiplerindeki baskı arttı, tedarikçiler DORA uyumunun maliyetini fiyata yansıttı.",
            "**Kural yığını.** DORA tek başına gelmedi. NIS2, GDPR, Siber Dayanıklılık Yasası ve Yapay Zeka Yasası aynı sistemlere başka açılardan dokunuyor. Avrupa sermaye piyasaları birliği AFME, özellikle DORA ile Siber Dayanıklılık Yasası'nın aynı bankacılık uygulamalarına çift kural getirdiğinden şikâyetçi.",
            "**Küçüklerin yükü.** Orantılılık ilkesi var ama register, olay bildirimi ve sözleşme maddeleri küçük bir ödeme kuruluşu için de aynı. Uyum ekibi olmayan bir fintek için bu ciddi bir sabit maliyet.",
            "**Yavaşlayan ürün hızı.** *(Bizim gözlemimiz)* Yeni bir partner veya SaaS aracı eklemek artık sadece teknik entegrasyon değil. Önce DORA durum tespiti, sonra sözleşme ekleri, sonra register güncellemesi. Bir bankada yeni ürünün canlıya çıkma süresine birkaç hafta, bazen aylar ekleniyor.",
          ],
        },
      ],
    },
    solved: {
      id: "cozdukleri",
      head: { index: "07", label: "Çözdükleri", title: "Neleri çözdü?" },
      blocks: [
        {
          type: "p",
          text: "DORA'nın asıl başarısı, Avrupa finans sisteminin teknoloji haritasını ilk kez çıkarması. Bu harita olmadan ne yoğunlaşma riski konuşulabiliyordu ne de devlere hesap sorulabiliyordu.",
        },
        {
          type: "ul",
          items: [
            "**27 ülke, tek dil.** Ulusal kuralların yerini tek bir yönetmelik aldı. Birden fazla AB ülkesinde çalışan bir grup artık her ülke için ayrı BT rehberi takip etmiyor. Almanya'da bankalar için BAIT 2026 sonunda tamamen kalkıyor.",
            "**Görünmeyen bağımlılık görünür oldu.** Bankaların teslim ettiği register'lar, Avrupa denetçilerinin 19 kritik sağlayıcıyı seçerken kullandığı ana veri oldu. Yani bankaların zorlandığı o Excel, sistemik riskin ölçüldüğü cetvele dönüştü.",
            "**Devlerle masada denge.** Küçük bir banka tek başına AWS'yi ya da Microsoft'u denetleyemez. Şimdi bunu Avrupa denetçileri yapıyor. Kuralı çiğneyen kritik sağlayıcıya günlük dünya cirosunun %1'ine kadar, altı aya varan süreyle ceza kesilebiliyor.",
            "**Ortak olay verisi.** Avrupa ilk kez finans sektöründeki büyük BT olaylarını aynı tanımla, aynı formatta topladı. 3.383 olaylık ilk rapor, bundan sonraki her tartışmanın başlangıç çizgisi.",
            "**Konu yönetim kuruluna çıktı.** BT riski artık BT müdürünün değil, yönetim kurulunun imzasıyla sorumlu olduğu bir konu. McKinsey'in anketinde kurumların büyük çoğunluğu DORA'yı yönetim kurulu gündemine taşıdığını söylüyor.",
            "**\"Ya giderse?\" sorusu sorulur oldu.** Kritik hizmetler için çıkış planı zorunluluğu, yıllardır konuşulmayan tedarikçi bağımlılığını masaya getirdi.",
            "**Sözleşmelerde ortak bir dil.** *(Bizim yorumumuz)* Her banka aynı maddeleri istediği için tedarikçiler standart DORA ekleri hazırladı. İlk yıl sancılıydı ama zamanla yeni partnerlikleri hızlandırabilecek bir şablon ortaya çıktı.",
          ],
        },
      ],
    },
    story: {
      id: "elif",
      head: { index: "08", label: "Elif", title: "Kullanıcı hikayesi: Elif'in üç arızası" },
      intro: "Temsili bir hikaye. Karakter kurgu, arka plandaki olaylar ve kurallar gerçek.",
      lead: "Elif Köln'de el yapımı seramik satan küçük bir online dükkân işletiyor. Hesabı orta büyüklükte bir dijital bankada, ödemeleri bir ödeme kuruluşu üzerinden alıyor. DORA'nın adını hiç duymadı. Ama son üç yılda üç kez onunla karşılaştı.",
      scenes: [
        {
          title: "Kasım 2023. Sessiz arıza.",
          body: "Cuma akşamı müşteri ödemeleri hesabına düşmüyor. Uygulamada tek satır: \"Teknik bir sorun yaşıyoruz.\" Çağrı merkezi ne zaman düzeleceğini bilmiyor. Pazartesi her şey kendiliğinden düzeliyor. Elif hafta sonu boyunca üç siparişi iptal ediyor, çünkü parayı görmeden kargo yapmak istemiyor. Kimse ona ne olduğunu anlatmıyor.",
        },
        {
          title: "Şubat 2025. Aynı tür arıza, farklı bir tavır.",
          body: "Avrupa'nın TARGET ödeme sistemi saatlerce aksıyor. Elif'in giden havalesi gecikiyor. Bu kez fark şu: birkaç saat içinde uygulamada bir bilgi kutusu beliriyor, ardından e-posta geliyor. Sorun bankada değil ortak altyapıda, ödemeler sırada, tahmini süre şu kadar. DORA, müşterinin parasını etkileyen büyük olaylarda kuruma müşteriyi bilgilendirme yükümlülüğü getirdi. Elif bunu bilmiyor ama farkı hissediyor: panik yerine plan yapıyor.",
        },
        {
          title: "Bahar 2026. Geciken özellik.",
          body: "Bankası, küçük işletmeler için fatura ödeme ve tahsilat özelliğini \"yakında\" diye duyurmuştu. Lansman iki ay kayıyor. Elif kızgın. Arka planda olan şu *(bizim tahminimiz)*: bankanın seçtiği yeni fatura altyapısı sağlayıcısı kritik bir işlevi destekleyeceği için DORA durum tespitinden geçiyor, sözleşmeye denetim ve çıkış maddeleri ekleniyor, register güncelleniyor. Elif'e gelen tek şey bir gecikme. Ama aynı süreç, o sağlayıcı bir gün batarsa bankanın onun parasını başka bir yoldan işleyebileceği anlamına geliyor.",
        },
      ],
      summary: "**Hikayenin özeti:** DORA'yı müşteri doğrudan görmüyor. Gördüğü şey iki şey: arızada daha hızlı ve dürüst bir haber, yeni özellikte ise biraz daha uzun bir bekleme. İyi bir banka bu ikisini dengeleyebilen banka.",
      phone: {
        account: "Hesabım",
        sceneLabel: "Ekran",
        s1: {
          balanceLabel: "Bakiye",
          balance: "1.240,50 €",
          banner: "Teknik bir sorun yaşıyoruz.",
          pendingHeading: "Bekleyen ödemeler",
          pendingLabel: "Beklemede",
          rows: [
            { label: "Gelen ödeme", amount: "48,00 €" },
            { label: "Gelen ödeme", amount: "112,50 €" },
            { label: "Gelen ödeme", amount: "36,90 €" },
          ],
          support: "Müşteri hizmetleri · Bekleme süresi: 34 dk",
        },
        s2: {
          pushApp: "Hesabım",
          push: "Giden havaleleriniz gecikebilir",
          info: "Avrupa'nın ortak ödeme altyapısında (TARGET) bir kesinti var. Sorun bankamızda değil. Havaleleriniz sırada ve kaybolmadı. Bir sonraki güncelleme: 16:00",
          rowLabel: "Giden havale",
          rowAmount: "320,00 €",
          queuedLabel: "Sırada",
          time: "13:12",
        },
        s3: {
          title: "Fatura tahsilatı",
          before: "Yakında",
          after: "Ertelendi: Haziran",
          note: "Yeni altyapı sağlayıcımızın güvenlik ve süreklilik kontrollerini tamamlıyoruz.",
        },
      },
    },
    market: {
      id: "pazar",
      head: { index: "09", label: "Pazar", title: "DORA'nın açtığı pazar" },
      blocks: [
        {
          type: "p",
          text: "Evet, DORA için özel ürünler çıktı ve bir kategori doğdu. Bankaların zorlandığı her sütunun karşısında şimdi bir yazılım ya da hizmet var.",
        },
        {
          type: "table",
          head: ["Kategori", "Neyi çözüyor", "Örnek oyuncular"],
          rows: [
            ["Register otomasyonu", "Tedarikçi verisini toplayıp denetçinin istediği formatta, doğrulanmış dosya üretiyor", "Formalize, OneTrust, Panorays, Prevalent"],
            ["Tedarikçi risk yönetimi (TPRM)", "Tedarikçileri sürekli izliyor, anket ve skor tutuyor, yoğunlaşma riskini gösteriyor", "BitSight, UpGuard, Panorays, Riskonnect"],
            ["Uyum otomasyonu (GRC)", "Beş sütunu tek panelde topluyor, kanıt ve denetim izi üretiyor", "Vanta, OneTrust, LogicGate, SureCloud, CyberArrow"],
            ["Olay sınıflandırma ve bildirim", "Olayı DORA kriterlerine göre sınıflandırıyor, 4 saat, 72 saat ve bir ay saatini yönetiyor", "GRC platformlarının DORA modülleri"],
            ["TLPT ve tehdit istihbaratı", "Gerçek saldırgan senaryolarıyla canlı sistemde kırmızı takım testi", "Kırmızı takım firmaları, Filigran gibi istihbarat platformları"],
            ["Veri dayanıklılığı", "Yedekleme, geri dönüş ve fidye yazılımına karşı kurtarma", "Veeam, Rubrik"],
            ["Bulut sağlayıcı paketleri", "Bulut devlerinin bankalara hazır DORA eşleştirmeleri ve sözleşme ekleri", "Microsoft ve diğer bulut devleri"],
            ["Danışmanlık ve hukuk", "Boşluk analizi, register teslimi, sözleşme ek şablonları", "Büyük dörtlü, hukuk büroları"],
          ],
        },
        {
          type: "p",
          text: "**Pazarın büyüklüğü.** DORA'ya özel bir pazar ölçümü yok, ama en yakın kategori olan tedarikçi risk yönetimi için araştırma şirketleri 2025'te 7,7 ile 10,8 milyar dolar arası bir büyüklük ve yıllık %14-16 büyüme tahmin ediyor. Hemen hepsi DORA'yı Avrupa'daki ana büyüme motoru olarak sayıyor. Rakamlar şirketten şirkete çok değişiyor, yön ise aynı.",
        },
        {
          type: "p",
          text: "**Fiyat skalası.** Büyük kurum platformları fiyatı teklif üzerine veriyor. Orta ölçekli kurumlara yönelik araçlarda aylık 900 Euro civarından başlayan planlar görülüyor.",
        },
        { type: "h", text: "Pazarın üç katmanı" },
        {
          type: "ol",
          items: [
            "**Yazılım:** register, TPRM, GRC. En hızlı büyüyen katman. 2024'te çoğu genel uyum aracıydı, 2026'da \"DORA'ya özel\" diye kendini konumlayan yeni oyuncular var.",
            "**Hizmet:** danışmanlık, hukuk, kırmızı takım, tehdit istihbaratı. TLPT'nin 2028 takvimi bu katmanı önümüzdeki iki yıl sıcak tutacak.",
            "**Tedarikçi tarafı:** Bankaya satış yapan her SaaS şirketi için \"DORA'ya hazırız\" artık bir satış argümanı. Hazır sözleşme eki, denetim paketi, çıkış planı desteği sunamayan tedarikçi, giderek daha sık ihaleden önce eleniyor (bizim gözlemimiz).",
          ],
        },
        {
          type: "p",
          text: "**Dikkat:** Araç satın almak sorunu çözmüyor. Sektördeki ortak görüş, register'daki acının araçtan değil, alttaki verinin dağınıklığından geldiği yönünde.",
        },
      ],
    },
    outcomes: {
      id: "sonuclar",
      head: { index: "10", label: "Sonuçlar", title: "Sonuçlar: önümüzdeki yıllarda ne değişecek?" },
      blocks: [
        {
          type: "p",
          text: "DORA'nın ilk iki yılı hazırlıkla geçti, 2026 ile birlikte denetim dönemi başladı. Önümüzdeki dönemde etkisi uyum ekiplerinden çıkıp iş modellerine yayılacak.",
        },
        {
          type: "ol",
          items: [
            "**Rehberlikten yaptırıma.** Ulusal denetçiler 2026'da sahaya indi, register verilerini otomatik olarak çapraz kontrol ediyor. Cezaların tavanı ülkeden ülkeye değişiyor, örneğin Almanya'da 5 milyon Euro'ya kadar. İlk kamuya açık cezalar, \"DORA kâğıt üstünde kalır\" diyenler için bir sınav olacak.",
            "**Daha az ama daha güçlü tedarikçi.** *(Bizim tahminimiz)* Her yeni tedarikçi register'da yeni satırlar, yeni sözleşme ekleri ve yeni izleme demek. Bankalar tedarikçi sayısını azaltmaya, DORA'ya hazır büyük oyuncularla çalışmaya yönelecek.",
            "**Yoğunlaşma paradoksu.** *(Bizim yorumumuz)* DORA birkaç devin üzerindeki yoğunlaşma riskini azaltmak için çıktı. Ama uyumu en kolay sağlayan da hazır paketleri olan o devler. Kural, istemeden riski azaltmaya çalıştığı yere doğru itebilir. Denetçilerin bunu nasıl dengeleyeceği açık bir soru.",
            "**Küçük fintekler için hesap değişiyor.** Kendi lisansıyla çalışmanın sabit maliyeti arttı. Bir banka veya lisanslı platform üzerinden ilerlemek (BaaS, gömülü finans) daha çok şirket için mantıklı hale gelebilir. Öte yandan bankalar da partner seçerken DORA olgunluğunu ilk sıraya koyacak.",
            "**Raporlamada sadeleşme.** Komisyonun Dijital Omnibus teklifi, NIS2, GDPR ve DORA kapsamındaki olay bildirimlerini ENISA'nın işleteceği tek bir giriş noktasında toplamayı öneriyor: bir kez bildir, ilgili herkese dağıtılsın. Teklif yasalaşırsa bu hattın yaklaşık 18 ay içinde kullanıma açılması planlanıyor.",
            "**2028'deki büyük gözden geçirme.** Komisyon 17 Ocak 2028'e kadar DORA'yı baştan değerlendirecek. Odakta orantılılık var: küçük kurumların yükü sistemik önemleriyle orantılı mı?",
            "**Yapay zeka register'a giriyor.** Bankaların kullandığı yapay zeka hizmetleri de birer BT hizmeti. Model sağlayıcıları register'larda, sözleşme eklerinde ve belki de bir gün kritik sağlayıcı listesinde görünecek. İngiltere bu yönde açık bir siyasi baskı yaşıyor.",
          ],
        },
      ],
    },
    uk: {
      id: "ingiltere",
      head: { index: "11", label: "İngiltere", title: "İngiltere: aynı film, farklı salon" },
      blocks: [
        {
          type: "p",
          text: "İngiltere AB'de değil ama aynı soruya kendi cevabını veriyor. Critical Third Parties (CTP) rejimi, DORA'nın kritik sağlayıcı ayağının İngiliz versiyonu.",
        },
        {
          type: "table",
          head: ["", "AB (DORA)", "İngiltere (CTP rejimi)"],
          rows: [
            ["Yasal dayanak", "Regulation (EU) 2022/2554", "Financial Services and Markets Act 2023"],
            ["Kurallar ne zaman başladı", "17 Ocak 2025", "1 Ocak 2025"],
            ["İlk kritik sağlayıcı listesi", "18 Kasım 2025, 19 şirket", "10 Temmuz 2026, 4 şirket (13 Temmuz'dan itibaren geçerli)"],
            ["Listede kimler var", "Bulut, veri merkezi, telekom, BT hizmetleri ve finansal veri sağlayıcıları", "AWS, Google Cloud, Microsoft, Oracle"],
            ["Kim denetliyor", "EBA, ESMA, EIOPA", "FCA, PRA ve İngiltere Merkez Bankası"],
            ["Kurumların tedarikçi kaydı", "Her yıl teslim ediliyor", "Önemli tedarikçi kayıtlarının yıllık teslimi 18 Mart 2027'de başlıyor"],
          ],
        },
        {
          type: "p",
          text: "**Fark nerede?** AB geniş bir ağ attı, İngiltere sadece en büyük dört balığı tuttu ve \"az sayıda\" sağlayıcıyla yetinmek istediğini açıkça söylüyor. Ama listenin büyüyeceği belli. Parlamentonun Hazine Komitesi, yapay zeka sağlayıcılarının da bu rejime alınmasını istiyor.",
        },
        {
          type: "p",
          text: "**Her iki pazarda çalışanlar için:** Londra ve Frankfurt'ta lisansı olan bir grup, aynı tedarikçi için iki ayrı kayıt, iki ayrı denetim beklentisi yönetecek. Format farklı, mantık aynı.",
        },
      ],
    },
    turkey: {
      id: "turkiye",
      head: { index: "12", label: "Türkiye", title: "Türkiye köprüsü" },
      blocks: [
        {
          type: "p",
          text: "DORA bir Türk kanunu değil, ama Türkiye'den Avrupa'ya uzanan her finansal köprü DORA'nın üzerinden geçiyor. Üç yerde doğrudan hissediliyor.",
        },
        {
          type: "p",
          text: "**1. Avrupa'daki Türk sermayeli bankalar ve ödeme kuruluşları.** Almanya, Hollanda veya başka bir AB ülkesinde lisanslı her kurum doğrudan kapsamda. Burada gözden kaçan nokta grup içi hizmetler. DORA'nın sözleşme kuralları sadece dış tedarikçiler için değil, grup içi düzenlemeler için de geçerli. İstanbul'daki ana bankanın veya grup şirketinin sağladığı ana bankacılık sistemi, veri merkezi ya da yazılım; register'a giriyor, sözleşmeye denetim hakkı ve çıkış planı ekleniyor. \"Ana şirketimiz zaten bizim\" demek DORA'da yetmiyor.",
        },
        {
          type: "p",
          text: "**2. AB'ye satış yapan Türk teknoloji şirketleri.** Bir Avrupa bankasına yazılım, bulut veya veri hizmeti veren Türk firması, müşterisinin imzalattığı DORA maddeleriyle karşılaşıyor: olay bildirimi, denetime açık olma, alt yüklenici şeffaflığı, çıkış desteği. Bunu hazır paket olarak sunabilen firma, Avrupa ihalelerinde bir adım önde başlıyor.",
        },
        {
          type: "p",
          text: "**3. Avrupa'ya açılmak isteyen Türk fintekler.** Romanya'da, Litvanya'da ya da Almanya'da lisans almak, ilk günden DORA'yla yaşamak demek. Register, olay süreci, test planı lisans başvurusunun doğal parçası haline geldi. Partner banka üzerinden girmek ise sorumluluğu ortadan kaldırmıyor, sözleşmeye taşıyor.",
        },
        {
          type: "p",
          text: "**Türkiye'deki kurallarla kıyas.** BDDK'nın Bilgi Sistemleri ve Elektronik Bankacılık Hizmetleri Yönetmeliği ile DORA arasında risk yönetimi, iş sürekliliği ve dış hizmet tarafında ciddi paralellikler var. İki önemli fark göze çarpıyor: Türkiye'de kritik veri ve sistemlerin yurt içinde kalması yönünde güçlü bir yaklaşım var, bu da bulut kullanımını sınırlıyor. DORA ise buluta karşı değil, buluta bağımlılığın yönetilmesini istiyor ve teknoloji devlerini doğrudan denetliyor.",
        },
        {
          type: "p",
          text: "**Köprünün iki ucu:** Türkiye'de BDDK'ya, Almanya'da BaFin'e ve DORA'ya aynı anda uyan bir grup için tek bir tedarikçi envanteri tutmak, iki ayrı uyum projesi yürütmekten çok daha ucuz. *(Bizim önerimiz)*",
        },
      ],
    },
    desks: {
      id: "sen-olsan",
      head: { index: "13", label: "Sen olsan", title: "Sen olsan ne yapardın?" },
      blocks: [{ type: "p", text: "İki masa, iki karar. Okur seçimini yapıyor, ardından bizim bakışımızı görüyor." }],
      items: [
        {
          title: "Masa 1: Hızlı partner mi, hazır partner mi?",
          scenario: "Bir dijital bankada ürün sorumlususun. KOBİ'ler için fatura tahsilat özelliğini üç ayda çıkarmak istiyorsun. İki aday var.",
          options: [
            { key: "A", text: "Harika arayüzü olan 40 kişilik bir girişim. DORA ekini görmemiş, denetim hakkı maddesine itiraz ediyor" },
            { key: "B", text: "Arayüzü sıradan, büyük ve köklü bir sağlayıcı. Hazır DORA paketi var ama entegrasyon iki ay daha uzun" },
            { key: "C", text: "Girişimle devam ederim ama önce DORA maddelerini birlikte hazırlarız, lansmanı sınırlı bir pilotla başlatırım" },
          ],
          take: "**Bizim bakışımız:** Doğru cevap çoğu zaman lansman tarihinden değil, bu özelliğin \"kritik veya önemli işlev\" sayılıp sayılmadığından çıkıyor. Sayılıyorsa denetim hakkı pazarlık konusu değil. Girişim bunu kabul etmeye hazır mı, yoksa ilk müzakerede mi öğreneceksin?",
        },
        {
          title: "Masa 2: Avrupa'ya açılırken altyapı nerede dursun?",
          scenario: "Türkiye'de büyümüş bir ödeme şirketisin, Romanya'da lisans almak istiyorsun. Tüm altyapın İstanbul'da.",
          options: [
            { key: "A", text: "Altyapıyı tamamen AB'ye taşırım" },
            { key: "B", text: "İstanbul'dan grup içi hizmet olarak veririm, DORA sözleşmesi ve çıkış planıyla belgelerim" },
            { key: "C", text: "İlk aşamada AB'de lisanslı bir partner üzerinden girerim, kendi lisansımı sonra alırım" },
          ],
          take: "**Bizim bakışımız:** Üç yol da mümkün, üçünün maliyeti ve hızı çok farklı. Denetçi grup içi hizmeti kabul edebilir, ama \"İstanbul'daki sistem bir gün erişilemez olursa Romanya'daki müşterinin parası ne olur?\" sorusuna yazılı ve test edilmiş bir cevap bekler. O cevabı bugün verebiliyor musun?",
        },
      ],
    },
    calendar: {
      id: "takvim",
      head: { index: "14", label: "Takvim", title: "Takvimde sırada ne var?" },
      blocks: [
        {
          type: "p",
          text: "Önümüzdeki 15 ayda DORA takvimi kalabalık. En kritik tarih, büyük kurumlar için ilk saldırı simülasyonu döngüsünün kapandığı Ocak 2028.",
        },
        {
          type: "table",
          head: ["Ne zaman", "Ne olacak"],
          rows: [
            ["Kasım 2026 (beklenen)", "Kritik sağlayıcı listesinin ilk yıllık güncellemesi. Liste her yıl yenileniyor"],
            ["Aralık 2026", "Almanya'da bankalar için BAIT tamamen kalkıyor"],
            ["Mart 2027", "Register of Information'ın üçüncü yıllık teslimi (31 Aralık 2026 verisiyle)"],
            ["18 Mart 2027", "İngiltere'de kurumlar önemli tedarikçi kayıtlarını yıllık olarak teslim etmeye başlıyor"],
            ["2027 (teklif yasalaşırsa)", "Dijital Omnibus ile tek olay bildirim noktasının devreye girmesi"],
            ["17 Ocak 2028", "Seçilen kurumlar için ilk TLPT döngüsünün sonu ve Komisyonun DORA gözden geçirmesi"],
          ],
        },
      ],
    },
    note: {
      id: "not",
      head: { index: "15", label: "fspark9 notu", title: "fspark9 notu" },
      blocks: [
        {
          type: "p",
          text: "DORA çoğu bankada bir uyum projesi olarak başladı ve uyum ekibinin masasında kaldı. Bizce asıl etkisi ürün masasında hissedilecek. Çünkü artık her yeni özellik, her yeni partner, her yeni pazar bir DORA sorusuyla başlıyor.",
        },
        { type: "p", text: "Dışarıdan bakıp yargılamak kolay. O yüzden yargı yerine birkaç soru bırakıyoruz:" },
        {
          type: "ul",
          items: [
            "Register'ınıza baktığınızda, sadece tedarikçi listesini mi görüyorsunuz, yoksa ürün yol haritanızın nerede tıkanacağını da?",
            "Yeni bir partneri seçerken DORA maddelerini ilk toplantıda mı konuşuyorsunuz, yoksa sözleşme masasında mı öğreniyorsunuz?",
            "Bir sonraki özelliğiniz \"kritik veya önemli işlev\" sayılıyor mu? Bunu kim, ne zaman karar veriyor?",
            "Grup içinden aldığınız hizmetler için çıkış planınız gerçekten çalışır mı, yoksa sadece yazılı mı?",
            "DORA'ya hazır partnerler arasından seçim yapmak, müşterinin istediği deneyimden ödün vermek anlamına mı geliyor? Gelmemeli.",
          ],
        },
        {
          type: "p",
          text: "İki bankayı sıfırdan kuran, ürünleri hem Almanya'da hem Türkiye'de canlıya alan biri olarak şunu gördük: kural ne kadar ağır olursa olsun, onu ilk günden tasarıma katan ekip en hızlı ilerleyen ekip oluyor. DORA'yı sonradan eklenen bir kontrol listesi olarak değil, partner seçiminin ve ürün akışının ilk adımı olarak ele almak mümkün.",
        },
        {
          type: "p",
          text: "Yeni bir dijital ürün çıkarırken doğru partneri seçmek ya da DORA'yla uyumlu bir lansman akışı kurmak masanızdaysa, [Yeni Ürün Hattı](service:product-strategy) ve [Doğru Banka Partneri](service:embedded-finance) tam bunun için var.",
        },
      ],
    },
    close: {
      text: "Bir sonraki ürününü DORA'ya takılmadan çıkarmak ister misin?",
      bookLabel: "Görüşme ayarla",
    },
    sources: {
      head: { index: "", label: "Kaynaklar", title: "Her rakamın geldiği yer." },
      groups: [
        {
          heading: "Resmi kaynaklar",
          items: [
            { label: "ESAs: kritik BT sağlayıcılarının belirlenmesi, Kasım 2025", href: "https://www.eba.europa.eu/publications-and-media/press-releases/european-supervisory-authorities-designate-critical-ict-third-party-providers-under-digital" },
            { label: "ESAs: 19 kritik sağlayıcının listesi (PDF)", href: "https://www.esma.europa.eu/sites/default/files/2025-11/List_of_designated_CTPPs.pdf" },
            { label: "ESAs: 2025 büyük BT olayları raporu (PDF)", href: "https://www.esma.europa.eu/sites/default/files/2026-06/JC_2026_16_ESAs_2025_report_on_major_ICT-related_incidents.pdf" },
            { label: "CSSF: DORA kapsamı ve 20 kurum türü", href: "https://cssf.lu/en/digital-operational-resilience-act-dora" },
            { label: "CSSF: register teslimi güncellemesi, Mart 2026", href: "https://www.cssf.lu/en/2026/03/dora-register-of-information-collection/" },
            { label: "Central Bank of Ireland: register teslimi 2026", href: "https://edit.centralbank.ie/regulation/digital-operational-resilience-act-dora/reporting-registers-of-information" },
            { label: "GOV.UK: İngiltere'nin ilk dört kritik üçüncü tarafı, Temmuz 2026", href: "https://www.gov.uk/government/news/uk-financial-system-strengthened-with-new-safeguards-for-major-technology-providers" },
          ],
        },
        {
          heading: "Analiz ve haber",
          items: [
            { label: "Paperjam: 3.383 olayın ayrıntıları", href: "https://en.paperjam.lu/article/dora-exposes-3-383-major-ict-incidents-across-eu-financial-sector" },
            { label: "Fundación Mapfre: ESAs olay raporu özeti", href: "https://documentacion.fundacionmapfre.org/documentacion/publico/en/bib/192764.do" },
            { label: "Morgan Lewis: kritik sağlayıcı listesi üzerine", href: "https://www.morganlewis.com/ru/blogs/sourcingatmorganlewis/2025/11/dora-eu-regulators-announce-list-of-critical-ict-third-party-providers" },
            { label: "Morgan Lewis: DORA sözleşme maddeleri", href: "https://morganlewis.com/blogs/sourcingatmorganlewis/2024/06/preparing-for-dora-mind-the-gap" },
            { label: "Simmons & Simmons: ülke bazında uygulama ve cezalar", href: "https://www.simmons-simmons.com/en/publications/cm60fpyud06qktr0k9h3ch8vg/dora-implementation-day-is-here" },
            { label: "McKinsey: DORA hazırlık anketi", href: "https://www.mckinsey.de/capabilities/risk-and-resilience/our-insights/europes-new-resilience-regime-the-race-to-get-ready-for-dora" },
            { label: "Infosecurity Magazine: Rubrik maliyet anketi", href: "https://www.infosecurity-magazine.com/news/dora-compliance-costs-soar/" },
            { label: "SecurityBrief: Veeam anketi", href: "https://securitybrief.co.uk/story/financial-firms-in-emea-face-data-resilience-gaps-post-dora" },
            { label: "CMS: Dijital Omnibus ve tek bildirim noktası", href: "https://cms.law/en/gbr/legal-updates/the-eu-s-digital-omnibus-simplification-consolidation-and-a-sharper-edge-on-compliance" },
            { label: "AFME: DORA ve Siber Dayanıklılık Yasası çakışması", href: "https://www.afme.eu/news-insights/press-releases/afme-comments-on-eu-digital-omnibus-package-eu-risks-missing-opportunity-to-simplify-cyber-regulation/" },
            { label: "Lewis Silkin: İngiltere CTP atamaları", href: "https://www.lewissilkin.com/insights/2026/07/15/uk-designates-first-technology-providers-under-the-critical-third-parties-regime-102nbxt" },
            { label: "Morrison Foerster: İngiltere tedarikçi kaydı takvimi", href: "https://www.mofo.com/resources/insights/260716-uk-announces-list-of-first-critical-third-parties" },
            { label: "Copla: TLPT gereklilikleri", href: "https://copla.com/blog/compliance-regulations/dora-threat-led-penetration-testing-tlpt-requirements/" },
            { label: "Legiscope: DORA yazılımları karşılaştırması", href: "https://www.legiscope.com/blog/best-dora-compliance-software.html" },
            { label: "ComplyJet: DORA yazılımları incelemesi", href: "https://www.complyjet.com/blog/best-dora-compliance-software" },
            { label: "Fortune Business Insights: TPRM pazar büyüklüğü", href: "https://www.fortunebusinessinsights.com/third-party-risk-management-market-117395" },
            { label: "Akbank: DORA'nın Türk şirketlerine etkisi", href: "https://www.akbank.com/blog/dijital-dayanikliligi-saglamanin-10-yolu" },
            { label: "Capital: BDDK, DORA ve bulut tartışması", href: "https://www.capital.com.tr/haberler/tum-haberler/finans-sektorunde-teknoloji-kullanimi-ve-beklentileri-hangi-yone-gidiyor" },
          ],
        },
      ],
      note: "Not: Kullanıcı hikayesi temsili bir kurgu. \"Bizim gözlemimiz / tahminimiz / yorumumuz\" diye işaretli yerler fspark9'un çıkarımı, kaynaklı bulgu değil.",
    },
  },
};

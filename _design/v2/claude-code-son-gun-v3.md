# Claude Code prompt · Spark · The Last Day / Son Gün · new format page and Nº 01 Bó

Paste everything below the line into Claude Code.

---

## What this is

We are replacing the current The Last Day format page and the Bó episode page with a new design. The approved prototype is in the repo at:

```
docs/spark/son-gun-01-bo-v3.html
```

Open it in a browser before you start. It is a single file with two views: the format page, and the episode at `#bo`. The Turkish copy in it is final. The English copy is in section 6 of this prompt.

Work on the `staging` branch as in the rebuild brief. Work autonomously. Stop only if the repo contradicts this prompt in a way you cannot resolve.

## 1. Retire the old design completely

The old Son Gün rulebook and the old episode 01 brief (`fspark9-son-gun-bolum-01-bo-claude-code-brief.md`, `fspark9-otopsi-format-kural-kitabi.md`) no longer apply. Do not follow anything in them.

Remove from the episode page and delete the code for:

- the day clock, the ruler and the "Then, a year later · Day 573" item
- every mechanic: Call, Estimate, Weigh, Signal, Second Opinion, Allocation
- Record / Reading / Gap blocks, the Ledger toggle, the scorecard, the share action
- the `fspark9.lastday.v2` localStorage state. The new page stores nothing in the browser
- all Day 573 / CMA letter content, everywhere

Delete components that are no longer used by any page. List them in your handback.

## 2. Keep what already works

The prototype is not a pixel spec for things the site already has. Keep the repo's own components and small interactions wherever they exist, for example:

- site header, `SparkSubnav`, `BackLink`, `NextStep`, footer, booking popup (every "Book a call" opens it, as today)
- hover details already built, like the Read link and arrow button turning Flare on hover, the GoButton nudge, link underlines
- design tokens, fonts, logo files, easing and durations from the repo

Follow the prototype exactly only where it introduces something new or deliberately changes something. That list is in section 3. The prototype's header, logo, nav and footer are stand-ins. Use the real ones. Its hash routing is a stand-in too. Use the real routes.

**URLs do not change.** Keep the existing routes for the format page and the Bó episode in both locales.

## 3. What is new and must match the prototype

### Format page

- Ink opening: label, big "Son Gün / The Last Day" title, one line, Flare cut button to Nº 01, large outline "01" on the right (as in the brand book).
- "How to read" section: three white cards with a 2 px Ink top rule.
- Episode rows: a small card icon on the left (Flare for published, dashed Rule outline for coming), name, one line, `Nº 01 · 156 days`, arrow button. Coming rows are Stone with no link.
- NextStep close.

### Episode page

**Opening (Ink, full viewport).** Label, H1, sub line, invite line, a Paper button "Let's begin" that scrolls to chapter 1. On the right a Flare portrait card (54:86 ratio) drawn in CSS, with a chip outline, "000" and "Day 000 · 27.11.2019". It rises in once on load. No real Bó card image, no Bó or NatWest logo anywhere on it.

**Story layout.** 12 columns. From 1000 px up, a sticky rail in columns 1 to 3 holds the card (170 px wide) and a small caption. Chapters sit in columns 5 to 11. Below 1000 px the rail is hidden and a thin sticky bar under the header shows a mini card, the chapter title and the day.

**The card follows the story.** Each chapter carries a card state. An IntersectionObserver (root margin `-35% 0px -55% 0px`) switches it:

| Point in the story | Card | Day | State text | Caption | Bar title |
|---|---|---|---|---|---|
| Chapter 1 | dashed outline, Dust | ? | Not yet | Before launch | Idea |
| Chapter 2 | Flare | 000 | 27 November 2019 | Launch day | Promise |
| Chapter 3 | Flare | 037 | 3 January 2020 | A line on the calendar | Calendar |
| Interlude | flips to its back (rotateY, 640 ms) | 070 | New card | 6,000 cards reissued | New card |
| Chapter 4 | back side | 108 | 14 March 2020 | The world is changing | Spring |
| Chapter 5 | Rule grey, Stone text | 156 | Last day | 1 May 2020 | Last day |

The card is the only Flare element in the reading area.

**Chapter.** Mono label ("Chapter 3 · Day 037"), big Epilogue 800 title, a lead sentence in Epilogue 700, then body paragraphs with small superscript footnote links to the sources list.

**Decision component** (new, one per chapter 1 to 4). White card, 4 px Ink top.

- Label with a small Ink square, different per chapter (see copy). Question in Epilogue 800. Three options A, B, C as full width square buttons on Paper, `aria-pressed`.
- On pick: chosen option fills Ink, the other two dim to 50%. Below it opens (height and fade, 560 ms): the answer for the chosen road only, tagged "Your pick · B" with a 3 px Ink left rule.
- A text button "Show the other roads" reveals the other two answers under it, tagged "Road A", "Road C", in Stone with a Rule left rule. The reader's own answer always stays first and visually distinct.
- Then "What Bó did" (2 px Ink top): a heading and one or two short paragraphs.
- Then the fspark9 note on an Ink block: Epilogue 700 text and the service tag(s) in Dust mono. Each tag links to that service page.
- The reader can change their pick. Nothing is stored, nothing is scored, nothing is sent anywhere.

**Interlude** between chapters 3 and 4: one large Epilogue 800 line. This is where the card flips.

**Chapter 5.** Lead line, then three numbered lessons (big number, bold heading, one Stone line), separated by 1 px rules under a 2 px Ink rule.

**Final question** (new, lead capture). White card, 4 px Ink top, four options with an arrow key. Picking one shows a fit block: service name in mono, a short heading, one line, and a Flare cut "Book a call" button that opens the existing booking popup. Also link the service name to its page.

**Then:** the next episode row (Nuri, coming), a small sources list with numbered links, one correction line, and NextStep.

**Motion.** One easing from the repo. Card rise on load, card state changes and flip, decision reveal, and a single fade up on text blocks as they first enter. Nothing loops. Under `prefers-reduced-motion` everything is instant.

## 4. Content model

Follow the rebuild plan: build from typed static content first, Sanity last.

Put the episode in `src/content/spark.ts` (en and tr), typed in `src/types/content.ts`, roughly:

```
Episode {
  number, slug, subject, days
  seo { title, description }
  hero { label, title, sub, invite, startLabel, cardDay, cardState }
  chapters: Chapter[]
  interlude { text, card }
  lessons: { heading, body }[3]
  finalQuestion { label, title, options: { text, service, serviceHref, heading, body }[] }
  next { number, name, line, status }
  sources: { n, label, href }[]
  correctionLine
}
Chapter {
  id, label, title, lead, paragraphs (text with footnote refs)
  card { mode: draft | live | flipped | closed, day, state, caption, barTitle }
  decision? {
    label, question
    options: { key, text, answer }[3]
    didLabel, didTitle, didBody[]
    note, services: { name, href }[]
  }
}
```

When you reach the Sanity step: replace the old `sparkEpisode` block fields with this model, remove the old block and mechanic types from the schema, and delete the old Bó block data. The format page fields follow section 6. Keep `status` (`published` / `coming`) as it is.

## 5. SEO

- EN: `Bó: 156 days of a yellow card | The Last Day` / `A bank built a new bank inside itself. 156 days later it closed. The story, and the calls you would have made.`
- TR: `Bó: sarı kartın 156 günü | Son Gün` / `Bir banka kendi içinden yeni bir banka çıkardı. 156 gün sonra kapandı. Hikâyesi ve sizin vereceğiniz kararlar.`
- Format page EN: `The Last Day: stories of fintechs and banks that closed | fspark9`. TR: `Son Gün: kapanan fintech ve bankaların hikâyeleri | fspark9`.

## 6. English copy

Turkish copy is exactly as in the prototype. English below. No dashes anywhere in either language.

### Format page

- Label: Spark · 01
- Title: The Last Day
- Line: Stories of fintechs and banks that closed. In every episode, the key calls are yours.
- Button: First story: Bó
- How to read · A ten minute story. A few hard calls along the way.
  1. Read the story. A product's road from idea to last day, in short chapters.
  2. Make the call. At key moments we stop and ask: if the company were yours, what would you do? We talk it through based on your choice.
  3. Back to your own plan. Every episode ends with a few clear lessons you can use on your own product.
- Episodes: Bó · The digital bank that came out of a bank. United Kingdom. · Nº 01 · 156 days / Nuri · Formerly Bitwala. Germany. · Nº 02 · Coming next
- Close: Next step · If your story is just starting, let's talk. · Free 30 minute call. · Book a call

### Episode opening

- Label: The Last Day · Nº 01
- Title: A bank built a new bank inside itself.
- Sub: The card was yellow and portrait. The slogan was Do Money Better. It closed 156 days later.
- Invite: In this story, you are the one building the bank. At four key moments the call is yours. Decide first, then we will look at what happened.
- Button: Let's begin

Shared labels: "Show the other roads" · "Your pick · A" · "Road A" · "What Bó did" · "fspark9 note"

### Chapter 1 · Before launch · The idea

- Lead: In the UK, banking was moving onto the phone. New names like Monzo and Starling were the talk of the market.
- The RBS group, today's NatWest Group, was preparing its own answer: a digital bank with its own name, its own brand and its own app. It would be called Bó.
- This is where the first big question comes up. Before what the product will be, how it gets built.
- Label: You're building the bank
- Question: How would you build the new digital bank?
  - A · On the parent bank's licence, from inside the group. → The fast road. No waiting for a licence, the balance sheet and the trust are already there. But the parent's processes come in the box too: compliance, risk, approval chains. You gain speed and give up some agility.
  - B · Separate licence, separate company. From scratch. → A clean sheet. Your own culture, your own pace. The price is time: the licence process stretches the plan, launch day moves back, and the market doesn't wait.
  - C · Partner with, or buy, an existing fintech. → Possibly the fastest road. But you also buy someone else's product, tech debt and culture. Here, choosing the partner is everything.
- What Bó did · It took road A. · Bó ran on the parent bank's licence. It was built in the cloud and had its own Faster Payments connection. Development was reported at 18 months and a £100m budget.[1] · On 27 November 2019, after a beta period with staff, it opened to everyone.[1]
- Note: All three roads have good examples. What matters is which one fits your goal: speed, independence or a ready customer base? If that answer isn't written down before launch, the same debate reopens at the first hard moment.
- Services: Zero to Live · Partner selection

### Chapter 2 · Day 000 · The promise

- Lead: On launch day there's a bright yellow, portrait card in your hand. The promise is clear: Do Money Better.
- The aim is to help people who struggle to manage their money.[4] The app has real time spending alerts, a savings pot and free card use abroad.[5] There's no overdraft and no joint account.[1]
- In the same period, Monzo and Starling offer similar features in their apps.[5] The stage is crowded.
- Label: The promise is yours to write
- Question: You're entering a crowded market. How would you stand out?
  - A · Same features, a better experience. → Experience makes a difference, but it is also easy to copy. A rival catches up in the next release. On this road your speed matters as much as your product.
  - B · Pick a narrow, clear audience and solve their problem better than anyone. → You start small and go deep. A product that solves one group's problem best grows by word of mouth. The hard part is staying patient while the numbers look small in the first months.
  - C · Start with the parent bank's existing customers. → Your biggest card is already in your hand: trust and distribution. The hard part is managing two brands pulling at each other's customers.
- What Bó did · It went to the app stores as an app open to everyone. · On the App Store and Google Play, with its own brand and its own promise.[1]
- Note: In digital banking a feature list doesn't make the difference on its own. The difference is what the customer feels in the first week. The hard part of a strong promise is that a rival can say the same sentence. So behind the promise there has to be something others can't easily do.
- Services: Product & Strategy

### Chapter 3 · Day 037 · A line on the calendar

- Lead: 37 days after launch there's a date on the calendar: 3 January 2020.
- Europe's payments rule PSD2 and its strong customer authentication requirement reach cards too. Cards issued after this date meet the new requirements. Earlier ones don't.[2]
- So the card in the pocket of the first customers, the ones who believed in the product most, has to change.
- Label: This call is yours
- Question: Your first customers' cards have to change. How would you handle it?
  - A · Send the new card and switch off the old one on a set date. Clean and quick. → Operationally the simplest road. But from the customer's side, someone who just arrived is activating a second time before settling in. Every extra step is a door out.
  - B · Turn it into a moment. The new card arrives with a small surprise and a personal note. → Turning a required job into a relationship. It costs a bit more, but first customers are a brand's best ambassadors. This road can be how you win them.
  - C · Build the launch date around this line from the start. → The cheapest fix is always the one seen on the calendar in advance. Sometimes it means a few weeks' slip, sometimes no problem at all. What matters is having the date in the plan from day one.
- What Bó did · 6,000 cards were reissued. · Announced on 5 February 2020. Customers who opened accounts after 3 January already had a compliant card. The earlier cards were switched off on 14 March 2020.[2]
- Note: Reissuing cards looks like a plastic cost. The real price is paid on the customer side. Next to every launch plan there should be a compliance calendar: which rule changes which card, which flow, in the next twelve months? That conversation with card and payment partners happens before launch.
- Services: Compliance bridge · Partner management

### Interlude

The cards changed. The story goes on.

### Chapter 4 · Day 108 · Spring

- Lead: March 2020. The old cards are switched off, and the world changes overnight.
- The UK goes into lockdown on 23 March. The product isn't even four months old.
- Label: You're at the wheel
- Question: The product is 108 days old and everything is uncertain. What would you do?
  - A · Push harder. Everyone is at home, it's digital banking's moment. → Bold, and sometimes right. But pushing for growth in uncertainty is the road that burns the most budget on the hardest days. First you need to know which number proves what.
  - B · Slow down, cut costs, wait for the uncertainty to pass. → You gain cash and patience. The price is momentum: in a product that slows down, both the team and the customers can lose faith in the story.
  - C · Move the team and the technology to a bigger goal inside the group. → Protecting what was built along the way rather than the product itself. The team, the infrastructure, the learning. That's the biggest advantage of being inside a group.
- What happened · Day 156. 1 May 2020. · On the day NatWest Group announced its first quarter results, it also announced that Bó would close. It had 11,413 customers that day. Customers were given 60 days to move their money.[3] · The team moved to Mettle, the group's business banking app.[3] NatWest's then CEO Alison Rose told journalists that Bó had not failed and would be merged with Mettle.[5]
- Note: Closing is a decision too, and often the hardest one. In this story the team and the technology didn't disappear, they moved to another product. A team that writes down up front what happens if a given number isn't reached by a given date lives this moment with a plan, not in a panic.
- Services: Product & Strategy

### Chapter 5 · Day 156 · What 156 days leave behind

- Lead: The yellow card isn't in anyone's pocket anymore. But the decisions made in those 156 days are still in front of many teams today.
- 1 · The road comes before the product. Licence, structure and partner choice set the product's speed, cost and flexibility from day one.
- 2 · The promise has to be felt in the first week. In a crowded market customers don't compare features. They notice where they feel better.
- 3 · The calendar needs the rules' dates too. Read the launch plan and the compliance calendar together. Otherwise your most loyal customers walk through the door twice.

### Final question

- Label: One last question
- Title: So what's in front of you right now?
  - I'm building a fintech or digital bank from scratch. → Zero to Live · From idea to the first live product. · I work with your team from structure, licence and partner choice through to launch. The first decision in this story becomes our first week.
  - We're launching a new product at our bank or fintech. → Product & Strategy · A new product with a clear promise. · We write together who it's for, why, and how it stands out. Which number proves what, by which date, is part of the plan.
  - We want to offer a financial product to our customers under our own brand. → Embedded Finance · Your customers are already with you. · We place the financial product quietly inside your brand, with the right partner, the right flow and a business model that moves revenue.
  - We're expanding into a new market. → Expansion & GTM · New market, new rules. · Not everything that works at home works in a new market. We get the rules, the partners and the go to market plan clear before launch.
- Button: Book a call

### After

- Next: Nuri · Formerly Bitwala. A story from Germany. · Nº 02
- Sources label: This story is built from public reporting
  1. Finextra, launch report, and Wikipedia, Bó (bank)
  2. FinTech Futures, 5 February 2020
  3. TechCrunch, 1 May 2020
  4. Computer Weekly, May 2020
  5. Verdict, May 2020
  (Links exactly as in the prototype.)
- Correction line: If you spot an error, write to info@fspark9.com and we'll fix it and note the change.
- Close: Next step · If your story is just starting, let's build it together. · Free 30 minute call. · Book a call

### Home page Spark row (update)

- EN: The Last Day · Nº 01 · Bó · A bank built a new bank inside itself. 156 days later it closed.
- TR: Son Gün · Nº 01 · Bó · Bir banka kendi içinden yeni bir banka çıkardı. 156 gün sonra kapandı.

## 7. Checks before you hand back

1. Both routes render on the staging preview in `/en` and `/tr`. Verify on the Vercel preview URL, not only localhost.
2. 375, 768 and 1440 px: no horizontal scroll, no overlaps. Sticky rail from 1000 px, mini bar below.
3. Every decision works by keyboard, options expose `aria-pressed`, the reveal is announced politely.
4. Reduced motion: no transitions, no flip animation, card still changes state.
5. No localStorage, no new analytics events.
6. No console errors. Lighthouse accessibility 100 on the episode route.
7. No dashes in any copy you added.

## 8. Hand back

1. Preview URLs for both pages in both locales.
2. The list of deleted components, types and schema fields.
3. Anything in this prompt you think is wrong. Say it instead of working around it.

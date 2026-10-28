import Link from "next/link";
import HomeFaq from "@/components/home/HomeFaq";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import HomePageHero from "@/components/home/HomePageHero";
import { AccentHeading, BookButton, Section, focusRing, hpBookingBarButton } from "@/components/home/primitives";
import CaseStudySection, { sectionId } from "@/components/case-studies/CaseStudySection";
import MobileBookingBar from "@/components/ui/MobileBookingBar";
import { guideFaqItems, guideUpdated } from "@/lib/guides/saasCacLtv";

// /guides/saas-paid-search-cac-ltv (DESIGN.md §16.16): a long-form guide built
// from the case study body (sticky sidebar + numbered CaseStudySection + .hp-prose),
// opened by HomePageHero and a short-answer section, closed by FAQ and final CTA.
//
// Real figures come only from content/case-studies/*.mdx (linked where used).
// Everything in the worked example is illustrative and labelled as such.

const sections = [
  "Why clicks and cost per lead mislead",
  "The four numbers, defined",
  "Setting targets before launch",
  "Tracking from click to closed-won",
  "Bidding to pipeline value",
  "How I report it",
  "A worked example",
  "What this looks like in real accounts",
  "When the maths says not yet",
];

const shortAnswer = [
  {
    title: "CAC",
    body: "What paid search spends to win one paying customer, not one lead.",
  },
  {
    title: "LTV and LTV:CAC",
    body: "Gross margin a customer earns before they churn, and how many times over it covers their CAC.",
  },
  {
    title: "Payback period",
    body: "Months of gross margin needed to earn the acquisition cost back. This decides whether I scale.",
  },
  {
    title: "Pipeline quality",
    body: "For sales-led products: qualified opportunities and closed-won revenue, not raw form fills.",
  },
];

const linkClass = `font-medium text-hp-ink underline decoration-hp-line underline-offset-4 transition-colors hover:decoration-hp-ink ${focusRing}`;

function GuidePill() {
  return (
    <span className="flex items-center gap-2 rounded-full bg-white py-1.5 pr-3 pl-2.5 shadow-[0_0_0_1px_#e4e6ea,0_2px_6px_rgba(14,15,17,0.04)]">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-hp-accent" />
      <span className="font-hp text-sm/4.5 text-hp-body">
        <span className="font-medium text-hp-ink">Guide</span> · Updated {guideUpdated}
      </span>
    </span>
  );
}

function ShortAnswer() {
  return (
    <Section id="short-answer" labelledBy="short-answer-title" innerClassName="flex flex-col lg:flex-row">
      <div className="flex flex-col gap-5 px-5 pt-12 pb-7 sm:px-8 lg:w-105 lg:shrink-0 lg:border-r lg:border-hp-line lg:px-12 lg:pt-18 lg:pb-12">
        <AccentHeading id="short-answer-title" eyebrow="01 · The short answer" lead="Customers and payback," accent="not clicks or CPL." marker={0} />
        <p className="font-hp text-base/6.5 text-hp-body">
          I plan and judge SaaS paid search on CAC, LTV, LTV:CAC, payback period and pipeline quality. Before launch, I
          work back from your LTV and payback target to the most you can pay for a customer, a trial and a click.
          After launch, paid customers, revenue and pipeline stages go back into Google Ads, so it bids for buyers, and
          reports show payback by campaign.
        </p>
      </div>
      <dl className="flex-1 lg:py-18">
        {shortAnswer.map((item, index) => (
          <div
            key={item.title}
            className={`flex flex-col gap-1.5 border-t border-hp-line px-5 py-4.5 sm:px-8 lg:gap-2 lg:py-6 lg:pr-12 lg:pl-10 ${
              index === shortAnswer.length - 1 ? "lg:border-b" : ""
            }`}
          >
            <dt className="font-hp text-lg/6 font-medium tracking-[-0.02em] text-hp-ink lg:text-[21px]/6.75">{item.title}</dt>
            <dd className="font-hp text-[15px]/5.5 text-hp-soft lg:text-base/6">{item.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function Sidebar() {
  return (
    <aside className="hidden lg:block lg:w-85 lg:shrink-0 lg:border-r lg:border-hp-line">
      <div className="sticky top-16 flex flex-col gap-7 py-14 pr-10 pl-12">
        <nav aria-label="On this page" className="flex flex-col gap-1">
          <p className="pb-2.5 font-hp-mono text-xs/4 tracking-[0.08em] text-hp-fine uppercase">On this page</p>
          {sections.map((title, index) => (
            <a
              key={title}
              href={`#${sectionId(title)}`}
              className={`flex items-center gap-2.5 border-l-2 border-hp-line py-1.75 pl-3 font-hp text-[15px]/5 text-hp-body transition-colors hover:border-hp-accent hover:text-hp-ink ${focusRing}`}
            >
              <span className="font-hp-mono text-xs/4 text-hp-muted">{String(index + 1).padStart(2, "0")}</span>
              {title}
            </a>
          ))}
        </nav>
        <div data-booking-cta-zone className="flex flex-col gap-3.5 rounded-xl border border-hp-line bg-hp-band p-5">
          <div className="flex flex-col gap-1">
            <p className="font-hp text-[17px]/6 font-medium text-hp-ink">Want your numbers worked out?</p>
            <p className="font-hp text-sm/5.25 text-hp-body">
              15 minutes with me. Bring rough LTV, trial-to-paid and CPCs, and leave with a go or no-go.
            </p>
          </div>
          <BookButton size="none" className="w-full gap-2.25 rounded-[10px] px-4 py-2.75 text-base/5.5" />
        </div>
      </div>
    </aside>
  );
}

// A formula on its own line: mono, on the band surface. A div, not a p, so
// the unlayered `.hp-prose > p` styles don't override it.
function Formula({ children }) {
  return (
    <div className="rounded-xl border border-hp-line bg-hp-band px-4 py-3.5 font-hp-mono text-sm/6 text-hp-ink lg:px-5">
      {children}
    </div>
  );
}

function Note({ children }) {
  return (
    <div className="rounded-xl border border-dashed border-[#d5d8de] px-4 py-3.5 font-hp text-[15px]/6 text-hp-body lg:px-5">
      {children}
    </div>
  );
}

const exampleRows = [
  ["Average revenue per account", "$200 a month", "Input"],
  ["Gross margin", "80%", "Input"],
  ["Monthly churn", "3%", "Input"],
  ["LTV", "$5,333", "$200 × 80% ÷ 3%"],
  ["Max CAC at 3:1 LTV:CAC", "$1,778", "$5,333 ÷ 3"],
  ["Max CAC at 12-month payback", "$1,920", "$200 × 80% × 12"],
  ["Working CAC target", "$1,750", "The lower of the two, rounded down"],
  ["Trial to paid", "15%", "Input"],
  ["Max cost per trial", "$262", "$1,750 × 15%"],
  ["Click to trial", "5%", "Input"],
  ["Max average CPC", "$13", "$262 × 5%"],
];

function ExampleTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-hp-line">
      <table className="w-full min-w-120 border-collapse text-left font-hp">
        <caption className="border-b border-hp-line bg-hp-band px-4 py-3 text-left font-hp-mono text-xs/4 tracking-[0.08em] text-hp-fine uppercase lg:px-5">
          Illustrative example · not a client result
        </caption>
        <thead>
          <tr className="border-b border-hp-line">
            <th scope="col" className="px-4 py-3 text-sm/5 font-medium text-hp-ink lg:px-5">Step</th>
            <th scope="col" className="px-4 py-3 text-sm/5 font-medium text-hp-ink">Value</th>
            <th scope="col" className="px-4 py-3 text-sm/5 font-medium text-hp-ink lg:pr-5">How</th>
          </tr>
        </thead>
        <tbody>
          {exampleRows.map(([step, value, how]) => (
            <tr key={step} className="border-b border-hp-line last:border-b-0">
              <th scope="row" className="px-4 py-3 text-[15px]/5.5 font-normal text-hp-text lg:px-5">{step}</th>
              <td className="px-4 py-3 text-[15px]/5.5 font-medium text-hp-ink tabular-nums">{value}</td>
              <td className="px-4 py-3 font-hp-mono text-[13px]/5 text-hp-fine lg:pr-5">{how}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GuideBody() {
  const [whyClicks, definitions, targets, tracking, bidding, reporting, example, realAccounts, notYet] = sections;
  return (
    <Section label="Guide" innerClassName="flex">
      <Sidebar />
      <article
        aria-labelledby="hero-title"
        className="flex min-w-0 flex-1 flex-col gap-10 px-5 pt-9 pb-10 [counter-reset:case-section] sm:px-8 lg:gap-13 lg:pt-14 lg:pr-24 lg:pb-16 lg:pl-16"
      >
        <CaseStudySection title={whyClicks}>
          <p>
            Clicks, click-through rate and cost per lead are easy to move and easy to report. None of them tell you
            whether paid search is making the business money.
          </p>
          <p>
            A cheaper lead is only good news if it turns into a customer at the same rate. In SaaS it often doesn&apos;t:
            the cheapest sign-ups tend to come from students, job seekers and people looking for something free. If
            Google is told every sign-up is a win, it will find more of those, and cost per lead falls while cost per
            customer rises.
          </p>
          <p>
            So I keep clicks and CTR in the appendix. They&apos;re useful for diagnosing an account, not for judging it.
            The account is judged on what it costs to win a customer, what that customer is worth, and how long the
            money takes to come back.
          </p>
        </CaseStudySection>

        <CaseStudySection title={definitions}>
          <p>
            <strong>Paid CAC</strong> is what paid search cost, divided by the new paying customers it brought in. Use
            media spend for bidding targets. For board reporting, add management fees and tools to get a fully loaded
            figure, so the channel isn&apos;t flattered.
          </p>
          <Formula>Paid CAC = paid search cost ÷ new paying customers from paid search</Formula>
          <p>
            <strong>Blended CAC</strong> is all sales and marketing cost divided by all new customers, from every
            channel. It&apos;s the check on paid CAC: if paid CAC improves while blended CAC gets worse, paid search may
            be claiming customers who would have arrived anyway, usually through brand searches.
          </p>
          <Formula>Blended CAC = total sales and marketing cost ÷ all new paying customers</Formula>
          <p>
            <strong>LTV</strong> (lifetime value) is the gross margin a customer earns before they churn. Revenue alone
            overstates it, because hosting, support and payment fees come out of every dollar. Dividing by monthly
            churn gives the expected lifetime in months.
          </p>
          <Formula>LTV = ARPA per month × gross margin % ÷ monthly churn %</Formula>
          <p>
            <strong>LTV:CAC</strong> says how many times a customer repays their acquisition cost. 3:1 is the common
            benchmark for a healthy, scalable channel.
          </p>
          <Formula>LTV:CAC = LTV ÷ CAC</Formula>
          <p>
            <strong>Payback period</strong> is how many months of gross margin it takes to earn the CAC back. It&apos;s
            the number I use to decide whether to scale, because it captures cash as well as profit. A great ratio with
            a 30-month payback can still starve a company of cash.
          </p>
          <Formula>Payback (months) = CAC ÷ (ARPA per month × gross margin %)</Formula>
          <p>
            For annual plans, use the monthly equivalent of the contract, and remember cash arrives up front, which
            shortens real payback. For freemium and lifetime plans, measure cost per paid upgrade against what an
            upgrade is worth, rather than per sign-up.
          </p>
        </CaseStudySection>

        <CaseStudySection title={targets}>
          <p>
            Targets come before campaigns. Before we work together, I look at your sign-up to paid rate, customer
            lifetime value and target payback, and compare them with what clicks cost for your keywords. That shows
            what the campaigns need to hit to be profitable, and how realistic it is.
          </p>
          <ul>
            <li>
              <strong>1. Set a maximum CAC.</strong>
              Take the lower of LTV ÷ 3 and your payback ceiling (monthly gross margin × the months you&apos;re willing to
              wait). Many SaaS companies use 12 months; well-funded companies sometimes accept longer.
            </li>
            <li>
              <strong>2. Work back to cost per trial or demo.</strong>
              Multiply the maximum CAC by your trial-to-paid or demo-to-close rate. That&apos;s the most you can pay for
              each trial or demo.
            </li>
            <li>
              <strong>3. Work back to cost per click.</strong>
              Multiply the cost per trial by your click-to-trial rate. Compare that with real CPCs for your keywords.
              If the category costs well above it, paid search won&apos;t pay back on today&apos;s funnel, and I&apos;ll say
              so before you spend anything.
            </li>
            <li>
              <strong>4. Agree the targets in writing.</strong>
              Usually cost per trial or demo, cost per paying customer and months to payback. Reports are written
              against those same numbers.
            </li>
          </ul>
          <p>
            For Rezi, I agreed a breakeven cost per paid upgrade up front and only added budget once non-brand search
            converted consistently below it.{" "}
            <Link href="/results/rezi-case-study" className={linkClass}>
              Read the Rezi case study
            </Link>
            .
          </p>
        </CaseStudySection>

        <CaseStudySection title={tracking}>
          <p>
            None of this works unless Google Ads can see revenue. Most accounts I audit count every sign-up or form fill
            as a conversion, and stop there. The fix is to connect each click to what happened next.
          </p>
          <ul>
            <li>
              <strong>Capture the click ID.</strong>
              Store the GCLID (and UTM parameters) on the user or lead record at sign-up, so every later event can be
              matched back to the click that started it. The free{" "}
              <Link href="/tools/utm-builder" className={linkClass}>UTM builder</Link> and{" "}
              <Link href="/tools/datalayer-push-snippet-generator" className={linkClass}>dataLayer push generator</Link>{" "}
              help with the tagging side.
            </li>
            <li>
              <strong>Product-led: send trial, paid and MRR events.</strong>
              From your app or billing system (Stripe, for example), send trial started, first payment and its value
              back to Google Ads.
            </li>
            <li>
              <strong>Sales-led: import CRM stages as offline conversions.</strong>
              From a CRM such as HubSpot or Salesforce, upload MQL, SQL, opportunity and closed-won as separate
              conversion actions, each with a value, as the lead moves through the pipeline.
            </li>
            <li>
              <strong>Choose what Google bids to.</strong>
              Only the stage closest to revenue with enough volume is set as primary. The rest stay secondary, so they
              show in reports without steering bids.
            </li>
          </ul>
          <p>
            In one B2B SaaS account, passing the GCLID into user records and syncing funnel events back to the ad
            platforms is what made it possible to scale non-branded search on payback.{" "}
            <Link href="/results/b2b-saas-case-study" className={linkClass}>
              See the $3,664 new MRR case study
            </Link>
            .
          </p>
        </CaseStudySection>

        <CaseStudySection title={bidding}>
          <p>
            Once stages flow back, each one gets a value equal to what it&apos;s worth on average: the revenue it
            eventually produces, multiplied by how often it gets there. Google can then bid more for searches that lead
            to opportunities and less for those that only fill forms.
          </p>
          <Formula>Stage value = average first-year deal value × chance this stage becomes closed-won</Formula>
          <p>
            As an illustration only: with a $12,000 average annual contract, a 30% opportunity-to-won rate and a 50%
            SQL-to-opportunity rate, an opportunity is worth $3,600 and an SQL $1,800 to bid against.
          </p>
          <p>
            Early on there&apos;s rarely enough revenue data for automated bidding to learn from, so new accounts often
            start on manual bids and tight, high-intent keywords. Once paid-customer or pipeline conversions arrive
            steadily, I move to conversion-value bidding with a target that matches the CAC and payback agreed at the
            start.
          </p>
          <p>
            For a B2B communication SaaS, rating each new sign-up and uploading the rating to Google Ads let me see which
            keywords produced real business customers. After a few months of that data, cutting the keywords behind
            low-rated sign-ups took high-rated sign-ups from 82 to 175 in a month, with cost per sign-up down 55%.{" "}
            <Link href="/results/b2b-saas-leads" className={linkClass}>
              Read the pipeline quality case study
            </Link>
            .
          </p>
        </CaseStudySection>

        <CaseStudySection title={reporting}>
          <p>
            Reports lead with trials, demos, paid customers, new MRR and payback by campaign. Clicks and CTR are there if
            you want them.
          </p>
          <ul>
            <li>
              <strong>Brand and non-brand on separate lines.</strong>
              Brand clicks are cheap and convert well, so blending them in hides how everything else performs.
            </li>
            <li>
              <strong>Pipeline quality, not lead volume.</strong>
              For sales-led products: how many leads became SQLs and opportunities, and the cost of each stage, by
              campaign and keyword theme.
            </li>
            <li>
              <strong>Payback by cohort.</strong>
              Customers are grouped by the month they were acquired, and each cohort&apos;s gross margin is tracked
              against what it cost, month by month, until it has paid back. That shows whether recent spend is on
              track, even before it has paid back in full.
            </li>
            <li>
              <strong>Budget follows payback.</strong>
              Weekly search-term reviews, and budget moved toward the campaigns with the best payback.
            </li>
          </ul>
          <Note>[CONFIRM: that cohort payback tables are a standard part of client reporting, and how often they are sent.]</Note>
        </CaseStudySection>

        <CaseStudySection title={example}>
          <p>
            Here&apos;s the planning maths from start to finish, for a made-up product-led SaaS. The numbers are round
            and illustrative, not a client result.
          </p>
          <ExampleTable />
          <p>
            At $1,750, this customer pays back in about 11 months ($1,750 ÷ $160 of monthly gross margin) at an LTV:CAC
            of about 3:1. If the keywords that matter cost $8 to $12 a click, paid search has room to work. If they cost
            $25, it doesn&apos;t on today&apos;s funnel, and the fix is the trial-to-paid rate or pricing, not the ads.
          </p>
        </CaseStudySection>

        <CaseStudySection title={realAccounts}>
          <ul>
            <li>
              <strong>B2B AI SaaS, no free trial: 2.89-month payback.</strong>
              In 30 days the account produced 558 sign-ups and 42 paying customers (about 7.5% sign-up to paid),
              adding $2,219 in new MRR, 70% of it from non-branded keywords. Exact match, manual bidding and
              desktop-only targeting kept spend on ready-to-buy searches.{" "}
              <Link href="/results/ai-b2b-saas-case-study" className={linkClass}>Read the case study</Link>.
            </li>
            <li>
              <strong>Rezi, freemium: below breakeven every month.</strong>
              Bidding moved from sign-ups to paid Pro upgrades only. From April to September 2026, non-brand delivered
              687 paid upgrades, below the agreed breakeven every month and 20% under it on average.{" "}
              <Link href="/results/rezi-case-study" className={linkClass}>Read the case study</Link>.
            </li>
          </ul>
          <Note>
            [CONFIRM: how the 2.89-month payback was calculated (ad spend ÷ new MRR, or after gross margin), so the
            guide can state it.] [CLIENT RESULT: a sales-led account reported on SQLs, opportunities or closed-won
            revenue from offline conversion import, if one can be shared.]
          </Note>
          <p>
            <Link href="/results" className={linkClass}>See all client results</Link>.
          </p>
        </CaseStudySection>

        <CaseStudySection title={notYet}>
          <p>
            Sometimes the honest answer is that paid search won&apos;t pay back yet. It usually isn&apos;t the right first
            channel when:
          </p>
          <ul>
            <li>Nobody searches for your category yet, so there&apos;s no demand to capture.</li>
            <li>You&apos;re pre-revenue or still finding product-market fit, so LTV is a guess.</li>
            <li>You need the ad spend back inside the first month.</li>
            <li>You make less than about $20k MRR, so there isn&apos;t enough data for bidding to learn from.</li>
          </ul>
          <p>
            If it&apos;s a not-yet, I&apos;ll say so on the call and tell you what I&apos;d fix first.{" "}
            <Link href="/pricing" className={linkClass}>See pricing</Link>.
          </p>
        </CaseStudySection>
      </article>
    </Section>
  );
}

export default function SaasCacLtvGuide() {
  return (
    <>
      <main className="bg-white">
        <HomePageHero
          pill={<GuidePill />}
          lead="SaaS paid search, judged on"
          accent="CAC, LTV and payback."
          description="How I plan and evaluate Google Ads for SaaS companies: the formulas, the targets I set before launch, the tracking that ties clicks to revenue, and how I report it."
          showBooking
          secondaryLink={{ label: "See client results", href: "/results" }}
          underlineSeed="guide:cac-ltv"
        />
        <ShortAnswer />
        <GuideBody />
        <HomeFaq eyebrow="02 · FAQ" marker={1} lead="CAC and LTV questions" accent="from SaaS founders." items={guideFaqItems} />
        <HomeFinalCta
          lead="Want your targets worked out"
          accent="before you spend?"
          description="Book a call with rough numbers for LTV, trial-to-paid and ad spend. I'll tell you what paid search needs to hit, and whether it can."
          underlineSeed="guide:cac-ltv"
        />
      </main>
      <MobileBookingBar buttonProps={hpBookingBarButton} />
    </>
  );
}

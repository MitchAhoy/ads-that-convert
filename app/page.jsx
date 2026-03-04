import { CircleDollarSign, Eye, Layers3, LineChart, Microscope, ShieldCheck, Smartphone, TrendingUp, UsersRound } from "lucide-react";
import Hero from "@/components/sections/Hero";
import AsSeenInLogos from "@/components/sections/AsSeenInLogos";
import ClientLogos from "@/components/sections/ClientLogos";
import TestimonialSlider from "@/components/sections/TestimonialSlider";
import Testimonials from "@/components/sections/Testimonials";
import LeftRightFeature from "@/components/sections/LeftRightFeature";
import WhoIsThisFor from "@/components/sections/WhoIsThisFor";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CTABanner from "@/components/sections/CTABanner";

const resultsFirstPoints = [
  {
    text: "8+ years paid media experience across 85+ verticals.",
    Icon: ShieldCheck,
  },
  {
    text: "Seasoned with tens of millions of dollars in profitable ad spend.",
    Icon: CircleDollarSign,
  },
  {
    text: "Want a reference? Ask and I can connect you with current clients.",
    Icon: UsersRound,
  },
];

const oneThingPoints = [
  {
    text: "Laser-focused targeting aimed at prospects with urgent problems.",
    Icon: Smartphone,
  },
  {
    text: "Granular attribution tied directly to pipeline and sales.",
    Icon: Eye,
  },
  {
    text: "Frequent reporting that keeps campaign performance clear.",
    Icon: TrendingUp,
  },
];

const rinseRepeatPoints = [
  {
    text: "Methodical keyword research and campaign planning.",
    Icon: Microscope,
  },
  {
    text: "Meticulously crafted campaigns that deliver ready-to-buy leads.",
    Icon: Layers3,
  },
  {
    text: "Custom reporting that builds a feedback loop for iteration.",
    Icon: LineChart,
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <Testimonials />

      <LeftRightFeature
        title="Obsessed with results"
        description="A results-first agency. You will never hear noise about vanity engagement metrics, only sales and qualified lead performance."
        points={resultsFirstPoints}
        quote="We would highly recommend this team to any SaaS business serious about paid growth."
        person="Dave Batchelor"
        role="Co-Founder"
        company="DialMyCalls"
        companyLogoSrc="/client-logos/dialmycalls.png"
        companyLogoAlt="DialMyCalls logo"
        avatarSrc="/client pfp/dave batchelor.png"
        avatarAlt="Dave Batchelor"
        imageSrc="/left right 1.svg"
        imageAlt="Dashboard placeholder showing conversion funnel insights"
      />

      <LeftRightFeature
        reverse
        title="Really good at 1-thing"
        description="I do one thing extremely well: building world-class Google Ads campaigns for SaaS companies. Results only, no vanity metrics."
        points={oneThingPoints}
        quote="Working with Mitch from Ads That Convert has been a game-changer for our startup."
        person="Dominic Whyte"
        role="Founder"
        company="Fillout"
        companyLogoSrc="/client-logos/fillout.png"
        companyLogoAlt="Fillout logo"
        companyLogoClassName="h-8 sm:h-10"
        avatarSrc="/client pfp/dominic whyte.png"
        avatarAlt="Dominic Whyte"
        imageSrc="/left right 2.svg"
        imageAlt="Revenue by day and acquisition channel dashboard"
      />

      <LeftRightFeature
        title="A rinse-and-repeat system"
        description="I've done this so many times, there's no guess work. It's a matter of applying my tried and proven Google Ads system into your business."
        points={rinseRepeatPoints}
        quote="Mitch has been incredible to work with. Explained difficult concepts clearly and went above and beyond to make sure we were happy. Will definitely work with him again!"
        person="Matt Robinson"
        role="Co-Founder"
        company="Live Tourney"
        companyLogoSrc="/client-logos/livetourney.svg"
        companyLogoAlt="Live Tourney logo"
        avatarSrc="/client pfp/matt robinson.png"
        avatarAlt="Matt Robinson"
        imageSrc="/left right 3.svg"
        imageAlt="Sessions overview and statistics dashboard"
      />

      <WhoIsThisFor />
      <TestimonialSlider />
      <AsSeenInLogos />
      <FaqAccordion />
      <CTABanner />
    </>
  );
}

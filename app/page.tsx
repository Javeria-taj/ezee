import Navbar from "./components/Navbar";
import PaperGrain from "./components/PaperGrain";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import StatsBanner from "./components/StatsBanner";
import CitySection from "./components/CitySection";
import FeaturesSection from "./components/FeaturesSection";
import ComparisonSection from "./components/ComparisonSection";
import PartnerBannerSection from "./components/PartnerBannerSection";
import StoriesSection from "./components/StoriesSection";
import FaqSection from "./components/FaqSection";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";
import CursorGlow from "./components/CursorGlow";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <PaperGrain />
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <StatsBanner />
        <CitySection />
        <FeaturesSection />
        <ComparisonSection />
        <PartnerBannerSection />
        <StoriesSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

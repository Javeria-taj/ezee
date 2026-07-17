import Navbar from "./components/Navbar";
import PaperGrain from "./components/PaperGrain";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import CitySection from "./components/CitySection";
import FeaturesSection from "./components/FeaturesSection";
import PartnerBannerSection from "./components/PartnerBannerSection";
import StoriesSection from "./components/StoriesSection";
import FaqSection from "./components/FaqSection";
import CtaSection from "./components/CtaSection";

export default function Home() {
  return (
    <>
      <PaperGrain />
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <CitySection />
        <FeaturesSection />
        <PartnerBannerSection />
        <StoriesSection />
        <FaqSection />
        <CtaSection />
      </main>
    </>
  );
}

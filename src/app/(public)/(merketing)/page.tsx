import BackgroundDecoration from "@/components/shared/background-decoration";
import FinalCta from "@/features/home/components/final-cta";
import Hero from "@/features/home/components/hero";
import HowItWorks from "@/features/home/components/how-it-works";
import PlatformFeatures from "@/features/home/components/platform-features";
import WhyDevAssess from "@/features/home/components/why-dev-assess";

export default function HomePage() {
  return (
    <div className="relative min-h-svh overflow-hid">
      <BackgroundDecoration />
      <Hero />
      <HowItWorks />
      <PlatformFeatures/>
      <WhyDevAssess/>
      <FinalCta/>
    </div>
  );
}

import BackgroundDecoration from "@/components/shared/background-decoration";
import Hero from "@/features/home/components/hero";
import HowItWorks from "@/features/home/components/how-it-works";
import PlatformFeatures from "@/features/home/components/platform-features";

export default function HomePage() {
  return (
    <div className="relative min-h-svh overflow-hid">
      <BackgroundDecoration />
      <Hero />
      <HowItWorks />
      <PlatformFeatures/>
    </div>
  );
}

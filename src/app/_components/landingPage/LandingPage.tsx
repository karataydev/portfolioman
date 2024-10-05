import Header from "./Header";
import MainSection from "./MainSection";
import FeaturesSection from "./FeaturesSection";
import LogInSection from "./LogInSection";
import PremiumFeaturesSection from "./PremiumFeaturesSection";
import { useRef, useCallback } from "react";

export default function LandingPage({
  loginAction,
  signupAction,
}: {
  loginAction: () => void;
  signupAction: () => void;
}) {
  const loginSectionRef = useRef<HTMLDivElement>(null);
  const featuresSectionRef = useRef<HTMLDivElement>(null);
  const scrollToMiddle = useCallback((ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const elementRect = ref.current.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.scrollY;
      const middle =
        absoluteElementTop - window.innerHeight / 2 + elementRect.height / 2;
      window.scrollTo({
        top: middle,
        behavior: "smooth",
      });
    }
  }, []);

  const scrollToLogin = () => scrollToMiddle(loginSectionRef);
  const scrollToFeatures = () => scrollToMiddle(featuresSectionRef);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header loginAction={loginAction} signupAction={signupAction} />
      <main className="flex-1">
        <MainSection
          scrollToLogin={scrollToLogin}
          scrollToFeatures={scrollToFeatures}
        />
        <div ref={featuresSectionRef}>
          <FeaturesSection />
        </div>
        <div ref={loginSectionRef}>
          <LogInSection loginAction={loginAction} signupAction={signupAction} />
        </div>
        <PremiumFeaturesSection />
      </main>
    </div>
  );
}

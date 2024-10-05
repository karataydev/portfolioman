import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

export default function MainSection({
  scrollToLogin,
  scrollToFeatures,
}: {
  scrollToLogin: () => void;
  scrollToFeatures: () => void;
}) {
  const handleGetStarted = () => {
    scrollToLogin();
  };

  const handleLearnMore = () => {
    scrollToFeatures();
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <TrendingUp className="w-full h-full text-accentc" />
      </div>
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accentc">
              Invest Smarter, Grow Faster
            </h1>
            <p className="mx-auto max-w-[700px] text-foreground-secondary md:text-xl">
              Create, analyze, and optimize your investment portfolios with
              PortfolioMan. Your personal finance companion for a brighter
              financial future.
            </p>
          </div>
          <div className="space-x-4">
            <Button
              className="bg-primary text-foreground hover:bg-accentc"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
            <Button
              variant="third"
              className="border-primary text-primary hover:bg-secondarybackground"
              onClick={handleLearnMore}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

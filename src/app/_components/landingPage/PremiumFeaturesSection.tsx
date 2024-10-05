import { Lock, Rocket, Sparkles } from "lucide-react";

export default function PremiumFeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondarybackground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Premium Features Coming Soon
            </h2>
            <p className="mx-auto max-w-[600px] text-foreground-secondary md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We&apos;re working on exciting new features to enhance your
              PortfolioMan experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center space-y-2 p-6 bg-third rounded-lg transition-all duration-300 transform hover:scale-105">
              <Rocket className="h-12 w-12 text-accentc" />
              <span className="text-lg font-medium">In-App Investing</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-6 bg-third rounded-lg transition-all duration-300 transform hover:scale-105">
              <Sparkles className="h-12 w-12 text-accentc" />
              <span className="text-lg font-medium">
                AI-Powered Insights
              </span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-6 bg-third rounded-lg transition-all duration-300 transform hover:scale-105">
              <Lock className="h-12 w-12 text-accentc" />
              <span className="text-lg font-medium">
                Real-Time Market Data
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}






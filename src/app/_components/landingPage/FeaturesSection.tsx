import { ChartPie, Calculator, Share2 } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondarybackground">
      <div className="container px-4 mx-auto md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-3 text-center group hover:bg-third p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
            <ChartPie className="h-12 w-12 text-accentc group-hover:animate-spin-slow" />
            <h2 className="text-xl font-bold">Create Custom Portfolios</h2>
            <p className="text-sm text-foreground-secondary">
              Build and manage your own investment funds tailored to your
              financial goals.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-3 text-center group hover:bg-third p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
            <Calculator className="h-12 w-12 text-accentc group-hover:animate-bounce" />
            <h2 className="text-xl font-bold">Investment Calculator</h2>
            <p className="text-sm text-foreground-secondary">
              Analyze potential returns and risks with our advanced investment
              calculator.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-3 text-center group hover:bg-third p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
            <Share2 className="h-12 w-12 text-accentc group-hover:animate-pulse" />
            <h2 className="text-xl font-bold">Portfolio Sharing</h2>
            <p className="text-sm text-foreground-secondary">
              Coming soon: Share your successful portfolios with the
              PortfolioMan community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

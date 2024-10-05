import GeneralHeader from "../_components/GeneralHeader";
import { ChartPie, Shield, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <GeneralHeader> </GeneralHeader>
      <div className="container mx-auto px-4 py-8 max-w-4xl bg-background text-foreground my-2">
        <h1 className="text-3xl font-bold text-center mb-8">
          About PortfolioMan
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-foreground-secondary mb-4">
            At PortfolioMan, our mission is to empower individuals to take
            control of their financial future. We believe that everyone should
            have access to powerful tools for managing and optimizing their
            investment portfolios, regardless of their level of financial
            expertise.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <ChartPie className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Portfolio Management
              </h3>
              <p className="text-foreground-secondary">
                Create, track, and optimize your investment portfolios with
                ease.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Risk Analysis</h3>
              <p className="text-foreground-secondary">
                Understand and manage your portfolio's risk with advanced
                analytics.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Insights</h3>
              <p className="text-foreground-secondary">
                Learn from and share strategies with our community of investors.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-foreground-secondary mb-4">
            PortfolioMan was founded in 2023 by a team of finance professionals
            and tech enthusiasts. Frustrated by the lack of user-friendly and
            comprehensive portfolio management tools, we set out to create a
            platform that combines powerful features with an intuitive
            interface.
          </p>
          <p className="text-foreground-secondary">
            Today, PortfolioMan serves thousands of users worldwide, from
            beginner investors to seasoned professionals. We're constantly
            evolving and improving our platform based on user feedback and the
            latest developments in finance and technology.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
          <p className="text-foreground-secondary mb-4">
            We are committed to providing a secure, reliable, and innovative
            platform for our users. Our team works tirelessly to ensure that
            PortfolioMan remains at the forefront of portfolio management
            technology, always striving to deliver the best possible experience
            for our community of investors.
          </p>
          <p className="text-foreground-secondary">
            Thank you for choosing PortfolioMan. We're excited to be part of
            your investment journey and look forward to helping you achieve your
            financial goals.
          </p>
        </section>
      </div>
    </>
  );
}

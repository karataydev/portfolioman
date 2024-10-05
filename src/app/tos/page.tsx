import GeneralHeader from "../_components/GeneralHeader";

export default function TermsOfServicePage() {
  return (
    <>
      <GeneralHeader> </GeneralHeader>
      <div className="container mx-auto px-4 py-8 max-w-4xl bg-background text-foreground my-2">
        <h1 className="text-3xl font-bold text-center mb-8">
          Terms of Service
        </h1>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-foreground-secondary">
              By accessing and using PortfolioMan, you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
            <p className="text-foreground-secondary">
              You agree to use PortfolioMan only for purposes that are legal,
              proper and in accordance with these Terms and any applicable laws
              or regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Account</h2>
            <p className="text-foreground-secondary">
              To use certain features of PortfolioMan, you may be required to
              create a user account. You are responsible for maintaining the
              confidentiality of your account information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Privacy Policy</h2>
            <p className="text-foreground-secondary">
              Your use of PortfolioMan is also governed by our Privacy Policy,
              which can be found [link to privacy policy].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              5. Limitations of Liability
            </h2>
            <p className="text-foreground-secondary">
              PortfolioMan and its affiliates shall not be liable for any
              indirect, incidental, special, consequential or punitive damages
              resulting from your use of or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
            <p className="text-foreground-secondary">
              We reserve the right to modify these Terms at any time. We will
              always post the most current version on our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              7. Contact Information
            </h2>
            <p className="text-foreground-secondary">
              If you have any questions about these Terms, please contact us at
              [contact email].
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

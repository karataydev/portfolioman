import GeneralHeader from "../_components/GeneralHeader";

export default function PrivacyPage() {
  return (
    <>
      <GeneralHeader> </GeneralHeader>
      <div className="container mx-auto px-4 py-8 max-w-4xl bg-background text-foreground my-2">
        <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              1. Information We Collect
            </h2>
            <p className="text-foreground-secondary">
              We collect information you provide directly to us, such as when
              you create an account, use our services, or communicate with us.
              This may include your name, email address, and financial
              information related to your portfolios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-foreground-secondary">
              We use the information we collect to provide, maintain, and
              improve our services, to process your transactions, to send you
              technical notices and support messages, and to communicate with
              you about products, services, offers, and events.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. Information Sharing and Disclosure
            </h2>
            <p className="text-foreground-secondary">
              We do not share your personal information with third parties
              except as described in this policy. We may share your information
              with third-party vendors, consultants, and other service providers
              who need access to such information to carry out work on our
              behalf.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p className="text-foreground-secondary">
              We use reasonable measures to help protect information about you
              from loss, theft, misuse and unauthorized access, disclosure,
              alteration and destruction. However, no internet or email
              transmission is ever fully secure or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Your Choices</h2>
            <p className="text-foreground-secondary">
              You may update, correct, or delete your account information at any
              time by logging into your online account or by contacting us. You
              may also opt out of receiving promotional communications from us
              by following the instructions in those messages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              6. Changes to this Policy
            </h2>
            <p className="text-foreground-secondary">
              We may change this privacy policy from time to time. If we make
              changes, we will notify you by revising the date at the top of the
              policy and, in some cases, we may provide you with additional
              notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p className="text-foreground-secondary">
              If you have any questions about this privacy policy, please
              contact us at: [Your Contact Email]
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export default function LogInSection({
  loginAction,
  signupAction,
}: {
  loginAction: () => void;
  signupAction: () => void;
}) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Join PortfolioMan Today
            </h2>
            <p className="mx-auto max-w-[600px] text-foreground-secondary md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Start your journey to smarter investing. Sign in now and take
              control of your financial future.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <Button
              onClick={loginAction}
              className="w-full bg-primary text-foreground hover:bg-accentc flex items-center justify-center"
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              Sign In with Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-second" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-second">Or</span>
              </div>
            </div>
            <Button
              onClick={signupAction}
              variant="third"
              className="w-full border-primary text-primary hover:bg-secondarybackground flex items-center justify-center"
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              Sign Up with Google
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

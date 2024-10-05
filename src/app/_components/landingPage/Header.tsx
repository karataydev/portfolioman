import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChartPie, Menu } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Header({
  loginAction,
  signupAction,
}: {
  loginAction: () => void;
  signupAction: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const NavItems = () => (
    <>
      <Link
        className={`text-sm font-medium hover:text-accentc
          transition-colors ${isOpen ? "w-full text-center " : ""}`}
        href="#"
        onClick={() => setIsOpen(false)}
      >
        Features
      </Link>
      <Link
        className={`text-sm font-medium hover:text-accentc
          transition-colors ${isOpen ? "w-full text-center " : ""}`}
        href="#"
        onClick={() => setIsOpen(false)}
      >
        Pricing
      </Link>
      <Link
        className={`text-sm font-medium hover:text-accentc
          transition-colors ${isOpen ? "w-full text-center " : ""}`}
        href="/about"
        onClick={() => setIsOpen(false)}
      >
        About
      </Link>
      <Button
        onClick={() => {
          loginAction();
          setIsOpen(false);
        }}
        variant="ghost"
        className={`text-sm font-medium hover:text-accentc
          transition-colors ${isOpen ? "w-full" : ""}`}
      >
        <FcGoogle className="w-3 h-3 mr-2" />
        Sign In
      </Button>
      <Button
        onClick={() => {
          signupAction();
          setIsOpen(false);
        }}
        className={`bg-primary font-medium text-sm
          text-foreground hover:bg-accentc py-2 ${isOpen ? "w-full" : ""}`}
      >
        <FcGoogle className="w-3 h-3 mr-2" />
        Sign Up
      </Button>
    </>
  );

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-secondarybackground">
      <Link className="flex items-center justify-center" href="#">
        <ChartPie className="h-8 w-8 mr-2 text-primary" />
        <span className="font-bold text-xl">PortfolioMan</span>
      </Link>
      <nav className="ml-auto hidden md:flex items-center gap-4 sm:gap-6">
        <NavItems />
      </nav>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild className="md:hidden ml-auto">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <nav className="flex flex-col items-center gap-4">
            <NavItems />
          </nav>
        </DialogContent>
      </Dialog>
    </header>
  );
}

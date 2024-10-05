import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pb-20 flex text-second flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-secondarybackground">
      <p className="text-xs text-second">
        © 2024 PortfolioMan. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-xs hover:text-accentc transition-colors"
          href="/tos"
        >
          Terms of Service
        </Link>
        <Link
          className="text-xs hover:text-accentc transition-colors"
          href="/privacy"
        >
          Privacy
        </Link>
      </nav>
    </footer>
  );
}

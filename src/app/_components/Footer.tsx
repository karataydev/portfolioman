"use client";
import Link from "next/link";
import { useMediaQuery } from "@react-hook/media-query";

export default function Footer() {
  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <footer className="flex text-second flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-secondarybackground">
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
      {!isLargeScreen && <div className="h-12 w-10"></div>}
    </>
  );
}

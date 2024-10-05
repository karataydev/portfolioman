import Link from "next/link";
import { ChartPie } from "lucide-react";

export default function GeneralHeader({
  className,
  children,
}: {
  className: string | undefined;
  children: React.ReactNode | undefined;
}) {
  return (
    <header
      className={
        "px-4 lg:px-6 h-16 flex items-center border-b border-secondarybackground " +
        className
      }
    >
      <Link className="flex items-center justify-center" href="/">
        <ChartPie className="h-8 w-8 mr-2 text-primary" />
        <span className="font-bold text-xl">PortfolioMan</span>
      </Link>
      {children}
    </header>
  );
}

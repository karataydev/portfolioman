import { LoginResponse } from "../googleAuthData";
import {
  Home,
  Search,
  Bell,
  User,
  Plus,
  TrendingUp,
  TrendingDown,
  Rocket,
  Star,
  BadgeDollarSign,
  ShoppingBasket,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import GeneralHeader from "../GeneralHeader";
import PortfolioScrollArea from "./PortfolioScrollArea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { fetchData, PortfolioListResponse } from "./homePageData";

export default function HomePage({
  loginDetails,
  logoutAction,
}: {
  loginDetails: LoginResponse;
  logoutAction: () => void;
}) {
  const [portfolios, setPortfolios] = useState<PortfolioListResponse[]>([
    { name: "Tech Stocks", amount: 50000.12, change: 1.2 },
    { name: "Green Energy", amount: 30000, change: -0.8 },
    { name: "Crypto Mix", amount: 20000, change: 5.5 },
    { name: "Blue Chips", amount: 40000, change: 0.3 },
    { name: "Emerging Markets", amount: 15000, change: -1.5 },
  ]);

  const [followedPortfolios, setFollowedPortfolios] = useState<
    PortfolioListResponse[]
  >([
    {
      name: "Dividend Kings",
      amount: 75000,
      change: -0.5,
      owner: "@investor_pro",
    },
    {
      name: "Growth Rockets",
      amount: 100000,
      change: 2.1,
      owner: "@tech_guru",
    },
    { name: "Value Picks", change: 0.7, owner: "@value_hunter" },
    { name: "Index Plus", amount: 200000, change: 0.9, owner: "@index_master" },
    {
      name: "Small Caps",
      amount: 40000,
      change: -1.2,
      owner: "@small_cap_fan",
    },
  ]);

  const [marketOverview, setMarketOverview] = useState<PortfolioListResponse[]>(
    [
      { name: "S&P 500", amount: 4185.81, change: 0.98 },
      { name: "Nasdaq", amount: 12888.28, change: 1.3 },
      { name: "Dow Jones", amount: 33875.4, change: 0.8 },
      { name: "Bitcoin", amount: 39123.45, change: -2.15 },
      { name: "Gold", amount: 1892.5, change: 0.25 },
      { name: "Crude Oil", amount: 75.23, change: -1.05 },
    ],
  );

  const totalPortfolioValue = portfolios.reduce(
    (sum, portfolio) => sum + portfolio.amount,
    0,
  );
  const totalPercentageChange = portfolios.reduce(
    (sum, portfolio) => sum + (portfolio.amount * portfolio.change) / 100,
    0,
  );
  const overallPercentageChange =
    (totalPercentageChange / totalPortfolioValue) * 100;

  useEffect(() => {
    fetchData(setPortfolios, setFollowedPortfolios, setMarketOverview);
  }, []);

  return (
    <>
      <main className="flex-grow p-4 space-y-6 pb-16">
        {/* Quick Overview */}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-1">Total Portfolio Value</h2>
          <p className="font-semibold text-2xl text-foreground tracking-wider">
            ${totalPortfolioValue.toFixed(2)}
          </p>

          <div
            className={`flex items-center mt-1 ${overallPercentageChange >= 0 ? "text-accentc" : "text-second"}`}
          >
            {overallPercentageChange >= 0 ? (
              <TrendingUp size={16} className="mr-1" />
            ) : (
              <TrendingDown size={16} className="mr-1" />
            )}
            <span>{overallPercentageChange.toFixed(2)}% today</span>
          </div>
        </div>

        {/* User's Portfolios */}
        <section>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-wrap">
              <span className="flex">
                <Rocket className="h-5 w-5 text-accentc mr-2" /> Your Portfolios{" "}
              </span>
            </h2>
            <Button className="px-4 md:px-8 md:py-4">
              <Plus size={16} className="mr-1" />
              New
            </Button>
          </div>
          <PortfolioScrollArea
            emptyMessage="Create your own portfolio using new button to start investing."
            portfolios={portfolios}
          />
        </section>

        {/* Followed Portfolios */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            <span className="flex">
              <Star className="h-5 w-5 text-accentc mr-2" />
              Followed Portfolios{" "}
            </span>
          </h2>
          <PortfolioScrollArea
            emptyMessage="Go to explore tab to follow portfolios."
            portfolios={followedPortfolios}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            <span className="flex">
              <ShoppingBasket className="h-5 w-5 text-accentc mr-2" />
              Market Overview{" "}
            </span>
          </h2>
          <PortfolioScrollArea
            emptyMessage="Market overview will be here."
            portfolios={marketOverview}
          />
        </section>
      </main>
    </>
  );
}

import { LoginResponse } from "../googleAuthData";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Rocket,
  Star,
  ShoppingBasket,
} from "lucide-react";
import PortfolioScrollArea from "./PortfolioScrollArea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { fetchData, newPortfolio, PortfolioListResponse } from "./homePageData";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  PortfolioDialog,
  PortfolioRequest,
} from "../portfolio/PortfolioDialog";

export default function HomePage({
  loginDetails,
  logoutAction,
}: {
  loginDetails: LoginResponse;
  logoutAction: () => void;
}) {
  const [portfolios, setPortfolios] = useState<PortfolioListResponse[]>([]);

  const [followedPortfolios, setFollowedPortfolios] = useState<
    PortfolioListResponse[]
  >([]);

  const [marketOverview, setMarketOverview] = useState<PortfolioListResponse[]>(
    [],
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNewPortfolio = (req: PortfolioRequest) => {
    newPortfolio(req);
  };

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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="px-4 md:px-8 md:py-4">
                  <Plus size={16} className="mr-1" />
                  New
                </Button>
              </DialogTrigger>
              <PortfolioDialog
                isEdit={false}
                handleAccept={handleNewPortfolio}
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
              />
            </Dialog>
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

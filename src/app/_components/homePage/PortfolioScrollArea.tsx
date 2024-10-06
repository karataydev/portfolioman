import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { PortfolioListResponse } from "./homePageData";

export default function PortfolioScrollArea({
  portfolios,
  emptyMessage,
}: {
  portfolios: PortfolioListResponse[];
  emptyMessage: string;
}) {
  return (
    <ScrollArea className="w-full whitespace-nowrap ">
      <div className="flex w-max space-x-4 p-1">
        {portfolios.length === 0 ? (
          <Card className="w-[150px] h-[150px] bg-secondarybackground border-0">
            <CardContent className="text-foreground p-4 flex  h-full">
              <p className="text-second w-full text-wrap">{emptyMessage}</p>
            </CardContent>
          </Card>
        ) : (
          portfolios.map((portfolio, index) => (
            <Card
              key={index}
              className="w-[150px] h-[150px] bg-secondarybackground border-0 cursor-pointer transition-shadow hover:shadow-md"
            >
              <CardContent
                className="text-foreground p-4 flex flex-col justify-between h-full"
                onClick={() =>
                  (window.location.href = `/portfolio/${portfolio.id}`)
                }
              >
                <div>
                  <h3 className="font-semibold w-full text-wrap">
                    {portfolio.name}
                  </h3>{" "}
                  <p className="text-xs text-second">{portfolio.owner}</p>{" "}
                </div>
                <div>
                  <p className="font-bold text-nowrap">
                    <span
                      className={`text-sm text-nowrap flex flex-row ${portfolio.change >= 0 ? "text-accentc" : "text-second"}`}
                    >
                      {portfolio.change >= 0 ? (
                        <TrendingUp size={16} className="mr-1" />
                      ) : (
                        <TrendingDown size={16} className="mr-1" />
                      )}
                      {portfolio.change.toFixed(2)}%
                    </span>
                    {portfolio.amount &&
                      "$" + portfolio.amount.toFixed(2).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

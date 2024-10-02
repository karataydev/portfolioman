import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState, useMemo, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Portfolio } from "../../page";
import {
  AllocationsData,
  Asset,
  calculateTotalPortfolioValue,
  getAllocationsData,
} from "./allocationsData";
import { PieChartComponent } from "./PieChartComponent";
import { ScrollableAssetList } from "./ScrollableAssetList";
import { formatCurrency } from "@/lib/utils";
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/solid";

export function ToggledAllocationsCard({
  portfolio,
}: {
  portfolio: Portfolio | undefined;
}) {
  const [isCurrentAllocation, setIsCurrentAllocation] = useState(false);
  const [allocations, setAllocations] = useState<AllocationsData>();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (portfolio) setAllocations(getAllocationsData(portfolio));
  }, [portfolio]);

  useEffect(() => {
    if (allocations)
      setAssets(isCurrentAllocation ? allocations.current : allocations.target);
  }, [isCurrentAllocation, allocations]);

  const getData = useMemo(
    () => (activeIndex !== undefined ? assets[activeIndex] : null),
    [activeIndex, assets],
  );

  const totalPortfolioValue = useMemo(
    () => calculateTotalPortfolioValue(allocations?.current || []),
    [allocations],
  );

  const totalUnrealizedPL = useMemo(
    () =>
      allocations?.current.reduce(
        (sum, asset) => sum + (asset.unrealized_pl || 0),
        0,
      ) || 0,
    [allocations],
  );

  const handlePieScroll = (index: number) => {
    setActiveIndex(index);
    if (scrollAreaRef.current) {
      const element = scrollAreaRef.current.querySelector(
        `[data-index="${index}"]`,
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  };

  return (
    <div className="w-full bg-background">
      <div className="w-full flex flex-col px-4 py-4">
        <h2 className="text-xl font-semibold mb-2">Portfolio Value</h2>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className="font-semibold text-2xl text-foreground tracking-wider">
              ${formatCurrency(totalPortfolioValue)}
            </div>

            <div className="text-sm text-second">
              P/L:{" "}
              <span
                className={
                  (totalUnrealizedPL >= 0
                    ? "text-green-800 "
                    : "text-red-900 ") + "text-sm"
                }
              >
                {totalUnrealizedPL >= 0 ? (
                  <ArrowUpRightIcon className="inline-block w-3 h-3 mr-1 font-black" />
                ) : (
                  <ArrowDownRightIcon className="inline-block w-5 h-5 mr-1 font-bold" />
                )}
              </span>
              ${formatCurrency(totalUnrealizedPL)}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Label
              htmlFor="allocation-toggle"
              className="text-sm font-medium w-10"
            >
              {isCurrentAllocation ? "Current" : "Target"}
            </Label>
            <Switch
              id="allocation-toggle"
              checked={isCurrentAllocation}
              onCheckedChange={setIsCurrentAllocation}
            />
          </div>
        </div>
        <p className="text-sm text-second mt-1">
          {isCurrentAllocation
            ? "Showing current allocation of your portfolio"
            : "Showing target allocation for your portfolio"}
        </p>
      </div>
      <Card className="w-full text-foreground text-sm pt-1 bg-backgroundroot border-0">
        <CardContent>
          <div className="md:flex">
            <PieChartComponent
              assets={assets}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              handlePieScroll={handlePieScroll}
              getData={getData}
            />
            <div className="md:flex-1 mt-4 md:mt-0 md:ml-4">
              <ScrollableAssetList
                assets={assets}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                scrollAreaRef={scrollAreaRef}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

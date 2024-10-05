"use client";

import { useState, useMemo, useEffect } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  Line,
  Tooltip,
} from "recharts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  ArrowUpRightIcon,
  ArrowDownRightIcon,
} from "@heroicons/react/24/solid";
import { Loader2, TrendingDown, TrendingUp } from "lucide-react"; // Import the loading spinner
import * as chartData from "./chartData";
import { renderChartLines } from "./chartLine";
import { calculatePercentage } from "@/lib/utils";
import { ChartCustomContent } from "./ChartCustomContent";

export function InvestmentGrowthChart({
  portfolioSymbol,
  selectedComparedAsset,
}: {
  portfolioSymbol: string | undefined;
  selectedComparedAsset: string | null;
}) {
  const initialValue = 1000;
  const [selectedPeriod, setSelectedPeriod] = useState<string>("week");
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [selectedComparedPrice, setSelectedComparedPrice] = useState<
    number | null
  >(null);
  const [response, setResponse] =
    useState<chartData.InvestmentGrowthChartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const data = useMemo(() => {
    return chartData.selectData(selectedPeriod, response);
  }, [selectedPeriod, response]);

  useEffect(() => {
    if (portfolioSymbol) {
      setIsLoading(true);
      chartData
        .fetchInvestmentGrowth(portfolioSymbol)
        .then(setResponse)
        .finally(() => setIsLoading(false));
    }
  }, [portfolioSymbol]);

  const latestPrice = useMemo(
    () => data[data?.length - 1]?.value || 1000,
    [data],
  );

  const { minValue, maxValue } = useMemo(() => {
    const values = data.map((d) => d.value);
    return {
      minValue: Math.min(...values),
      maxValue: Math.max(...values),
    };
  }, [data]);

  const yAxisDomain = useMemo(() => {
    const padding = (maxValue - minValue) * 0.1; // 10% padding
    return [Math.max(0, minValue - padding), maxValue + padding];
  }, [minValue, maxValue]);

  const isUp = () => {
    return (
      (selectedPrice !== null && selectedPrice >= initialValue) ||
      (!selectedPrice && latestPrice && latestPrice >= initialValue)
    );
  };

  const [comparisonData, setComparisonData] =
    useState<chartData.InvestmentGrowthChartResponse | null>(null);

  useEffect(() => {
    if (selectedComparedAsset)
      chartData
        .fetchInvestmentGrowth(selectedComparedAsset)
        .then(setComparisonData);
  }, [selectedComparedAsset]);

  const compareData = useMemo(() => {
    return chartData.selectData(selectedPeriod, comparisonData);
  }, [selectedPeriod, comparisonData]);

  const latestComparisonPrice = useMemo(
    () => compareData[compareData?.length - 1]?.value || 1000,
    [compareData],
  );

  const allData = useMemo(() => {
    const mainData = data.map((d) => ({ ...d, main: d.value }));
    compareData.forEach((point, index) => {
      if (index < mainData.length) {
        mainData[index] = { ...mainData[index], compared: point.value };
      }
    });
    return mainData;
  }, [data, compareData]);

  return (
    <div className="w-full space-y-4 relative">
      <div className="text-center font-light text-sm mb-2">
        {chartData.getDescription(selectedPeriod)}
      </div>
      <div className="h-64 relative">
        <div className="absolute top-0 left-0 p-2 bg-background bg-opacity-75 rounded font-semibold text-lg text-foreground tracking-wider">
          <div className="flex items-center">
            <span>
              $
              {selectedPrice !== null
                ? selectedPrice.toFixed(2)
                : latestPrice.toFixed(2)}{" "}
            </span>
            <span
              className={
                (isUp() ? "text-accentc " : "text-second ") +
                "ml-1 text-sm flex items-center"
              }
            >
              {isUp() ? (
                <TrendingUp className="mr-1 w-5 h-5 text-accentc" />
              ) : (
                <TrendingDown className="mr-1 w-5 h-5 text-second" />
              )}
              {selectedPrice !== null
                ? calculatePercentage(selectedPrice, initialValue).toFixed(2)
                : calculatePercentage(latestPrice, initialValue).toFixed(2)}
              %
            </span>
          </div>
          {selectedComparedAsset && (
            <p className="text-sm mt-1 text-start text-second tracking-normal font-normal">
              Compared: $
              {selectedComparedPrice !== null
                ? selectedComparedPrice.toFixed(2)
                : latestComparisonPrice.toFixed(2)}
            </p>
          )}
        </div>
        <ResponsiveContainer width="100%" height="100%">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <LineChart
              data={allData}
              margin={{ top: 90, right: 5, left: 5, bottom: 5 }}
              onMouseMove={(e) => {
                if (e.activePayload) {
                  setSelectedPrice(e.activePayload[0].payload.main);
                  setSelectedComparedPrice(e.activePayload[0].payload.compared);
                }
              }}
              onMouseLeave={() => {
                setSelectedPrice(null);
                setSelectedComparedPrice(null);
              }}
            >
              <XAxis dataKey="timestamp" hide={true} />
              <YAxis hide={true} domain={yAxisDomain} />
              <Tooltip
                content={(props) => (
                  <ChartCustomContent
                    active={props.active}
                    coordinate={props.coordinate}
                    payload={props.payload}
                  />
                )}
                cursor={{
                  stroke: "#888888",
                  strokeWidth: 1,
                  strokeDasharray: "5 5",
                }}
              />
              <ReferenceLine y={1000} stroke="#888888" strokeDasharray="3 3" />
              {renderChartLines(selectedComparedAsset)}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      <ToggleGroup
        type="single"
        value={selectedPeriod}
        onValueChange={(value) => value && setSelectedPeriod(value)}
        className="justify-center"
      >
        <ToggleGroupItem value="week">W</ToggleGroupItem>
        <ToggleGroupItem value="month">M</ToggleGroupItem>
        <ToggleGroupItem value="threeMonth">3M</ToggleGroupItem>
        <ToggleGroupItem value="year">Y</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

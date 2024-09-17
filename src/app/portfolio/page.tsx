"use client";

import { useState, useEffect } from "react";
import { PortfolioAllocation } from "@/models/PortfolioAllocation";
import { Transaction } from "@/models/Transaction";
import { AddOrCalculateButtonGroup } from "./_components/addOrCalculateButtonGroup";
import { ToggledAllocationsCard } from "./_components/toggledAllocationsCard";
import { InvestmentGrowthChart } from "./_components/investmentGrowthChart";

interface Portfolio {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
  portfolioAllocations: Array<PortfolioAllocation>;
  transactions: Array<Transaction>;
}

interface DataPoint {
  timestamp: number;
  value: number;
}

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [purchaseRecommendation, setPurchaseRecommendation] = useState<
    { symbol: string; sharesToBuy: number }[]
  >([]);

  const [weekData, setWeekData] = useState<DataPoint[]>([]);
  const [monthData, setMonthData] = useState<DataPoint[]>([]);
  const [threeMonthData, setThreeMonthData] = useState<DataPoint[]>([]);
  const [yearData, setYearData] = useState<DataPoint[]>([]);

  useEffect(() => {
    async function fetchAssets() {
      const response = await fetch("/api/portfolio-allocations?portfolioId=1"); // Assuming portfolio ID 1
      const data = await response.json();
      setPortfolio(data);
    }
    fetchAssets();

    async function fetchInvestmentGrowth() {
      // Replace these with actual API calls when ready
      const weekResponse = await fetch(
        "/api/portfolio-allocations/investment-growth-calculate?portfolioId=1&period=week",
      )
        .then((resp) => resp.json())
        .then((json) => json.data);
      const monthResponse = await fetch(
        "/api/portfolio-allocations/investment-growth-calculate?portfolioId=1&period=month",
      )
        .then((resp) => resp.json())
        .then((json) => json.data);
      const threeMonthResponse = await fetch(
        "/api/portfolio-allocations/investment-growth-calculate?portfolioId=1&period=threeMonth",
      )
        .then((resp) => resp.json())
        .then((json) => json.data);
      const yearResponse = await fetch(
        "/api/portfolio-allocations/investment-growth-calculate?portfolioId=1&period=year",
      )
        .then((resp) => resp.json())
        .then((json) => json.data);

      setWeekData(await weekResponse);
      setMonthData(await monthResponse);
      setThreeMonthData(await threeMonthResponse);
      setYearData(await yearResponse);
    }
    fetchInvestmentGrowth();
  }, []);

  const addStock = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const calculatePurchase = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen ">
      <div className=" p-4 bg-secondarybackground rounded-br-[2.5rem] rounded-bl-[2.5rem]">
        <div className="container mx-auto md:max-w-6xl ">
          <h1 className="text-3xl font-semibold my-6 text-center tracking-wide">
            My Portfolio
          </h1>
          <InvestmentGrowthChart
            weekData={weekData}
            monthData={monthData}
            threeMonthData={threeMonthData}
            yearData={yearData}
          />
        </div>
      </div>
      <div className="container mx-auto p-4 md:max-w-6xl">
        <ToggledAllocationsCard />
        <AddOrCalculateButtonGroup
          addStock={addStock}
          calculatePurchase={calculatePurchase}
          purchaseRecommendation={purchaseRecommendation}
        />
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { PortfolioAllocation } from "@/models/PortfolioAllocation";
import { Transaction } from "@/models/Transaction";
import { AddOrCalculateButtonGroup } from "./_components/addOrCalculateButtonGroup";
import { ToggledAllocationsCard } from "./_components/toggledAllocationsCard";
import { InvestmentGrowthChart } from "./_components/investmentGrowthChart";

export interface Portfolio {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
  portfolioAllocations: Array<PortfolioAllocation>;
  transactions: Array<Transaction>;
}

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio>();
  const [purchaseRecommendation, setPurchaseRecommendation] = useState<
    { symbol: string; sharesToBuy: number }[]
  >([]);

  useEffect(() => {
    async function fetchAssets() {
      const response = await fetch("/api/portfolio-allocations?portfolioId=1"); // Assuming portfolio ID 1
      const data = await response.json();
      setPortfolio(data);
    }
    fetchAssets();
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
            portfolioId={ portfolio?.id }
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

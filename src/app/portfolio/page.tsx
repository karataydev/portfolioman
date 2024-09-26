"use client";

import { useState, useEffect } from "react";
import { PortfolioAllocation } from "@/models/PortfolioAllocation";
import { Transaction } from "@/models/Transaction";
import { AddOrCalculateButtonGroup } from "./_components/addOrCalculateButtonGroup";
import { ToggledAllocationsCard } from "./_components/toggledAllocationsCard/ToggledAllocationsCard";
import { InvestmentGrowthChart } from "./_components/investmentGrowthChart/InvestmentGrowthChart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BiEditAlt } from "react-icons/bi";
import { ComparisonSelector } from "./_components/comparisonSelector";

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
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [selectedComparedSymbol, setSelectedComparedSymbol] = useState<
    string | null
  >(null);

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

  const handleEditClick = () => {
    setEditedName(portfolio?.name || "");
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!portfolio) return;
    try {
      const response = await fetch(`/api/portfolio/${portfolio.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editedName }),
      });
      if (response.ok) {
        setPortfolio({ ...portfolio, name: editedName });
        setIsEditing(false);
      } else {
        console.error("Failed to update portfolio name");
      }
    } catch (error) {
      console.error("Error updating portfolio name:", error);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className=" p-4 bg-secondarybackground rounded-br-[2.5rem] rounded-bl-[2.5rem]">
        <div className="container mx-auto md:max-w-6xl text-center">
          <h1
            className="text-3xl font-semibold my-6 flex-1 tracking-wide cursor-pointer relative inline-block text-center"
            onClick={handleEditClick}
          >
            <span className="relative">
              {portfolio?.name}
              <BiEditAlt
                className="absolute -right-4 top-2/3 transform -translate-y-1/2 text-second md:top-1/2 md:-translate-y-1/2"
                size={16}
              />
            </span>
          </h1>
          <InvestmentGrowthChart
            portfolioId={portfolio?.id}
            selectedComparedAsset={selectedComparedSymbol}
          />
        </div>
      </div>
      <div className="container mx-auto p-4 md:max-w-6xl">
        <ComparisonSelector
          selectedAsset={selectedComparedSymbol}
          onSelect={setSelectedComparedSymbol}
          onRemove={() => setSelectedComparedSymbol("")}
        />
        <ToggledAllocationsCard portfolio={portfolio} />
        <AddOrCalculateButtonGroup
          addStock={addStock}
          calculatePurchase={calculatePurchase}
          purchaseRecommendation={purchaseRecommendation}
        />
      </div>
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Portfolio Name</DialogTitle>
          </DialogHeader>
          <Input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            placeholder="Enter new portfolio name"
          />
          <DialogFooter>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

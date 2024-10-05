"use client";

import { useState, useEffect } from "react";
import { PortfolioAllocation } from "@/models/PortfolioAllocation";
import { Transaction } from "@/models/Transaction";
import {
  AddOrCalculateButtonGroup,
  AddTransactionData,
} from "./_components/addOrCalculateButtonGroup";
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
import { ComparisonSelector } from "./_components/comparisonSelector/ComparisonSelector";
import GeneralHeader from "../../_components/GeneralHeader";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/utils";

export interface Portfolio {
  id: string;
  user_id: string;
  symbol: string;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
  allocations: Array<PortfolioAllocation>;
  transactions: Array<Transaction>;
}

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio>();
  const params = useParams();
  const portfolioId = params.id as string;
  const [purchaseRecommendation, setPurchaseRecommendation] = useState<
    { symbol: string; sharesToBuy: number }[]
  >([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [selectedComparedSymbol, setSelectedComparedSymbol] = useState<
    string | null
  >(null);

  useEffect(() => {
    async function fetchPortfolio() {
      const { data, error } = await apiFetch<Portfolio>(
        `http://localhost:8080/api/portfolio/${portfolioId}/allocations`,
      );
      if (error) {
        console.error("Error fetching portfolio:", error);
      } else if (data) {
        setPortfolio(data);
        setEditedName(data.name);
      }
    }
    if (portfolioId) {
      fetchPortfolio();
    }
  }, [portfolioId]);

  const addStock = async (e: AddTransactionData) => {
    try {
      const { data, error } = await apiFetch<Portfolio>(
        `http://localhost:8080/api/portfolio/add-transaction`,
        {
          method: "POST",
          body: {
            ...e,
            portfolio_id: portfolioId,
          },
        },
      );

      if (error) {
        console.error("Failed to add transaction:", error);
      } else if (data) {
        setPortfolio(data);
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
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
    const { data, error } = await apiFetch<Portfolio>(
      `/api/portfolio/${portfolioId}`,
      {
        method: "PATCH",
        body: { name: editedName },
      },
    );

    if (error) {
      console.error("Failed to update portfolio name:", error);
    } else if (data) {
      setPortfolio(data);
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <GeneralHeader className="bg-secondarybackground">{""} </GeneralHeader>
      <div className=" p-4 bg-secondarybackground rounded-br-[2.5rem] rounded-bl-[2.5rem]">
        <div className="container mx-auto md:max-w-6xl text-center">
          <h1
            className="text-xl font-semibold mt-6 mb-2 flex-1 tracking-wide cursor-pointer relative inline-block text-center"
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
            portfolioSymbol={portfolio?.symbol}
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

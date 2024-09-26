import { Portfolio } from "../../page";
import { PortfolioAllocation } from "@/models/PortfolioAllocation";

export interface Asset {
  name: string;
  symbol: string;
  percentage: number;
  amount?: number;
  color: string;
}

export interface AllocationsData {
  target: Asset[];
  current: Asset[];
}

export function getAllocationsData(portfolio: Portfolio): AllocationsData {
  const colors = getModernColors();

  const convertToResponseAsset = (
    allocation: PortfolioAllocation,
    index: number,
  ): Asset => ({
    name: allocation.asset.name,
    symbol: allocation.asset.symbol,
    percentage: 0, // This will be set differently for target and current
    amount: allocation.amount,
    color: colors[index % colors.length],
  });

  const target: Asset[] = portfolio.portfolioAllocations.map(
    (allocation, index) => ({
      ...convertToResponseAsset(allocation, index),
      percentage: allocation.target_percentage,
    }),
  );

  const current: Asset[] = portfolio.portfolioAllocations.map(
    (allocation, index) => ({
      ...convertToResponseAsset(allocation, index),
      percentage: allocation.current_percentage,
    }),
  );

  return { target, current };
}

export function calculateTotalPortfolioValue(assets: Asset[]): number {
  return assets.reduce((sum, asset) => sum + (asset.amount || 0), 0);
}

function getModernColors(): string[] {
  return [
    "#3a7bd5", // Blue
    "#00b894", // Green
    "#e17055", // Coral
    "#6c5ce7", // Purple
    "#fdcb6e", // Yellow
    "#0984e3", // Bright Blue
    "#e84393", // Pink
    "#55efc4", // Mint
    "#d63031", // Red
    "#00cec9", // Cyan
    "#fd79a8", // Light Pink
    "#636e72", // Gray
  ];
}

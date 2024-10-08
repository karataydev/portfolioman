import { apiFetch } from "@/lib/utils";

export interface DataPoint {
  timestamp: number;
  value: number;
}

export interface InvestmentGrowthChartResponse {
  weekData: DataPoint[];
  monthData: DataPoint[];
  threeMonthData: DataPoint[];
  yearData: DataPoint[];
}

export async function fetchInvestmentGrowth(
  symbol: string,
): Promise<InvestmentGrowthChartResponse | null> {
  const { data, error } = await apiFetch<InvestmentGrowthChartResponse>(
    `http://localhost:8080/api/investment-growth/${symbol}`,
  );

  if (error) {
    console.error("Error fetching investment growth data:", error);
    return null;
  }

  return data;
}

export const getDescription = (selectedPeriod: string) => {
  switch (selectedPeriod) {
    case "week":
      return "Value of $1000 invested one week ago";
    case "month":
      return "Value of $1000 invested one month ago";
    case "threeMonth":
      return "Value of $1000 invested three months ago";
    case "year":
      return "Value of $1000 invested one year ago";
    default:
      return "Investment growth over time";
  }
};

export const selectData = (
  selectedPeriod: string,
  response: InvestmentGrowthChartResponse | null,
) => {
  if (!response) return [];
  switch (selectedPeriod) {
    case "week":
      return response.weekData;
    case "month":
      return response.monthData;
    case "threeMonth":
      return response.threeMonthData;
    case "year":
      return response.yearData;
    default:
      return response.weekData;
  }
};

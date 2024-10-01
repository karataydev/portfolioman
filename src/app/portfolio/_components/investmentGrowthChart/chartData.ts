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
): Promise<InvestmentGrowthChartResponse> {
  try {
    const token = localStorage.getItem("auth_token");
    const response = await fetch(
      `http://localhost:8080/api/investment-growth/${symbol}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      },
    );
    return (await response.json()) as InvestmentGrowthChartResponse;
  } catch (error) {
    console.error("Error fetching investment growth data:", error);
    throw error;
  }
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

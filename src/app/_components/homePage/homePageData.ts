import { Portfolio } from "@/app/portfolio/[id]/page";
import { apiFetch } from "@/lib/utils";
import { PortfolioRequest } from "../portfolio/PortfolioDialog";

export interface PortfolioListResponse {
  id: number;
  name: string;
  amount?: number;
  change: number;
  owner?: string;
  symbol?: string;
}

export const fetchData = (
  setPortfolios: (e: PortfolioListResponse[]) => void,
  setFollowedPortfolios: (e: PortfolioListResponse[]) => void,
  setMarketOverview: (e: PortfolioListResponse[]) => void,
) => {
  apiFetch("/api/portfolio/user-portfolios").then((response) => {
    if (response.data) {
      console.log(response);
      const processedData = response.data.map(
        (portfolio: PortfolioListResponse) => ({
          ...portfolio,
          amount:
            portfolio.amount && portfolio.amount > 0
              ? portfolio.amount
              : undefined,
        }),
      );
      setPortfolios(processedData);
    }
  });

  apiFetch("/api/portfolio/followed-portfolios").then((response) => {
    if (response.data) {
      const processedData = response.data.map(
        (portfolio: PortfolioListResponse) => ({
          ...portfolio,
          amount:
            portfolio.amount && portfolio.amount > 0
              ? portfolio.amount
              : undefined,
        }),
      );
      setFollowedPortfolios(processedData);
    }
  });

  apiFetch("/api/asset/market-overview").then((response) => {
    if (response.data) {
      const processedData = response.data.map(
        (item: PortfolioListResponse) => ({
          ...item,
          amount: item.amount && item.amount > 0 ? item.amount : undefined,
        }),
      );
      setMarketOverview(processedData);
    }
  });
};

export const newPortfolio = async (req: PortfolioRequest) => {
  const { data, error } = await apiFetch<Portfolio>("/api/portfolio", {
    method: "POST",
    body: req,
  });
  if (error) {
    console.log("error in new portfolio");
  }
  return data;
};

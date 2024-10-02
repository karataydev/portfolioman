import { db } from "@/lib/db";
import { Asset } from "./Asset";

export interface PortfolioAllocation {
  id: string;
  portfolio_id: string;
  asset: Asset;
  target_percentage: number;
  current_percentage: number;
  unrealized_pl: number;
  amount: number;
}

export const PortfolioAllocationModel = {
  async findByPortfolioId(portfolioId: string): Promise<PortfolioAllocation[]> {
    const allocations = await db.any<PortfolioAllocation>(
      "SELECT * FROM portfolio_allocations WHERE portfolio_id = $1",
      [portfolioId],
    );
    return allocations;
  },

  async create(
    allocation: Omit<PortfolioAllocation, "id">,
  ): Promise<PortfolioAllocation> {
    const { portfolio_id, asset_id, target_percentage } = allocation;
    const newAllocation = await db.one<PortfolioAllocation>(
      "INSERT INTO portfolio_allocations (portfolio_id, asset_id, target_percentage) VALUES ($1, $2, $3) RETURNING *",
      [portfolio_id, asset_id, target_percentage],
    );
    return newAllocation;
  },

  async update(
    id: string,
    updates: Partial<PortfolioAllocation>,
  ): Promise<PortfolioAllocation> {
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");
    const values = Object.values(updates);
    const updatedAllocation = await db.one<PortfolioAllocation>(
      `UPDATE portfolio_allocations SET ${setClause} WHERE id = $1 RETURNING *`,
      [id, ...values],
    );
    return updatedAllocation;
  },

  async delete(id: string): Promise<void> {
    await db.none("DELETE FROM portfolio_allocations WHERE id = $1", [id]);
  },

  async getPortfolioAllocations(
    portfolioId: string,
  ): Promise<PortfolioAllocation[]> {
    const allocations = await db.any<PortfolioAllocation>(
      "SELECT pa.*, a.name as asset_name, a.symbol as asset_symbol, a.type as asset_type " +
        "FROM portfolio_allocations pa " +
        "JOIN assets a ON pa.asset_id = a.id " +
        "WHERE pa.portfolio_id = $1",
      [portfolioId],
    );
    return allocations;
  },
};

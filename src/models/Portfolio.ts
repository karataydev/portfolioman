import { db } from "@/lib/db";

export interface Portfolio {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

export const PortfolioModel = {
  async findById(id: string): Promise<Portfolio | null> {
    const portfolio = await db.oneOrNone<Portfolio>(
      "SELECT * FROM portfolios WHERE id = $1",
      [id],
    );
    return portfolio;
  },

  async findByUserId(userId: string): Promise<Portfolio[]> {
    const portfolios = await db.any<Portfolio>(
      "SELECT * FROM portfolios WHERE user_id = $1",
      [userId],
    );
    return portfolios;
  },

  async create(
    portfolio: Omit<Portfolio, "id" | "created_at" | "updated_at">,
  ): Promise<Portfolio> {
    const { user_id, name, description } = portfolio;
    const newPortfolio = await db.one<Portfolio>(
      "INSERT INTO portfolios (user_id, name, description) VALUES ($1, $2, $3) RETURNING *",
      [user_id, name, description],
    );
    return newPortfolio;
  },

  async update(id: string, updates: Partial<Portfolio>): Promise<Portfolio> {
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");
    const values = Object.values(updates);
    const updatedPortfolio = await db.one<Portfolio>(
      `UPDATE portfolios SET ${setClause} WHERE id = $1 RETURNING *`,
      [id, ...values],
    );
    return updatedPortfolio;
  },

  async delete(id: string): Promise<void> {
    await db.none("DELETE FROM portfolios WHERE id = $1", [id]);
  },
};

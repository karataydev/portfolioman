import { db } from '@/lib/db';

export interface Transaction {
  id: string;
  portfolio_id: string;
  asset_id: string;
  transaction_type: 'BUY' | 'SELL';
  quantity: number;
  price_per_unit: number;
  transaction_date: Date;
}

export const TransactionModel = {
  async findById(id: string): Promise<Transaction | null> {
    const transaction = await db.oneOrNone<Transaction>('SELECT * FROM transactions WHERE id = $1', [id]);
    return transaction;
  },

  async create(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    const { portfolio_id, asset_id, transaction_type, quantity, price_per_unit, transaction_date } = transaction;
    const newTransaction = await db.one<Transaction>(
      'INSERT INTO transactions (portfolio_id, asset_id, transaction_type, quantity, price_per_unit, transaction_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [portfolio_id, asset_id, transaction_type, quantity, price_per_unit, transaction_date]
    );
    return newTransaction;
  },

  async getPortfolioTransactions(portfolioId: string): Promise<Transaction[]> {
    const transactions = await db.any<Transaction>(
      'SELECT t.*, a.name as asset_name, a.symbol as asset_symbol, a.type as asset_type ' +
      'FROM transactions t ' +
      'JOIN assets a ON t.asset_id = a.id ' +
      'WHERE t.portfolio_id = $1 ' +
      'ORDER BY t.transaction_date DESC',
      [portfolioId]
    );
    return transactions;
  },

  async getAssetTransactions(assetId: string): Promise<Transaction[]> {
    const transactions = await db.any<Transaction>(
      'SELECT * FROM transactions WHERE asset_id = $1 ORDER BY transaction_date DESC',
      [assetId]
    );
    return transactions;
  },

  async deleteTransaction(id: string): Promise<void> {
    await db.none('DELETE FROM transactions WHERE id = $1', [id]);
  },

  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<Transaction> {
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    const values = Object.values(updates);
    const updatedTransaction = await db.one<Transaction>(
      `UPDATE transactions SET ${setClause} WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return updatedTransaction;
  },
};
import { db } from '@/lib/db';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: AssetType;
  current_price: number;
  currency: string;
  last_updated: Date;
}

export enum AssetType {
  Stock = 'STOCK',
  Cryptocurrency = 'CRYPTO',
  Commodity = 'COMMODITY',
  Currency = 'CURRENCY',
  ETF = 'ETF',
  Bond = 'BOND',
  RealEstate = 'REAL_ESTATE',
  Other = 'OTHER'
}

export const AssetModel = {
  async findById(id: string): Promise<Asset | null> {
    const asset = await db.oneOrNone<Asset>('SELECT * FROM assets WHERE id = $1', [id]);
    return asset;
  },

  async findBySymbol(symbol: string): Promise<Asset | null> {
    const asset = await db.oneOrNone<Asset>('SELECT * FROM assets WHERE symbol = $1', [symbol]);
    return asset;
  },

  async create(asset: Omit<Asset, 'id' | 'last_updated'>): Promise<Asset> {
    const { symbol, name, type, current_price, currency } = asset;
    const newAsset = await db.one<Asset>(
      'INSERT INTO assets (symbol, name, type, current_price, currency) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [symbol, name, type, current_price, currency]
    );
    return newAsset;
  },

  async update(id: string, updates: Partial<Asset>): Promise<Asset> {
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    const values = Object.values(updates);
    const updatedAsset = await db.one<Asset>(
      `UPDATE assets SET ${setClause}, last_updated = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return updatedAsset;
  },

  async updatePrice(id: string, newPrice: number): Promise<Asset> {
    const updatedAsset = await db.one<Asset>(
      'UPDATE assets SET current_price = $2, last_updated = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
      [id, newPrice]
    );
    return updatedAsset;
  },

  async getAll(): Promise<Asset[]> {
    const assets = await db.any<Asset>('SELECT * FROM assets');
    return assets;
  },

  async getByType(type: AssetType): Promise<Asset[]> {
    const assets = await db.any<Asset>('SELECT * FROM assets WHERE type = $1', [type]);
    return assets;
  },
};
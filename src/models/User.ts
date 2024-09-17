import { db } from '@/lib/db';

export interface User {
  id: string;
  email: string;
  name: string | null;
  google_id: string | null;
  profile_picture_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export const UserModel = {
  async findById(id: string): Promise<User | null> {
    const user = await db.oneOrNone<User>('SELECT * FROM users WHERE id = $1', [id]);
    return user;
  },

  async findByEmail(email: string): Promise<User | null> {
    const user = await db.oneOrNone<User>('SELECT * FROM users WHERE email = $1', [email]);
    return user;
  },

  async create(user: Partial<User>): Promise<User> {
    const { email, name, google_id, profile_picture_url } = user;
    const newUser = await db.one<User>(
      'INSERT INTO users (email, name, google_id, profile_picture_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, name, google_id, profile_picture_url]
    );
    return newUser;
  },

  async update(id: string, updates: Partial<User>): Promise<User> {
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    const values = Object.values(updates);
    const updatedUser = await db.one<User>(
      `UPDATE users SET ${setClause} WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return updatedUser;
  },
};
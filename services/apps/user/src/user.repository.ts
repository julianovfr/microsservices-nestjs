import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';

/** Valores do tipo `user_role` no PostgreSQL (migrations SQL). */
export type UserRole = 'user' | 'support' | 'zoo-keeper';

export interface UserRow {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

@Injectable()
export class UsersRepository {
  constructor(private readonly db: DatabaseService) {}

  async create(data: CreateUserInput): Promise<UserRow> {
    const role = data.role ?? 'user';
    const result = await this.db.pool.query<UserRow>(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4::user_role)
       RETURNING id, name, email, password, role, created_at, updated_at`,
      [data.name, data.email, data.password, role],
    );
    return result.rows[0];
  }

  async findByEmail(email: string): Promise<UserRow | null> {
    const result = await this.db.pool.query<UserRow>(
      `SELECT id, name, email, password, role
       FROM users
       WHERE email = $1
       LIMIT 1`,
      [email],
    );
    return result.rows[0] ?? null;
  }
}

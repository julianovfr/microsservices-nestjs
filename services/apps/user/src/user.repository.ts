import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { hashPassword, verifyPassword } from './password-crypto';

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
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(private readonly db: DatabaseService) {}

  async create(data: CreateUserInput): Promise<UserRow> {
    this.logger.log(`create user name=${data.name} email=${data.email} role=${data.role}`);
    const role = data.role ?? 'user';
    const passwordHash = await hashPassword(data.password);
    const result = await this.db.pool.query<UserRow>(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4::user_role)
       RETURNING id, name, email, password, role, created_at, updated_at`,
      [data.name, data.email, passwordHash, role],
    );
    return result.rows[0];
  }

  async findByEmail(email: string): Promise<UserRow | null> {
    this.logger.log(`findByEmail email=${email}`);
    const result = await this.db.pool.query<UserRow>(
      `SELECT id, name, email, password, role
       FROM users
       WHERE email = $1
       LIMIT 1`,
      [email],
    );
    return result.rows[0] ?? null;
  }

  async findById(id: number): Promise<UserRow | null> {
    this.logger.log(`findById id=${id}`);
    const result = await this.db.pool.query<UserRow>(
      `SELECT id, name, email, password, role
       FROM users
       WHERE id = $1
       LIMIT 1`,
      [id],
    );
    return result.rows[0] ?? null;
  }

  async login(email: string, password: string): Promise<number | null> {
    const user = await this.findByEmail(email);
    if (!user) {
      this.logger.warn(`login: nenhum usuário com email=${email}`);
      return null;
    }
    const ok = await verifyPassword(password, user.password);
    if (!ok) {
      this.logger.warn(`login: senha incorreta para email=${email}`);
      return null;
    }
    this.logger.log(`login: credenciais OK id=${user.id} email=${email}`);
    return user.id;
  }
}

import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';

export interface Authentication {
  user_id: number;
  token: string;
  expires_at: Date;
}


@Injectable()
export class AuthenticationRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async createAuthentication(authentication: Authentication) {
    return this.databaseService.pool.
    query<Authentication>('INSERT INTO authentication (user_id, token, expires_at) VALUES ($1, $2, $3)', [authentication.user_id, authentication.token, authentication.expires_at]);
  }

  async findAuthenticationByToken(token: string) {
    return this.databaseService.pool.query<Authentication>('SELECT * FROM authentication WHERE token = $1', [token]);
  }
}
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  readonly pool: Pool;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      this.logger.warn(
        'DATABASE_URL não definido; o pool será criado na primeira query ou falhará ao conectar.',
      );
    }
    this.pool = new Pool({
      connectionString,
    });
  }

  async onModuleInit() {
    if (!process.env.DATABASE_URL) {
      return;
    }
    const client = await this.pool.connect();
    client.release();
    this.logger.log('Conexão com PostgreSQL verificada.');
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}

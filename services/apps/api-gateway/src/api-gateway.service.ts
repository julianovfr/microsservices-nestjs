import { HttpException, Injectable, Logger } from '@nestjs/common';

export interface LoginBody {
  email: string;
  password: string;
}

export type UserRole = 'user' | 'support' | 'zoo-keeper';

export interface CreateUserBody {
  idCreator: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

@Injectable()
export class ApiGatewayService {
  private readonly logger = new Logger(ApiGatewayService.name);

  async createUser(body: CreateUserBody) {
    const base = (process.env.USER_SERVICE_URL ?? 'http://127.0.0.1:3002').replace(
      /\/$/,
      '',
    );
    const url = `${base}/user/create`;
    this.logger.log(
      `Gateway encaminhando createUser POST ${url} email=${body?.email ?? '(vazio)'}`,
    );
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      this.logger.warn(
        `Gateway createUser: user respondeu ${res.status} ${res.statusText}`,
      );
      const text = await res.text();
      let payload: Record<string, unknown> | string = text;
      try {
        if (text) payload = JSON.parse(text) as Record<string, unknown>;
      } catch {
        payload = { message: text || res.statusText };
      }
      throw new HttpException(payload, res.status);
    }
    this.logger.log('Gateway createUser: resposta OK do user');
    return res.json() as Promise<{
      message: string;
      user: Record<string, unknown>;
    }>;
  }

  async login(body: LoginBody) {
    const base = (process.env.USER_SERVICE_URL ?? 'http://127.0.0.1:3002').replace(
      /\/$/,
      '',
    );
    const url = `${base}/user/login`;
    this.logger.log(
      `Gateway encaminhando login POST ${url} email=${body?.email ?? '(vazio)'}`,
    );
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      this.logger.warn(
        `Gateway login: user respondeu ${res.status} ${res.statusText}`,
      );
      throw new Error(`User: ${res.status}`);
    }
    this.logger.log('Gateway login: resposta OK do user');
    return res.json();
  }

  async pingZoo() {
    const base = (process.env.ZOO_SERVICE_URL ?? 'http://127.0.0.1:3003').replace(/\/$/, '');
    const res = await fetch(`${base}/zoo/ping`);
    if (!res.ok) throw new Error(`Zoo: ${res.status}`);
    return res.json();
  }
  
  async pingAuth() {
    const base = (process.env.AUTH_SERVICE_URL ?? 'http://127.0.0.1:3001').replace(/\/$/, '');
    const res = await fetch(`${base}/authentication/ping`);
    if (!res.ok) throw new Error(`Auth: ${res.status}`);
    return res.json();
  }
  
  async pingUser() {
    const base = (process.env.USER_SERVICE_URL ?? 'http://127.0.0.1:3002').replace(/\/$/, '');
    const res = await fetch(`${base}/user/ping`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    });
    if (!res.ok) throw new Error(`User: ${res.status}`);
    return res.json();
  }
}

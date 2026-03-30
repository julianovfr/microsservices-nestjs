import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiGatewayService {
  async pingZoo() {
    const base = (process.env.ZOO_SERVICE_URL ?? 'http://127.0.0.1:3003').replace(/\/$/, '');
    const res = await fetch(`${base}/zoo/ping`);
    if (!res.ok) throw new Error(`Zoo: ${res.status}`);
    return res.json();
  }
  
  async pingAuth() {
    const base = (process.env.AUTH_SERVICE_URL ?? 'http://127.0.0.1:3000').replace(/\/$/, '');
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

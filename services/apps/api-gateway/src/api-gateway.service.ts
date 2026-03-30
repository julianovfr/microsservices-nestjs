import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiGatewayService {
  getHello(): string {
    return 'Hello World!';
  }

  async authenticate(body: any) {
    return {
      message: 'Authenticated',
      data: body,
    };
  }
}

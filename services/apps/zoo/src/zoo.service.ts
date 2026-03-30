import { Injectable } from '@nestjs/common';

@Injectable()
export class ZooService {
  getHello(): string {
    return 'Hello World!';
  }
}

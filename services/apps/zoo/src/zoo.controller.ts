import { Controller, Get } from '@nestjs/common';
import { ZooService } from './zoo.service';

@Controller('/zoo')
export class ZooController {
  constructor(private readonly zooService: ZooService) {}

  @Get('/ping')
  getPing() {
    return {
      message: 'pong by zoo service',
    };
  }
}

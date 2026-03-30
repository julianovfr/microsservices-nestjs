import { Controller, Get } from '@nestjs/common';
import { ZooService } from './zoo.service';

@Controller()
export class ZooController {
  constructor(private readonly zooService: ZooService) {}

  @Get()
  getHello(): string {
    return this.zooService.getHello();
  }
}

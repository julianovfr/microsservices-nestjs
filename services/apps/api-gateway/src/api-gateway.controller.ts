import { Controller, Get } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';

@Controller('/api')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get('auth/ping')
  pingAuth() {
    return this.apiGatewayService.pingAuth();
  }

  @Get('user/ping')
  pingUser() {
    return this.apiGatewayService.pingUser();
  }
  @Get('zoo/ping')
  pingZoo(){
    return this.apiGatewayService.pingZoo();
  }
}
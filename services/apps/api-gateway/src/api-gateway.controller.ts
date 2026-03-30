import { Controller, Get, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { Body, Logger } from '@nestjs/common';  
import type { LoginBody, CreateUserBody } from './api-gateway.service';

@Controller('/api')
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post('user/create')
  createUser(@Body() body: CreateUserBody) {
    return this.apiGatewayService.createUser(body);
  }

  @Post('user/login')
  login(@Body() body: LoginBody) {
    return this.apiGatewayService.login(body);
  }

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
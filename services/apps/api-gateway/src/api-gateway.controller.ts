import { Controller, Get, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { get } from 'http';

/*
TODO: importar o messagePattern ou eventPattern
para o controller "observar" eventos do microservice
*/

@Controller("/api")
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  //reponsavel por receber todas as mensagens da aplicação

  @Post("/auth")
  async function authenticate(@Body() body: any) {
    return this.apiGatewayService.authenticate(body);
  }

  /*@Post("/user/")

  @Get("/user/")

  @Put("/user/")

  @Delete("/user/")*/

  }
}

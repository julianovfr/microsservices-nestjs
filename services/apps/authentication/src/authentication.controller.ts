import { Controller, Get, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Body } from '@nestjs/common';

@Controller("/authentication")
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get("/ping")
  ping() {
    return {
      message: 'pong by authentication service',
    };
  }

  @Post("/token")
  loginToken(@Body() body: any) {
    return this.authenticationService.loginToken(body);
  }
}

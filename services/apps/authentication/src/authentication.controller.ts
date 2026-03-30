import { Controller, Get } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller("/authentication")
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get("/ping")
  ping() {
    return {
      message: 'pong by authentication service',
    };
  }
}

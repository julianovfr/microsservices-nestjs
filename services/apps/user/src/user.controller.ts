import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/create")
  createUser(@Body() body: any) {
    return this.userService.createUser(body);
  }

  @Get("/ping")
  ping() {
    return {
      message: 'pong by user service\n',
    };
  }
}

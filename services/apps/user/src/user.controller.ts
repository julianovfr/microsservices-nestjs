import { Body, Controller, Get, Post } from '@nestjs/common';
import type { LoginBody, CreateUserBody } from './user.service';
import { UserService } from './user.service';


@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  createUser(@Body() body: CreateUserBody) {
    return this.userService.createUser(body);
  }

  @Post('/login')
  login(@Body() body: LoginBody) {
    return this.userService.login(body);
  }

  @Get('/ping')
  ping() {
    return {
      message: 'pong by user service\n',
    };
  }
}

import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Body } from '@nestjs/common';

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/create")
  createUser(@Body() body: any) {
    return this.userService.createUser(body);
  }
}

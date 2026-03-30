import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
 
  async createUser(body: any) {
    return {
      message: 'User created',
      data: body,
    };
  }
}

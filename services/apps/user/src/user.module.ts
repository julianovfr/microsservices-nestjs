import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { UserController } from './user.controller';
import { UsersRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [DatabaseService, UsersRepository, UserService],
})
export class UserModule {}

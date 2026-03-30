import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 15_000,
      maxRedirects: 3,
    }),
  ],
  controllers: [UserController],
  providers: [DatabaseService, UserRepository, UserService],
})
export class UserModule {}

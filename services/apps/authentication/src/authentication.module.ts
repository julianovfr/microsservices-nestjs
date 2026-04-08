import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationRepository } from './authentication.repository';
import { AuthenticationService } from './authentication.service';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'dev-only-change-in-docker-compose',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [DatabaseService, AuthenticationRepository, AuthenticationService],
})
export class AuthenticationModule {}

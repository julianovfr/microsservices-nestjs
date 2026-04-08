import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationRepository } from './authentication.repository';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly authenticationRepository: AuthenticationRepository,
  ) {}

  async loginToken(body: { userId: number }) {
    this.logger.log(`loginToken: emitindo JWT e persistindo sessão userId=${body.userId}`);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // exemplo: 7 dias
  
    const token = await this.jwtService.signAsync(
      { sub: body.userId },
      { expiresIn: '7d' }, // alinhar com expiresAt
    );
  
    await this.authenticationRepository.createAuthentication({
      user_id: body.userId,
      token,
      expires_at: expiresAt,
    });

    this.logger.log(`loginToken: concluído userId=${body.userId} expiresAt=${expiresAt.toISOString()}`);
    return { token, expiresAt: expiresAt.toISOString() };
  }

}

import {
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';

type AuthTokenResponse = { token: string; expiresAt?: string };

export type UserRole = 'user' | 'support' | 'zoo-keeper';


export interface LoginBody {
  email: string;
  password: string;
}

export interface CreateUserBody {
  idCreator: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}


@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async login(body: LoginBody) {
    this.logger.log(
      `Login tentativa email=${body.email} (senha informada: ${body.password ? 'sim' : 'não'})`,
    );
    const id = await this.userRepository.login(body.email, body.password);
    if (id === null) {
      this.logger.warn(`Login falhou para email=${body.email} (credenciais inválidas ou usuário inexistente)`);
      throw new UnauthorizedException('Credenciais inválidas');
    }
    this.logger.log(`Login OK userId=${id} email=${body.email}, solicitando token ao authentication`);
    const token = await this.generateToken(id);
    this.logger.log(`Token obtido para userId=${id}`);
    return { id, token };
  }

  async createUser(body: CreateUserBody) {
    const userCreator = await this.userRepository.findById(body.idCreator);
    this.logger.log(`userCreator=${JSON.stringify(userCreator)}`);

    if (userCreator === null || userCreator.role !== 'support') {
      this.logger.warn(`Usuário criador não é admin id=${body.idCreator}`);
      throw new ForbiddenException(
        'Apenas usuários com perfil support podem criar outros usuários',
      );

    }

    const row = await this.userRepository.create({
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role,
    });
    const { password: _hash, ...user } = row;
    return {
      message: 'Usuário criado com sucesso',
      user,
    };
  }

  async generateToken(id: number): Promise<string> {
    const base = (process.env.AUTH_SERVICE_URL ?? 'http://127.0.0.1:3001').replace(
      /\/$/,
      '',
    );
    const url = `${base}/authentication/token`;
    this.logger.log(`POST ${url} userId=${id}`);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: id }),
    });
    if (!res.ok) {
      this.logger.error(
        `authentication respondeu ${res.status} ${res.statusText} para userId=${id}`,
      );
      throw new UnauthorizedException(
        `Falha ao obter token no authentication (${res.status})`,
      );
    }
    const data = (await res.json()) as AuthTokenResponse;
    return data.token;
  }
}

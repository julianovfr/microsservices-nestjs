import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const port = Number(process.env.PORT) || 3002;
  const host = process.env.HOST ?? '0.0.0.0';
  await app.listen(port, host);
}
bootstrap();
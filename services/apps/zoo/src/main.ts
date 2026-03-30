import { NestFactory } from '@nestjs/core';
import { ZooModule } from './zoo.module';

async function bootstrap() {
  const app = await NestFactory.create(ZooModule);
  const port = Number(process.env.PORT) || 3003;
  const host = process.env.HOST ?? '0.0.0.0';
  await app.listen(port, host);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { ZooModule } from './zoo.module';

async function bootstrap() {
  const app = await NestFactory.create(ZooModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

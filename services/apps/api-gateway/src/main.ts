import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  const port = Number(process.env.PORT) || 3005;
  const host = process.env.HOST ?? '0.0.0.0';

  await app.listen(port, host);
}
bootstrap();

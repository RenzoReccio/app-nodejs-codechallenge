import { NestFactory } from '@nestjs/core';
import { PresentationModule } from './presentation/presentation.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(PresentationModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  app.startAllMicroservices()
  await app.listen(3000);
}
bootstrap();

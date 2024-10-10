import { NestFactory } from '@nestjs/core';
import { PresentationModule } from './presentation/presentation.module';
import { ValidationPipe } from '@nestjs/common';
import { otelSDK } from './tracing';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionHandler } from './infrastructure/globalErrorHandler/globalErrorHandler.error';

async function bootstrap() {
  await otelSDK.start();

  const app = await NestFactory.create(PresentationModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  const config = new DocumentBuilder()
    .setTitle('Transaction API')
    .setDescription('API for transaction system')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.useGlobalFilters(new GlobalExceptionHandler());

  app.startAllMicroservices()
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { PresentationModule } from './presentation/presentation.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { otelSDK } from './tracing';

async function bootstrap() {
  await otelSDK.start();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PresentationModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: `fraud-sv`,
          brokers: [process.env.KAFKA_BROKER],
          
        },
        consumer: {
          groupId: 'consumer-fraud',
        },
        
      },
    },
  );
  app.listen();
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WorkerModule } from './worker.module';
import { AllExceptionsFilter } from 'src/shared/exceptions.filter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('WorkerMicroserviceBootstrap');

  logger.log('Initializing Worker Microservice...');

  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  };

  logger.log(
    `Setting up microservice with transport: ${
      Transport[microserviceOptions.transport]
    }`,
  );

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WorkerModule,
    microserviceOptions,
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  app.listen();

  logger.log('Worker Microservice is listening for events...');
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ApiModule } from './api.module';
import { AllExceptionsFilter } from 'src/shared/exceptions.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap'); // NestJS Logger
  const port = process.env.PORT ? Number(process.env.PORT) : 3000; // Fetch port from environment variable or default to 3000

  // Create the NestJS application instance
  const app = await NestFactory.create(ApiModule);

  // Apply global validation pipes for incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
      whitelist: true, // Remove additional properties that are not in the DTO
      forbidNonWhitelisted: true, // Return an error when the client sends fields that are not in the DTO
    }),
  );

  // Apply global exception filter for handling all exceptions throughout the application
  app.useGlobalFilters(new AllExceptionsFilter());

  // Start the application
  await app.listen(port, () => {
    logger.log(`API Service is running on http://localhost:${port}/`);
  });
}

bootstrap();

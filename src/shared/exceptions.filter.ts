import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (response && request) {
      // This is an HTTP server
      const status =
        exception instanceof HttpException ? exception.getStatus() : 500;
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      // This is a microservice
      console.error('Error in Worker Microservice:', exception);
      // Here, you can add any additional error handling specific to the microservice
      // For example, if you want to send an error response to another microservice:
      throw new RpcException('Error processing the request.');
    }
  }
}

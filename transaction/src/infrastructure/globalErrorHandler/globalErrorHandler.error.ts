import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error)
export class GlobalExceptionHandler implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const errorResponse = exception.getResponse();
      
      response
        .status(statusCode)
        .json({
          statusCode,
          ...typeof errorResponse === 'string' ? { message: errorResponse } : errorResponse,
        });

      return;
    }
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR
    let errors = { error: exception.message }

    response
      .status(statusCode)
      .json(errors);
  }
}
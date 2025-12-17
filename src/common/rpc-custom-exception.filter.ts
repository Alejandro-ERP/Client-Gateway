import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    
    const error = exception.getError();


    if (typeof error === 'object' && 'message' in error && 'status' in error) {
      return response.status(error.status).json({
        statusCode: error.status,
        message: error.message,
      });
    }

    response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}

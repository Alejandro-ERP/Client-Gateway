import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const error = exception.getError();

    if (error.toString().includes('Empty response')) {
      return response.status(404).json({
        statusCode: 500,
        message: error
          .toString()
          .substring(0, error.toString().indexOf('(') - 1),
      });
    }

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

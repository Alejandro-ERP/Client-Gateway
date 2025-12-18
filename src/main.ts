import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/rpc-custom-exception.filter';
import { envConfig } from './config/envs';

async function bootstrap() {
  const logger= new Logger('Main-Client-Gateway');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new RpcCustomExceptionFilter());
  
  await app.listen(envConfig.port);
  logger.log(`Application is running on port: ${envConfig.port}`);

}
bootstrap();

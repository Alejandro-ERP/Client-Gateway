import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TransportModule } from 'src/transport/transport.module';

@Module({
  controllers: [AuthController],
  imports: [TransportModule],
})
export class AuthModule {}

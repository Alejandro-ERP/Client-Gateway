import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envConfig } from 'src/config/envs';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: envConfig.ordersMicroservice.host,
          port: envConfig.ordersMicroservice.port,
        },
      },
    ]),
  ],
})
export class OrdersModule {}

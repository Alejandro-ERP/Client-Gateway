import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/transport/service';
import { LoginUserDto } from './dto/login-user.dt';
import { CreateUserDto } from './dto/create-user.dto';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return loginUserDto;
  }

  @Post('register')
  async register(@Body() registerDto: CreateUserDto) {
    return await firstValueFrom(this.client.send('create-user', registerDto));
  }
}

import { Transform } from 'class-transformer';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsStrongPassword({
    minLength: 4,
  })
  password: string;

  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;
}

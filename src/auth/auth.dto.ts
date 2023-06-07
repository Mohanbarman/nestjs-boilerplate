import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDTO {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;
}

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

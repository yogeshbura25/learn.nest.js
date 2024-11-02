import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class registerDto {
  @IsOptional()
  name?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}


export class loginDto {
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
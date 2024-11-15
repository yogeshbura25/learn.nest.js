import {
  Body,
  Controller,
  Post,
Req
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto, loginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
  ) {}

  @Post('registeruser')
  async registerUser(@Body() registerDto: registerDto) {
    const { name, email, password } = registerDto;
    return this.authService.registerUser(name || null, email, password);
  }

  @Post('loginuser')
  async loginUser(@Body() loginDto: loginDto) {
    const { email, password } = loginDto;
    return this.authService.loginUser(email, password);
  }
}

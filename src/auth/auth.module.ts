import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret_key', 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, PrismaService], 
  controllers: [AuthController],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import { GuardsModule } from './guards/guards.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    AppModule,
    GuardsModule
  ],
  providers: [AppService,PrismaService, AuthService, UserService, JwtService],
  controllers: [AppController],
})
export class AppModule {}

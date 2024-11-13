import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './startegy/jwt.startegy';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
  ],
  providers: [JwtStrategy],
  controllers: [UserController],
})
export class AppModule {}

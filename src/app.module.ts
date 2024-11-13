import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/startegy/jwt.startegy';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    AppModule
  ],
  providers: [JwtStrategy, AppService],
  controllers: [UserController, AppController],
})
export class AppModule {}

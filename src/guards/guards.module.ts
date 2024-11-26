import { Module } from '@nestjs/common';
import { GuardsController } from './guards.controller';
import { GuardsService } from './guards.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Fetch the JWT secret from the .env file
        signOptions: { expiresIn: '1h' }, // Token expiration (optional)
      }),
    }), 
  ],
  controllers: [GuardsController],
  providers: [GuardsService, PrismaService]
})
export class GuardsModule {}

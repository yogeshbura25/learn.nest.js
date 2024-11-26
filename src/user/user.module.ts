import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { GuardsService } from 'src/guards/guards.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UserService, GuardsService, JwtService, PrismaService],
  controllers:[UserController],
  exports:[UserService]
})
export class UserModule {}

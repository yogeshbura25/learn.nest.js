import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
 import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {

    constructor(
      
        private prisma: PrismaService,
        private jwt: JwtService,
      ) {}

     async registerUser(name: string | null, email: string, password: string) {
    try {
      const findUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (findUser) {
        throw new HttpException(
          'User email already exists',
          HttpStatus.CONFLICT,
        );
      }
      const hashedPassword = await bcrypt.hash(password, 6);

      const createUser = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: 'New user Successfully Added',
        data: {
          id: createUser.id,
          name: createUser.name,
          email: createUser.email,
          createdAt: createUser.createdAt,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
 
  async loginUser(email: string, password: string) {
    try {
      const findUser = await this.prisma.user.findUnique({
        where: { email },
      });
      if(!findUser) {
        throw new HttpException(
          'User does not exists',
          HttpStatus.CONFLICT,
      )};
      const isPasswordvalid = await bcrypt.compare(password,  findUser.password);
      if(!isPasswordvalid) {
        throw new HttpException(
          'User password does not match, please try again',
          HttpStatus.CONFLICT,
      )};
      const payload = { id: findUser.id, email: findUser.email };
      const token = this.jwt.sign(payload);
      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        data: {
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
          token,
        },
      }
    } catch (error) {
      if(error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException (
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  
  
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
 import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {

    constructor(
        private config: ConfigService,
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
  
      if (!findUser) {
        throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
      }
  
      const isPasswordValid = await bcrypt.compare(password, findUser.password);
      if (!isPasswordValid) {
        throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
      }
  
      // Generate JWT token using the `signInToken` method
      const tokenData = await this.signInToken(findUser.id, findUser.email);
  
      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        data: {
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
          ...tokenData, // includes `access_token`
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async signInToken(id: number, email: string): Promise<{ access_token: string }> {
    const payload = { sub: id, email };
    const secret = this.config.get('JWT_SECRET');
  
    // Generate token with expiration
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
  
    return { access_token: token };
  }

  
}

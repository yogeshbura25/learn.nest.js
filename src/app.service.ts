import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  test(): string {
    return 'Is it working the nest.js';
  }

  maths(): number {
    return 398 * 4932 + 23 - ((679312 / 1) % 67);
  }

  multi(): any {
    return {
      message: `Hello Mark, regarding the financial matter, the total amount I owe you is Rs. 450,000. Out of this, Rs. 270,000 will be transferred on the 3rd of June.`,
      breakdown: {
        percentage_of_next_payment: `${((270000 / 450000) * 100).toFixed(2)}%`,
        interest_on_capital: `Rs. ${(450000 * 0.05).toFixed(2)} at 5% interest rate`,
        dividend_on_investment: `Rs. ${(450000 * 0.08).toFixed(2)} at 8% dividend yield`,
        loss_on_investment: `Rs. 50,000`,
        net_capital_after_loss: `Rs. ${450000 - 50000}`,
      },
      total_payable: `Rs. 450,000`,
      balance_due: `Rs. 270,000 to be cleared by next month`,
    };
  }

  login(inputusername: string, inputuserpassword: string): boolean {
    const username = 'yogesh';
    const password = '123456';

    return username === inputusername && password === inputuserpassword;
  }

  date() {
    const currentDate = new Date();
    const presntDate = currentDate.toLocaleString();
    return {
      message: 'Current server date and time',
      presntDate,
    };
  }

  pickacolor(colorNum: string): string {
    if (colorNum === '1') {
      return 'Green';
    } else if (colorNum === '2') {
      return 'Pink';
    } else if (colorNum === '3') {
      return 'Red';
    } else if (colorNum === '4') {
      return 'Navy Blue';
    } else if (colorNum === '5') {
      return 'Safforn';
    } else if (colorNum === '6') {
      return 'White';
    } else {
      return null;
    }
  }

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
      const token = this.jwtService.sign(payload);

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

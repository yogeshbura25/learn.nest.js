import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpException,
  HttpStatus,
  UseGuards,

} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './guards';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  test(): string {
    return this.appService.test();
  }

  @Get('maths')
  maths(): number {
    return this.appService.maths();
  }

  @Get('multi')
  @UseGuards(JwtGuard)
  multi(): any {
    return this.appService.multi();
  }

  @Post('login')
  login(@Body() body: { inputusername: string; inputuserpassword: string }) {
    const { inputusername, inputuserpassword } = body;
    const isAuthenticated = this.appService.login(
      inputusername,
      inputuserpassword,
    );
    if (!isAuthenticated) {
      throw new HttpException(
        'Inavliad username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return {
      statuscode: HttpStatus.OK,
      messsage: 'User successfully logged in',
    };
  }

  @Get('date')
  date() {
    return this.appService.date();
  }

  @Get('pickacolor/:colorNum')
  pickacolor(@Param('colorNum') colorNum: string) {
    const colorName = this.appService.pickacolor(colorNum);
    if (!colorName) {
      throw new HttpException(
        `No color exists for this number ${colorNum}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return { ColorName: colorName };
  }



}

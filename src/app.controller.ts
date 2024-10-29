import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

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
  multi(): any {
    return this.appService.multi();
  }

  @Post('login')
  login(@Body() body: { inputusername: string; inputuserpassword: string }) {
    const { inputusername, inputuserpassword } = body;
    return { message: this.appService.login(inputusername, inputuserpassword) };
  }

  @Get('date')
  date() {
    return this.appService.date();
  }

  @Post('pickacolor/:colorNum')
  pickacolor(@Param('colorNum') colorNum: string) {
    return { ColorName: this.appService.pickacolor(colorNum) };
  }
  
}

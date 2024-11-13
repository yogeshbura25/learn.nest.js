import { Controller,Get, UseGuards,} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/guards';

@Controller('user')
export class UserController {
constructor(
    private readonly userService:UserService
) {}

@Get('/hello')
@UseGuards(JwtGuard)
getHello( ): string {
  return this.userService.getHello();
}

@Get('multi')
@UseGuards(JwtGuard)
  multi(): any {
    return this.userService.multi();
  }

}



import { Controller,Get, UseGuards,} from '@nestjs/common';
import { UserService } from './user.service';
import { GuardsService } from 'src/guards/guards.service';





@Controller('user')
export class UserController {
constructor(
    private readonly userService:UserService
) {}

@Get('/hello')
@UseGuards(GuardsService)
getHello( ): string {
  return this.userService.getHello();
}

@Get('/multi')
@UseGuards(GuardsService)
  multi(): any {
    return this.userService.multi();
  }

  @Get('/mario')
@UseGuards(GuardsService)
  mario(): any {
    return this.userService.mario();
  }
}



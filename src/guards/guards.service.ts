import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { PrismaService } from '../prisma.service';
  
  @Injectable()
  export class GuardsService implements CanActivate {
    constructor(
      private readonly jwtService: JwtService,
      private readonly prisma: PrismaService, // Inject PrismaService
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers['authorization'];
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Authorization token is missing or invalid');
      }
  
      const token = authHeader.split(' ')[1];
  
      try {
        // Decode and verify the JWT
        const decodedToken = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
  
        // Ensure the token contains an `id`
        if (!decodedToken.email) {
          throw new UnauthorizedException('Token is invalid');
        }
  
        // Check if the user exists in the database by `id`
        const user = await this.prisma.user.findUnique({
            where: { email: decodedToken.email }, // Ensure `id` is in the token payload
          });
    
        if (!user) {
          throw new UnauthorizedException('User does not exist');
        }
  
        // Attach the user information to the request object
        request.user = user;
        return true;
      } catch (err) {
        if (err.name === 'TokenExpiredError') {
          throw new UnauthorizedException('Token has expired');
        }
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }
  
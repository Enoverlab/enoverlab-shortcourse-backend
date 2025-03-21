
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
import { UserService } from 'src/short-course/user/user.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private userService : UserService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const JWT_SECRET = process.env.JWT_SECRET
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromRequest(request);
      if (!token) {
        throw new UnauthorizedException('No token found');
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: JWT_SECRET
          }
        );

        request['user'] = await this.userService.findUserById(payload.sub);

      } catch(error) {
        throw new UnauthorizedException(error);
      }
      return true;
    }
  
    private extractTokenFromRequest(request: Request): string | undefined {
        if(request && request.signedCookies){
          return request.signedCookies.auth_token
        }
        return undefined
    }
  }

  
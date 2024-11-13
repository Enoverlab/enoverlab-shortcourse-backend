
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const JWT_SECRET = process.env.JWT_SECRET
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromRequest(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: JWT_SECRET
          }
        );

        console.log(payload)
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
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
  
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/short-course/user/user.service';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private userService;
    constructor(jwtService: JwtService, userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromRequest;
}

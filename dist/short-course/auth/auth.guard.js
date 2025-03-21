"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
let AuthGuard = class AuthGuard {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async canActivate(context) {
        const JWT_SECRET = process.env.JWT_SECRET;
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromRequest(request);
        if (!token) {
            throw new common_1.UnauthorizedException('No token found');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: JWT_SECRET
            });
            request['user'] = await this.userService.findUserById(payload.sub);
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error);
        }
        return true;
    }
    extractTokenFromRequest(request) {
        if (request && request.signedCookies) {
            return request.signedCookies.auth_token;
        }
        return undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, user_service_1.UserService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map
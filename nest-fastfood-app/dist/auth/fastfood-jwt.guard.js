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
exports.ensureRole = exports.getUserId = exports.FastfoodJwtGuard = void 0;
const common_1 = require("@nestjs/common");
const auth_ms_client_1 = require("./auth-ms.client");
const rxjs_1 = require("rxjs");
let FastfoodJwtGuard = class FastfoodJwtGuard {
    ms;
    constructor(ms) {
        this.ms = ms;
    }
    async canActivate(ctx) {
        const req = ctx.switchToHttp().getRequest();
        const header = req.headers.authorization || '';
        const token = header.startsWith('Bearer ') ? header.slice(7) : '';
        if (!token)
            throw new common_1.UnauthorizedException('Missing token');
        try {
            const payload = await (0, rxjs_1.firstValueFrom)(this.ms.sendVerify(token));
            req.user = payload;
            return true;
        }
        catch (err) {
            if (err?.code === 'ECONNREFUSED' ||
                err?.message?.includes('ECONNREFUSED')) {
                throw new common_1.ServiceUnavailableException('Authentication Service (:8888) is not activated!');
            }
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
exports.FastfoodJwtGuard = FastfoodJwtGuard;
exports.FastfoodJwtGuard = FastfoodJwtGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_ms_client_1.AuthMsClient])
], FastfoodJwtGuard);
const getUserId = (req) => req?.user?.sub;
exports.getUserId = getUserId;
const ensureRole = (req, role) => {
    if (!req.user?.roles?.includes(role)) {
        throw new common_1.ForbiddenException(`Only ${role} can access this resource.`);
    }
};
exports.ensureRole = ensureRole;
//# sourceMappingURL=fastfood-jwt.guard.js.map
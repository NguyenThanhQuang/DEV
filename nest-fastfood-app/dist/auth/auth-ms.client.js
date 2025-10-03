"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMsClient = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const AUTH_MS_HOST = '127.0.0.1';
const AUTH_MS_PORT = 4010;
let AuthMsClient = class AuthMsClient {
    client = microservices_1.ClientProxyFactory.create({
        transport: microservices_1.Transport.TCP,
        options: { host: AUTH_MS_HOST, port: AUTH_MS_PORT },
    });
    sendVerify(token) {
        return this.client.send('auth.verify', { token });
    }
};
exports.AuthMsClient = AuthMsClient;
exports.AuthMsClient = AuthMsClient = __decorate([
    (0, common_1.Injectable)()
], AuthMsClient);
//# sourceMappingURL=auth-ms.client.js.map
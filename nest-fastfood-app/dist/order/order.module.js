"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const order_controller_1 = require("./order.controller");
const mongoose_1 = require("@nestjs/mongoose");
const order_entity_1 = require("./entities/order.entity");
const menu_module_1 = require("../menu/menu.module");
const auth_client_module_1 = require("../auth/auth-client.module");
const fastfood_jwt_guard_1 = require("../auth/fastfood-jwt.guard");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: order_entity_1.Order.name, schema: order_entity_1.OrderSchema }]),
            menu_module_1.MenuModule,
            auth_client_module_1.AuthClientModule,
        ],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService, fastfood_jwt_guard_1.FastfoodJwtGuard],
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const category_module_1 = require("./category/category.module");
const menu_module_1 = require("./menu/menu.module");
const order_module_1 = require("./order/order.module");
const review_module_1 = require("./review/review.module");
const mongoose_1 = require("@nestjs/mongoose");
const auth_ms_client_1 = require("./auth/auth-ms.client");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/nest-fastfood'),
            category_module_1.CategoryModule,
            menu_module_1.MenuModule,
            order_module_1.OrderModule,
            review_module_1.ReviewModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, auth_ms_client_1.AuthMsClient],
        exports: [auth_ms_client_1.AuthMsClient],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
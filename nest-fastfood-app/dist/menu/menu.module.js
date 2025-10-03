"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuModule = void 0;
const common_1 = require("@nestjs/common");
const menu_service_1 = require("./menu.service");
const menu_controller_1 = require("./menu.controller");
const mongoose_1 = require("@nestjs/mongoose");
const menu_entity_1 = require("./entities/menu.entity");
const category_module_1 = require("../category/category.module");
const auth_client_module_1 = require("../auth/auth-client.module");
const fastfood_jwt_guard_1 = require("../auth/fastfood-jwt.guard");
let MenuModule = class MenuModule {
};
exports.MenuModule = MenuModule;
exports.MenuModule = MenuModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: menu_entity_1.Menu.name, schema: menu_entity_1.MenuSchema }]),
            category_module_1.CategoryModule,
            auth_client_module_1.AuthClientModule,
        ],
        controllers: [menu_controller_1.MenuController],
        providers: [menu_service_1.MenuService, fastfood_jwt_guard_1.FastfoodJwtGuard],
        exports: [menu_service_1.MenuService],
    })
], MenuModule);
//# sourceMappingURL=menu.module.js.map
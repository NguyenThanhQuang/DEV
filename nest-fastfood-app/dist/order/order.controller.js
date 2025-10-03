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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const fastfood_jwt_guard_1 = require("../auth/fastfood-jwt.guard");
let OrderController = class OrderController {
    orderService;
    constructor(orderService) {
        this.orderService = orderService;
    }
    async loadAndAuthorize(req, id) {
        const order = await this.orderService.findOne(id);
        if (order.userId !== (0, fastfood_jwt_guard_1.getUserId)(req)) {
            (0, fastfood_jwt_guard_1.ensureRole)(req, 'admin');
        }
        return order;
    }
    findAll(req) {
        (0, fastfood_jwt_guard_1.ensureRole)(req, 'admin');
        return this.orderService.findAll();
    }
    async findOne(req, id) {
        return this.loadAndAuthorize(req, id);
    }
    create(req, dto) {
        return this.orderService.create(dto, (0, fastfood_jwt_guard_1.getUserId)(req));
    }
    async update(req, id, dto) {
        await this.loadAndAuthorize(req, id);
        return this.orderService.update(id, dto);
    }
    async remove(req, id) {
        await this.loadAndAuthorize(req, id);
        const deleted = await this.orderService.remove(id);
        return { id: deleted.id, message: 'Your order has been deleted.' };
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.UseGuards)(fastfood_jwt_guard_1.FastfoodJwtGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(fastfood_jwt_guard_1.FastfoodJwtGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(fastfood_jwt_guard_1.FastfoodJwtGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(fastfood_jwt_guard_1.FastfoodJwtGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(fastfood_jwt_guard_1.FastfoodJwtGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "remove", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map
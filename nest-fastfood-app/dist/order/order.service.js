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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_entity_1 = require("./entities/order.entity");
const menu_service_1 = require("../menu/menu.service");
let OrderService = class OrderService {
    orderModel;
    menuService;
    constructor(orderModel, menuService) {
        this.orderModel = orderModel;
        this.menuService = menuService;
    }
    async calculateTotal(itemIds) {
        let total = 0;
        for (const id of itemIds) {
            const item = await this.menuService.findOne(id);
            total += item.price;
        }
        return total;
    }
    async create(dto, userId) {
        const total = await this.calculateTotal(dto.items);
        const order = new this.orderModel({ ...dto, total, userId });
        return order.save();
    }
    async findAll() {
        return this.orderModel.find().populate('items').exec();
    }
    async findOne(id) {
        const order = await this.orderModel.findById(id).populate('items').exec();
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async update(id, dto) {
        const total = dto.items ? await this.calculateTotal(dto.items) : undefined;
        const updated = await this.orderModel
            .findByIdAndUpdate(id, { ...dto, ...(total !== undefined ? { total } : {}) }, { new: true })
            .populate('items');
        if (!updated)
            throw new common_1.NotFoundException('Order not found');
        return updated;
    }
    async remove(id) {
        const deleted = await this.orderModel.findByIdAndDelete(id);
        if (!deleted)
            throw new common_1.NotFoundException('Order not found');
        return deleted;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_entity_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        menu_service_1.MenuService])
], OrderService);
//# sourceMappingURL=order.service.js.map
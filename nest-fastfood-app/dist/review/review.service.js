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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const review_entity_1 = require("./entities/review.entity");
const menu_service_1 = require("../menu/menu.service");
let ReviewService = class ReviewService {
    reviewModel;
    menuService;
    constructor(reviewModel, menuService) {
        this.reviewModel = reviewModel;
        this.menuService = menuService;
    }
    async create(dto, userId) {
        await this.menuService.findOne(dto.item);
        return new this.reviewModel({ ...dto, userId }).save();
    }
    async findAll() {
        return this.reviewModel
            .find()
            .populate({ path: 'item', select: 'name' })
            .sort({ createdAt: -1 })
            .exec();
    }
    async findOne(id) {
        const review = await this.reviewModel.findById(id).populate('item').exec();
        if (!review)
            throw new common_1.NotFoundException('Review not found');
        return review;
    }
    async update(id, dto) {
        const updated = await this.reviewModel
            .findByIdAndUpdate(id, dto, { new: true })
            .populate('item')
            .exec();
        if (!updated)
            throw new common_1.NotFoundException('Review not found');
        return updated;
    }
    async remove(id) {
        const deleted = await this.reviewModel.findByIdAndDelete(id).exec();
        if (!deleted)
            throw new common_1.NotFoundException('Review not found');
        return deleted;
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(review_entity_1.Review.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        menu_service_1.MenuService])
], ReviewService);
//# sourceMappingURL=review.service.js.map
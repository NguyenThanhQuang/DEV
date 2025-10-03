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
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const menu_entity_1 = require("./entities/menu.entity");
const mongoose_2 = require("mongoose");
const category_service_1 = require("../category/category.service");
let MenuService = class MenuService {
    menuModel;
    categoryService;
    constructor(menuModel, categoryService) {
        this.menuModel = menuModel;
        this.categoryService = categoryService;
    }
    async create(createMenuDto) {
        const category = await this.categoryService.findOne(createMenuDto.category);
        if (!category)
            throw new common_1.NotFoundException('Not Found Any Category');
        const createdMenu = new this.menuModel(createMenuDto);
        return (await createdMenu.save()).populate('category', 'name');
    }
    async findAll() {
        return this.menuModel.find().exec();
    }
    async findOne(id) {
        const menu = await this.menuModel.findById(id).exec();
        if (!menu)
            throw new common_1.NotFoundException('Not Found Any Menu');
        return menu;
    }
    async update(id, updateMenuDto) {
        if (updateMenuDto.category) {
            await this.categoryService.findOne(updateMenuDto.category);
        }
        const updatedMenu = await this.menuModel
            .findByIdAndUpdate(id, updateMenuDto, { new: true })
            .populate('category')
            .exec();
        if (!updatedMenu)
            throw new common_1.NotFoundException('Not Found Any Menu');
        return await updatedMenu.save();
    }
    async remove(id) {
        const deletedMenu = await this.menuModel.findByIdAndDelete(id).exec();
        if (!deletedMenu)
            throw new common_1.NotFoundException('Not Found Any Menu');
        return deletedMenu;
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(menu_entity_1.Menu.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        category_service_1.CategoryService])
], MenuService);
//# sourceMappingURL=menu.service.js.map
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { Model } from 'mongoose';
import { CategoryService } from 'src/category/category.service';
export declare class MenuService {
    private menuModel;
    private readonly categoryService;
    constructor(menuModel: Model<Menu>, categoryService: CategoryService);
    create(createMenuDto: CreateMenuDto): Promise<Menu>;
    findAll(): Promise<Menu[]>;
    findOne(id: string): Promise<Menu>;
    update(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, Menu, {}, {}> & Menu & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}

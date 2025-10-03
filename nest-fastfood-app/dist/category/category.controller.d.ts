import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(): Promise<import("./entities/category.entity").Category[]>;
    findOne(id: string): Promise<import("./entities/category.entity").Category>;
    create(req: any, dto: CreateCategoryDto): Promise<import("./entities/category.entity").Category>;
    update(req: any, id: string, dto: UpdateCategoryDto): Promise<import("./entities/category.entity").Category>;
    remove(req: any, id: string): Promise<import("mongoose").Document<unknown, {}, import("./entities/category.entity").Category, {}, {}> & import("./entities/category.entity").Category & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}

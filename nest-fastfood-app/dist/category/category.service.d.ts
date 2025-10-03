import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
export declare class CategoryService {
    private categoryModel;
    constructor(categoryModel: Model<Category>);
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, Category, {}, {}> & Category & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}

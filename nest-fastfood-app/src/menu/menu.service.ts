import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Menu } from './entities/menu.entity';
import { Model } from 'mongoose';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name) private menuModel: Model<Menu>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const category = await this.categoryService.findOne(createMenuDto.category);
    if (!category) throw new NotFoundException('Not Found Any Category');
    const createdMenu = new this.menuModel(createMenuDto);
    return (await createdMenu.save()).populate('category', 'name');
  }

  async findAll(): Promise<Menu[]> {
    return this.menuModel.find().exec();
  }

  async findOne(id: string): Promise<Menu> {
    const menu = await this.menuModel.findById(id).exec();
    if (!menu) throw new NotFoundException('Not Found Any Menu');
    return menu;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    if (updateMenuDto.category) {
      await this.categoryService.findOne(updateMenuDto.category);
    }
    const updatedMenu = await this.menuModel
      .findByIdAndUpdate(id, updateMenuDto, { new: true })
      .populate('category')
      .exec();
    if (!updatedMenu) throw new NotFoundException('Not Found Any Menu');
    return await updatedMenu.save();
  }

  async remove(id: string) {
    const deletedMenu = await this.menuModel.findByIdAndDelete(id).exec();
    if (!deletedMenu) throw new NotFoundException('Not Found Any Menu');
    return deletedMenu;
  }
}

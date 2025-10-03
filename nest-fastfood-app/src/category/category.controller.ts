import {Controller,Get,Post,Body,Patch,Param,Delete,UseGuards,Req,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FastfoodJwtGuard, ensureRole } from 'src/auth/fastfood-jwt.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get() findAll(){return this.categoryService.findAll();}

  @Get(':id')
  findOne(@Param('id') id: string) {return this.categoryService.findOne(id);}

  @UseGuards(FastfoodJwtGuard)
  @Post()
  create(@Req() req: any, @Body() dto: CreateCategoryDto) {
    ensureRole(req, 'admin');
    return this.categoryService.create(dto);
  }

  @UseGuards(FastfoodJwtGuard)
  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    ensureRole(req, 'admin');
    return this.categoryService.update(id, dto);
  }

  @UseGuards(FastfoodJwtGuard)
  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    ensureRole(req, 'admin');
    return this.categoryService.remove(id);
  }
}

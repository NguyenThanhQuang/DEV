import {Controller,Get,Post,Body,Patch,Param,Delete,UseGuards,Req,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { FastfoodJwtGuard, ensureRole } from 'src/auth/fastfood-jwt.guard';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }


  @UseGuards(FastfoodJwtGuard)
  @Post()
  create(@Req() req: any, @Body() dto: CreateMenuDto) {
    ensureRole(req, 'admin');
    return this.menuService.create(dto);
  }


  @UseGuards(FastfoodJwtGuard)
  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateMenuDto) {
    ensureRole(req, 'admin');
    return this.menuService.update(id, dto);
  }


  @UseGuards(FastfoodJwtGuard)
  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    ensureRole(req, 'admin');
    return this.menuService.remove(id);
  }
}

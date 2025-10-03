import {Controller,Get,Post,Body,Patch,Param,Delete,UseGuards,Req
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {FastfoodJwtGuard,getUserId,ensureRole
} from 'src/auth/fastfood-jwt.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /** Helper: load order; nếu không phải owner thì buộc phải là admin */
  private async loadAndAuthorize(req: any, id: string) {
    const order = await this.orderService.findOne(id);
    if ((order as any).userId !== getUserId(req)) {
      ensureRole(req, 'admin'); // ném Forbidden nếu không phải admin
    }
    return order;
  }

  // Admin xem tất cả
  @UseGuards(FastfoodJwtGuard)
  @Get()
  findAll(@Req() req: any) {
    ensureRole(req, 'admin');
    return this.orderService.findAll();
  }

  // Owner hoặc Admin xem 1 đơn
  @UseGuards(FastfoodJwtGuard)
  @Get(':id')
  async findOne(@Req() req: any, @Param('id') id: string) {
    return this.loadAndAuthorize(req, id); // đã enforce quyền trong helper
  }

  // Tạo đơn: gán userId từ JWT
  @UseGuards(FastfoodJwtGuard)
  @Post()
  create(@Req() req: any, @Body() dto: CreateOrderDto) {
    // if (req.user?.roles?.includes('admin')) {
    //   throw new ForbiddenException('Admins are not allowed to place orders.');
    // }
    return this.orderService.create(dto, getUserId(req));
  }

  // Update: owner hoặc admin
  @UseGuards(FastfoodJwtGuard)
  @Patch(':id')
  async update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateOrderDto,
  ) {
    await this.loadAndAuthorize(req, id);
    return this.orderService.update(id, dto);
  }

  // Delete: owner hoặc admin
  @UseGuards(FastfoodJwtGuard)
  @Delete(':id')
  async remove(@Req() req: any, @Param('id') id: string) {
    await this.loadAndAuthorize(req, id);
    const deleted = await this.orderService.remove(id);
    return { id: deleted.id, message: 'Your order has been deleted.' };
  }
}

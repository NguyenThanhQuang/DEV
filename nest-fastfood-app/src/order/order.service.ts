import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';
import { MenuService } from 'src/menu/menu.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private menuService: MenuService,
  ) {}

  async calculateTotal(itemIds: string[]): Promise<number> {
    let total = 0;
    for (const id of itemIds) {
      const item = await this.menuService.findOne(id);
      total += item.price;
    }
    return total;
  }

  async create(dto: CreateOrderDto, userId: string): Promise<Order> {
    const total = await this.calculateTotal(dto.items);
    const order = new this.orderModel({ ...dto, total, userId });
    return order.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().populate('items').exec();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).populate('items').exec();
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async update(id: string, dto: UpdateOrderDto): Promise<Order> {
    const total = dto.items ? await this.calculateTotal(dto.items) : undefined;

    const updated = await this.orderModel
      .findByIdAndUpdate(
        id,
        { ...dto, ...(total !== undefined ? { total } : {}) },
        { new: true },
      )
      .populate('items');

    if (!updated) throw new NotFoundException('Order not found');
    return updated;
  }

  async remove(id: string): Promise<Order> {
    const deleted = await this.orderModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Order not found');
    return deleted;
  }
}

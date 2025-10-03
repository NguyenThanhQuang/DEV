import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';
import { MenuService } from 'src/menu/menu.service';
export declare class OrderService {
    private orderModel;
    private menuService;
    constructor(orderModel: Model<Order>, menuService: MenuService);
    calculateTotal(itemIds: string[]): Promise<number>;
    create(dto: CreateOrderDto, userId: string): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    update(id: string, dto: UpdateOrderDto): Promise<Order>;
    remove(id: string): Promise<Order>;
}

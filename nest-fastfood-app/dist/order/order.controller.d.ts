import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    private loadAndAuthorize;
    findAll(req: any): Promise<import("./entities/order.entity").Order[]>;
    findOne(req: any, id: string): Promise<import("./entities/order.entity").Order>;
    create(req: any, dto: CreateOrderDto): Promise<import("./entities/order.entity").Order>;
    update(req: any, id: string, dto: UpdateOrderDto): Promise<import("./entities/order.entity").Order>;
    remove(req: any, id: string): Promise<{
        id: any;
        message: string;
    }>;
}

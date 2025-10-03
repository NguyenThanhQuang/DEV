import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    findAll(): Promise<import("./entities/menu.entity").Menu[]>;
    findOne(id: string): Promise<import("./entities/menu.entity").Menu>;
    create(req: any, dto: CreateMenuDto): Promise<import("./entities/menu.entity").Menu>;
    update(req: any, id: string, dto: UpdateMenuDto): Promise<import("./entities/menu.entity").Menu>;
    remove(req: any, id: string): Promise<import("mongoose").Document<unknown, {}, import("./entities/menu.entity").Menu, {}, {}> & import("./entities/menu.entity").Menu & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}

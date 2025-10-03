import { Document, Types } from 'mongoose';
export declare class Menu extends Document {
    name: string;
    price: number;
    category: Types.ObjectId;
}
export declare const MenuSchema: import("mongoose").Schema<Menu, import("mongoose").Model<Menu, any, any, any, Document<unknown, any, Menu, any, {}> & Menu & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Menu, Document<unknown, {}, import("mongoose").FlatRecord<Menu>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Menu> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

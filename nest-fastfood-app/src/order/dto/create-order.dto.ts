import { IsArray, IsMongoId } from 'class-validator';

export class CreateOrderDto {

  // No more user here.

  @IsArray()
  @IsMongoId({ each: true })
  items: string[];
}

import {
  IsMongoId,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @Length(5, 50)
  name: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  price: number;

  @IsMongoId()
  category: string;
}

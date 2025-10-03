import { IsInt, IsMongoId, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {

  // No more user here.

  @IsMongoId()
  item: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  comment: string;
}

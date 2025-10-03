import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Model } from 'mongoose';
import { Review } from './entities/review.entity';
import { MenuService } from 'src/menu/menu.service';
export declare class ReviewService {
    private reviewModel;
    private menuService;
    constructor(reviewModel: Model<Review>, menuService: MenuService);
    create(dto: CreateReviewDto, userId: string): Promise<Review>;
    findAll(): Promise<Review[]>;
    findOne(id: string): Promise<Review>;
    update(id: string, dto: UpdateReviewDto): Promise<Review>;
    remove(id: string): Promise<Review>;
}

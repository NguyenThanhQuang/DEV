import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    private loadAndAuthorize;
    create(req: any, dto: CreateReviewDto): Promise<import("./entities/review.entity").Review>;
    findAll(): Promise<import("./entities/review.entity").Review[]>;
    findOne(id: string): Promise<import("./entities/review.entity").Review>;
    update(req: any, id: string, dto: UpdateReviewDto): Promise<import("./entities/review.entity").Review>;
    remove(req: any, id: string): Promise<import("./entities/review.entity").Review>;
}

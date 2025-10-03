import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './entities/review.entity';
import { MenuService } from 'src/menu/menu.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    private menuService: MenuService,
  ) {}

  async create(dto: CreateReviewDto, userId: string): Promise<Review> {
    await this.menuService.findOne(dto.item);
    return new this.reviewModel({ ...dto, userId }).save();
  }

  async findAll(): Promise<Review[]> {
    return this.reviewModel
      .find()
      .populate({ path: 'item', select: 'name' })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id).populate('item').exec();
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async update(id: string, dto: UpdateReviewDto): Promise<Review> {
    const updated = await this.reviewModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('item')
      .exec();
    if (!updated) throw new NotFoundException('Review not found');
    return updated;
  }

  async remove(id: string): Promise<Review> {
    const deleted = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Review not found');
    return deleted;
  }
}

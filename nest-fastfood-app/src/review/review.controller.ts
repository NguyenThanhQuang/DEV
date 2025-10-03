import {Controller,Get,Post,Body,Patch,Param,Delete,UseGuards,Req,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import {FastfoodJwtGuard,getUserId,ensureRole,
} from 'src/auth/fastfood-jwt.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  private async loadAndAuthorize(req: any, id: string) {
    const review = await this.reviewService.findOne(id);
    if ((review as any).userId !== getUserId(req)) {
      ensureRole(req, 'admin'); 
    }
    return review;
  }

  @UseGuards(FastfoodJwtGuard)
  @Post()
  create(@Req() req: any, @Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto, getUserId(req));
  }

  @Get() findAll() { return this.reviewService.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @UseGuards(FastfoodJwtGuard)
  @Patch(':id')
  async update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateReviewDto,
  ) {
    await this.loadAndAuthorize(req, id);
    return this.reviewService.update(id, dto);
  }

  @UseGuards(FastfoodJwtGuard)
  @Delete(':id')
  async remove(@Req() req: any, @Param('id') id: string) {
    await this.loadAndAuthorize(req, id);
    return this.reviewService.remove(id);
  }
}

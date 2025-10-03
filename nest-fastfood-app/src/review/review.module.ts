import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './entities/review.entity';
import { MenuModule } from 'src/menu/menu.module';
import { AuthClientModule } from 'src/auth/auth-client.module';
import { FastfoodJwtGuard } from 'src/auth/fastfood-jwt.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    MenuModule,
    AuthClientModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService, FastfoodJwtGuard],
})
export class ReviewModule {}

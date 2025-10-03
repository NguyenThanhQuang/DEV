import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { AuthClientModule } from 'src/auth/auth-client.module';
import { FastfoodJwtGuard } from 'src/auth/fastfood-jwt.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    AuthClientModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService, FastfoodJwtGuard],
  exports: [CategoryService],
})
export class CategoryModule {}

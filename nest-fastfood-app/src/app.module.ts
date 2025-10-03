import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMsClient } from './auth/auth-ms.client';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-fastfood'),
    CategoryModule,
    MenuModule,
    OrderModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthMsClient],
  exports: [AuthMsClient],
})
export class AppModule {}

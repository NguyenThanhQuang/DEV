import { Module } from '@nestjs/common';
import { AuthMsClient } from './auth-ms.client';

@Module({
  providers: [AuthMsClient],
  exports: [AuthMsClient],
})
export class AuthClientModule {}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  ServiceUnavailableException,
} from '@nestjs/common';

import { AuthMsClient } from './auth-ms.client';
import { firstValueFrom } from 'rxjs';
// remove JWT_SECRET
@Injectable()
export class FastfoodJwtGuard implements CanActivate {
  constructor(private ms: AuthMsClient) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';
    if (!token) throw new UnauthorizedException('Missing token');

    try {
      const payload = await firstValueFrom(this.ms.sendVerify(token));
      req.user = payload;
      return true;
    } catch (err: any) {
      if (
        err?.code === 'ECONNREFUSED' ||
        err?.message?.includes('ECONNREFUSED')
      ) {
        throw new ServiceUnavailableException(
          'Authentication Service (:8888) is not activated!',
        );
      }
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

export const getUserId = (req: any): string => req?.user?.sub;
export const ensureRole = (req: any, role: string) => {
  if (!req.user?.roles?.includes(role)) {
    throw new ForbiddenException(`Only ${role} can access this resource.`);
  }
};

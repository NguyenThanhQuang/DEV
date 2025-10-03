import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthMsClient } from './auth-ms.client';
export declare class FastfoodJwtGuard implements CanActivate {
    private ms;
    constructor(ms: AuthMsClient);
    canActivate(ctx: ExecutionContext): Promise<boolean>;
}
export declare const getUserId: (req: any) => string;
export declare const ensureRole: (req: any, role: string) => void;

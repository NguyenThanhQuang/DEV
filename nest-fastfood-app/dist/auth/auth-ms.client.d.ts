export declare class AuthMsClient {
    private client;
    sendVerify(token: string): import("rxjs").Observable<{
        sub: string;
        email: string;
        roles: string[];
    }>;
}

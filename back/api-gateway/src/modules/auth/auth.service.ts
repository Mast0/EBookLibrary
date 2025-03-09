import { Injectable, Logger, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { timeout, catchError, throwError, firstValueFrom } from "rxjs";

import { TokenPayload, Tokens } from "./dto";
import { patterns } from "../patterns";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    ) {}

    private send(pattern: any, data: any): Promise<any> {
        const res$ = this.authService.send(pattern, data).pipe(
          timeout(3000),
          catchError((e: Error) => {
            this.logger.error(e);
            return throwError(() => e);
          }),
        );
    
        return firstValueFrom(res$);
    }

    async generateToken(dto: TokenPayload) {
        this.logger.log('Generating token');
        return this.send(patterns.AUTH.TOKENS, dto);
    }

    async verifyAccessToken(token: string) {
        this.logger.log('Verifying access token');
        return this.send(patterns.AUTH.VERIFY, token);
    }

    async refreshTokens(refreshToken: string) {
        this.logger.log('Refreshing tokens');
        return this.send(patterns.AUTH.REFRESH, refreshToken);
    }
}
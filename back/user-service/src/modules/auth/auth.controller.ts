import { Controller, Logger } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AuthService } from "./auth.service";

import { Tokens, TokenPayload } from "./dto";
import { patterns } from "../patterns";

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(patterns.AUTH.TOKENS)
  async generateTokens(dto): Promise<Tokens> {
    this.logger.log('Generate tokens');
    return this.authService.generateToken(dto);
  }

  @MessagePattern(patterns.AUTH.VERIFY)
  async verifyToken(data: {token: string}): Promise<TokenPayload> {
    this.logger.log('Verifying token');
    return this.authService.verifyAccessToken(data.token);
  }

  @MessagePattern(patterns.AUTH.REFRESH)
  async refreshTokens(dto): Promise<Tokens> {
    this.logger.log('Refreshing tokens');
    return this.authService.refreshTokens(dto);
  }
}
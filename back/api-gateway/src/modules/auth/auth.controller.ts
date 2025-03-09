import { Controller, Logger, Post, Body } from "@nestjs/common";
import { TokenPayload } from "./dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async loginUser(@Body() tokenPayload: TokenPayload) {
        this.logger.log('Generating access token');
        return this.authService.generateToken(tokenPayload);
    }
}
import { Injectable, 
  CanActivate, 
  ExecutionContext, 
  Logger 
} from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { patterns } from "src/modules/patterns";

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token){
      return false;
    }

    try{
      const user = await firstValueFrom(
        this.userClient.send(patterns.AUTH.VERIFY, { token }),
      );

      request.user = user;
      return true;
    } catch (err) {
      this.logger.error(err);
      return false;
    }
  }
}
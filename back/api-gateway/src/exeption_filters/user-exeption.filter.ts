import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

@Catch(RpcException)
export class UserExeptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getError().status

        response.status(status).json({
            statusCode: status,
            message: exception.getError().message,
        })
    }
}
import { Module } from "@nestjs/common";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: 'AUTH_SERVICE',
            useFactory: () => 
                ClientProxyFactory.create({
                    transport: Transport.RMQ as any,
                    options: {
                        urls: [process.env.BROCKER_URI],
                        queue: 'auth-service',
                        queueOptions: { durable: false },
                    },
                }),
        },
    ],
})
export class AuthModule {}
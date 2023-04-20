import {forwardRef, Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {ProfileModule} from "../profile/profile.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		JwtModule.register({
			secret: process.env.SECRET || 'THIS_IS_SECRET',
			signOptions: {
				expiresIn: process.env.EXPIRES_IN || '24h'
			}
		}),
		ClientsModule.register([
			{
				name: 'AUTH_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: [`amqp://rabbitmq:5672`],
					queue: 'dev-queue',
					queueOptions: {
						durable: true
					},
				},
			}
		]),
		forwardRef(() => ProfileModule)
	],
	exports: [AuthService, JwtModule]
})
export class AuthModule {
}

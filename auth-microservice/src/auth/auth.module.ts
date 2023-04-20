import {forwardRef, Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./models/users.model";
import {JwtModule} from "@nestjs/jwt";
import {ProfileModule} from "../profile/profile.module";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		SequelizeModule.forFeature([User]),
		JwtModule.register({
			secret: 'THIS_IS_SECRET',
			signOptions: {
				expiresIn: '24h'
			}
		}),
		forwardRef(() => ProfileModule),
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
			},
		]),
	], exports: [AuthService, JwtModule]
})


export class AuthModule {
}

import {forwardRef, Module} from '@nestjs/common';
import {ProfileController} from './profile.controller';
import {ProfileService} from './profile.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {AuthModule} from "../auth/auth.module";

@Module({
	controllers: [ProfileController],
	providers: [ProfileService],
	imports: [
		forwardRef(() => AuthModule),
		ClientsModule.register([
			{
				name: 'PROFILE_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: [`amqp://rabbitmq:5672`],
					queue: 'profile-queue',
					queueOptions: {
						durable: true
					},
				},
			},
		]),
	]
})
export class ProfileModule {
}

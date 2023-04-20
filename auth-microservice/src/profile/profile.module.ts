import {forwardRef, Module} from '@nestjs/common';
import {ProfileService} from './profile.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {AuthModule} from "../auth/auth.module";

@Module({
	providers: [ProfileService],
	imports: [
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
		forwardRef(() => AuthModule)
	],
	exports: [ProfileService]
})
export class ProfileModule {
}

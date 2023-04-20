import {Module} from '@nestjs/common';
import {ProfileController} from './profile.controller';
import {ProfileService} from './profile.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Profile} from "./models/profile.model";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
	controllers: [ProfileController],
	providers: [ProfileService],
	imports: [
		SequelizeModule.forFeature([Profile]),
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

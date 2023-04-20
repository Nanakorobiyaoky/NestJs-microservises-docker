import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {UserProfileWithIdDto} from "../auth/dto/user-profile-with-id.dto";

@Injectable()
export class ProfileService {
	constructor(@Inject('PROFILE_SERVICE') private readonly client: ClientProxy) {
	}

	async createProfile(userProfileWithIdDto: UserProfileWithIdDto) {
		const res = await this.client.send({cmd: 'create profile'}, userProfileWithIdDto)
		return res
	}

	async getProfile(id: number) {
		const res = await this.client.send({cmd: 'get profile'}, id)
		return res
	}
}

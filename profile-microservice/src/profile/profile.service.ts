import {HttpStatus, Injectable} from '@nestjs/common';
import {UserProfileWithIdDto} from "./dto/user-profile-with-id.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Profile} from "./models/profile.model";
import {RpcException} from "@nestjs/microservices";

@Injectable()
export class ProfileService {

	constructor(@InjectModel(Profile) private readonly profileRepository: typeof Profile) {
	}

	async updateProfile(profileDto: UserProfileWithIdDto) {
		const profile = await this.profileRepository.findByPk(profileDto.id)

		if (!profile) {
			throw new RpcException({
				message: 'User with this id does not exists',
				status: HttpStatus.BAD_REQUEST
			})
		}

		for (let key in profileDto) {
			if (profileDto[key] && key !== 'id') {
				profile[key] = profileDto[key];
			}
		}

		await profile.save()
		return profile
	}

	async createProfile(profileDto: UserProfileWithIdDto) {
		const profile = await this.profileRepository.create(profileDto)
		return profile
	}

	async getProfileById(id: number) {
		const profile = await this.profileRepository.findByPk(id)
		return profile
	}
}

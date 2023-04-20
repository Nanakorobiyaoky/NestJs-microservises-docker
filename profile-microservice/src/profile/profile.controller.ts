import {Controller} from '@nestjs/common';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {ProfileService} from "./profile.service";
import {UserProfileWithIdDto} from "./dto/user-profile-with-id.dto";

@Controller('profile')
export class ProfileController {

	constructor(private readonly profileService: ProfileService) {
	}

	@MessagePattern({cmd: 'update profile'})
	updateCurrentUserProfile(@Payload() profileDto: UserProfileWithIdDto) {
		return this.profileService.updateProfile(profileDto);
	}

	@MessagePattern({cmd: 'create profile'})
	createProfile(@Payload() profileDto: UserProfileWithIdDto) {
		return this.profileService.createProfile(profileDto);
	}

	@MessagePattern({cmd: 'get profile'})
	getProfileById(@Payload() id: number) {
		return this.profileService.getProfileById(id);
	}
}

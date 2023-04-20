import {Body, Controller, Put, UseGuards, UsePipes} from '@nestjs/common';
import {ProfileService} from "./profile.service";
import {UserProfileWithIdDto} from "./dto/user-profile-with-id.dto";
import {ValidationPipe} from "../pipes/validation.pipe";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {JwtForAdminGuard} from "../guards/jwt-for-admin.guard";
import {UserIdGuard} from "../guards/user-id.guard";

@Controller('profile')
export class ProfileController {

	constructor(private readonly profileService: ProfileService) {
	}

	@UseGuards(JwtAuthGuard, UserIdGuard)
	@UsePipes(ValidationPipe)
	@Put()
	updateCurrentUserProfile(@Body() profileDto: UserProfileWithIdDto) {
		return this.profileService.updateProfile(profileDto);
	}

	@UseGuards(JwtAuthGuard, JwtForAdminGuard)
	@UsePipes(ValidationPipe)
	@Put('/admin')
	updateProfileById(@Body() profileDto: UserProfileWithIdDto) {
		return this.profileService.updateProfile(profileDto);
	}

}

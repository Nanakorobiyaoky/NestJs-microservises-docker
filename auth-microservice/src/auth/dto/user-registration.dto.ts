import {IsDefined, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import {UserProfileDto} from "./user-profile.dto";

export class UserRegistrationDto {

	@Length(4, 255, {message: 'Login must be longer than 4 characters'})
	@IsNotEmpty()
	@IsString()
	@IsDefined()
	readonly login: string

	@Length(4, 255, {message: 'Login must be longer than 4 characters'})
	@IsNotEmpty()
	@IsString()
	@IsDefined()
	readonly password: string

	@IsOptional()
	profile: UserProfileDto

}
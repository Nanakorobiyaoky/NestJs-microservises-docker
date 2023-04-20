import {IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, Length} from "class-validator";
import {UserProfileWithIdDto} from "./user-profile-with-id.dto";

export class UserResponseDataDto {

	@IsNumber()
	@IsDefined()
	id: number

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

	@IsDefined()
	profile: UserProfileWithIdDto

}
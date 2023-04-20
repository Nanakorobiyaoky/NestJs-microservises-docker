import {IsBoolean, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UserProfileDto {

	@IsNotEmpty()
	@IsString()
	@IsOptional()
	readonly firstName: string

	@IsNotEmpty()
	@IsString()
	@IsOptional()
	readonly lastName: string

	@IsNotEmpty()
	@IsString()
	@IsOptional()
	readonly phoneNumber: string

	@IsNotEmpty()
	@IsString()
	@IsOptional()
	readonly birthday: string

	@IsBoolean()
	@IsOptional()
	readonly isAdmin: boolean

}
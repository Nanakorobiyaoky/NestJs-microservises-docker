import {IsDefined, IsNotEmpty, IsString, Length} from "class-validator";


export class UserLoginDto {

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

}
import {IsDefined, IsNotEmpty, IsString, Length} from "class-validator";


export class UserLoginDto {

	@IsNotEmpty()
	@IsString()
	@IsDefined()
	readonly login: string

	@IsNotEmpty()
	@IsString()
	@IsDefined()
	readonly password: string

}
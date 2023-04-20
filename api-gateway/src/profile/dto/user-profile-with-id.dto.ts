import {UserProfileDto} from "./user-profile.dto";
import {IsDefined, IsNumber} from "class-validator";


export class UserProfileWithIdDto extends UserProfileDto {

	@IsNumber()
	@IsDefined()
	id: number
}
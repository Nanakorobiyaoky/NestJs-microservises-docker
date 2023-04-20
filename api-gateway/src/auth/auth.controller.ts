import {
	Body,
	Controller,
	Post,
	UsePipes
} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserRegistrationDto} from "./dto/user-registration.dto";
import {UserLoginDto} from "./dto/user-login.dto";
import {ValidationPipe} from "../pipes/validation.pipe";


@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) {
	}

	@UsePipes(ValidationPipe)
	@Post('/registration')
	registerUser(@Body() userRegistrationDto: UserRegistrationDto) {
		return this.authService.registerUser(userRegistrationDto);
	}


	@Post('/login')
	loginUser(@Body() userLoginDto: UserLoginDto) {
		return this.authService.loginUser(userLoginDto);
	}


}

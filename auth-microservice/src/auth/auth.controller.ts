import {Controller} from '@nestjs/common';
import {MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {UserRegistrationDto} from "./dto/user-registration.dto";
import {UserLoginDto} from "./dto/user-login.dto";
import {AuthService} from "./auth.service";

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@MessagePattern({cmd: 'registration'})
	registerUser(@Payload() userRegistrationDto: UserRegistrationDto) {
		return this.authService.registerUser(userRegistrationDto);
	}

	@MessagePattern({cmd: 'login'})
	loginUser(@Payload() userLoginDto: UserLoginDto) {
		return this.authService.loginUser(userLoginDto);
	}
}

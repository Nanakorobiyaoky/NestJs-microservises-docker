import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {UserRegistrationDto} from "./dto/user-registration.dto";
import {UserLoginDto} from "./dto/user-login.dto";
import {ClientProxy} from "@nestjs/microservices";
import {catchError, throwError, timeout,} from "rxjs";

@Injectable()
export class AuthService {

	constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {
	}

	async registerUser(userRegistrationDto: UserRegistrationDto) {
		const response = await this.client.send({cmd: 'registration'}, userRegistrationDto)
			.pipe(timeout({
					each: 2000,
					with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
				}),
				catchError((error) => {
					return throwError(() => new HttpException(error.message, error.status))
				})
			)

		return response;
	}

	async loginUser(userLoginDto: UserLoginDto) {
		const response = await this.client.send({cmd: 'login'}, userLoginDto)
			.pipe(timeout({
					each: 2000,
					with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
				}),
				catchError((error) => {
					return throwError(() => new HttpException(error.message, error.status));
				})
			)

		return response;
	}
}

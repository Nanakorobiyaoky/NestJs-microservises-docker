import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {UserProfileWithIdDto} from "./dto/user-profile-with-id.dto";
import {ClientProxy} from "@nestjs/microservices";
import {catchError, throwError, timeout} from "rxjs";

@Injectable()
export class ProfileService {

	constructor(@Inject('PROFILE_SERVICE') private readonly client: ClientProxy) {
	}

	async updateProfile(userProfileWithIdDto: UserProfileWithIdDto) {
		const response = await this.client.send({cmd: 'update profile'}, userProfileWithIdDto)
			.pipe(timeout({
				each: 2000,
				with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
			}),
				catchError((error) => {
					return throwError(() => new HttpException(error.message, error.status));
				})
			)

		return response
	}
}

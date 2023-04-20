import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./models/users.model";
import {UserRegistrationDto} from "./dto/user-registration.dto";
import {UserLoginDto} from "./dto/user-login.dto";
import * as bcrypt from 'bcryptjs'
import {RpcException} from "@nestjs/microservices";
import {JwtService} from "@nestjs/jwt";
import {ProfileService} from "../profile/profile.service";
import {firstValueFrom} from "rxjs";
import {UserResponseDataDto} from "./dto/user-response-data.dto";


@Injectable()
export class AuthService {

	constructor(@InjectModel(User) private usersRepository: typeof User,
				private readonly jwtService: JwtService,
				private readonly profileService: ProfileService) {
	}

	async registerUser(userRegistrationDto: UserRegistrationDto) {

		const isUserExists = await this.usersRepository.findOne({where: {login: userRegistrationDto.login}})

		if (isUserExists) {
			throw new RpcException({
				message: 'User with this login already exists',
				status: HttpStatus.BAD_REQUEST
			})
		}

		const user = await this.usersRepository.create({
			login: userRegistrationDto.login,
			password: await bcrypt.hash(userRegistrationDto.password, 5)
		})

		const profile = await firstValueFrom(await this.profileService.createProfile({id: user.id, ...userRegistrationDto.profile}))
		const userWithProfile = {...user.toJSON(), profile: profile}

		return this.generateToken(userWithProfile)

	}


	async generateToken(user) {
		return {
			token: this.jwtService.sign(user)
		}
	}

	async loginUser(userLoginDto: UserLoginDto) {
		let user = await this.validateUser(userLoginDto)
		const result: UserResponseDataDto = {
			...user.toJSON(),
			profile: await firstValueFrom(await this.profileService.getProfile(user.id))
		}
		return this.generateToken(result)

	}

	private async validateUser(userLoginDto: UserLoginDto) {
		const user = await this.usersRepository.findOne({where: {login: userLoginDto.login}});
		if (user) {
			const passwordsEquals = await bcrypt.compare(userLoginDto.password, user.password)
			if (passwordsEquals) return user
			throw new RpcException({
				message: 'Incorrect password',
				status: HttpStatus.BAD_REQUEST
			})
		}
		throw new RpcException({
			message: 'User with this login does not exist',
			status: HttpStatus.BAD_REQUEST
		})
	}
}

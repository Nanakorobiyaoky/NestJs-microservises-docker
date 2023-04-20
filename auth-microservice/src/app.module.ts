import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./auth/models/users.model";
import {AuthModule} from './auth/auth.module';
import {ProfileModule} from './profile/profile.module';


@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env`
		}),
		SequelizeModule.forRoot({
			dialect: "postgres",
			host: process.env.POSTGRES_HOST,
			port: +process.env.POSTGRES_PORT,
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			autoLoadModels: true,
			models: [User]
		}),
		AuthModule,
		ProfileModule
	]
})
export class AppModule {
}

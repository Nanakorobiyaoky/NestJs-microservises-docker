import { Column, DataType, Model, Table} from "sequelize-typescript";

interface IProfileCreation {

	id: number
	firstName: string,
	lastName: string,
	phoneNumber: string,
	birthday: string,
	isAdmin: boolean,

}

@Table({tableName: 'profile'})
export class Profile extends Model<Profile, IProfileCreation> {

	@Column({type: DataType.INTEGER, unique: true, primaryKey: true})
	id: number;

	@Column({type: DataType.STRING, allowNull: true, defaultValue: null})
	firstName: string;

	@Column({type: DataType.STRING, allowNull: true, defaultValue: null})
	lastName: string;

	@Column({type: DataType.STRING, allowNull: true, defaultValue: null})
	phoneNumber: string;

	@Column({type: DataType.DATE, allowNull: true, defaultValue: null})
	birthday: string;

	@Column({type: DataType.BOOLEAN, defaultValue: false})
	isAdmin: boolean;

}
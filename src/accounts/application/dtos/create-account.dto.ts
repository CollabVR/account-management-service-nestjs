import { ApiProperty } from '@nestjs/swagger';
import {
	ArrayNotEmpty,
	IsEmail,
	IsNotEmpty,
	IsNumber,
	IsStrongPassword,
} from 'class-validator';

export class CreateAccountDto {
	//TODO: Restrict email to be unique to domain (e.g. @upc.edu.pe)
	@IsEmail()
	@ApiProperty()
	email: string;

	@IsStrongPassword()
	@ApiProperty()
	password: string;

	@IsNotEmpty()
	@ApiProperty()
	firstName: string;

	@IsNotEmpty()
	@ApiProperty()
	lastName: string;

	@ArrayNotEmpty()
	@ApiProperty({ type: [Number] })
	rolesId: number[];

	@IsNumber()
	@ApiProperty()
	emailVerificationCode: number;
}

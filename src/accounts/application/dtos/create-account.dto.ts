import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

export class CreateAccountDto {
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
}

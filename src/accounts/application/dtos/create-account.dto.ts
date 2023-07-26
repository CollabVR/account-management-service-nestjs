import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';
import { RoleEntity } from 'src/accounts/domain/role.entity';

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
  @ApiProperty()
  roles: RoleEntity[];
}

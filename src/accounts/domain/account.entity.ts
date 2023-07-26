import { AggregateRoot } from '@nestjs/cqrs';
import { Account } from '@prisma/client';
import { RoleEntity } from './role.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AccountEntity extends AggregateRoot implements Account {
  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;
  @Exclude()
  password: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  roles: RoleEntity[];

  constructor(partial: Partial<AccountEntity>) {
    super();
    Object.assign(this, partial);
  }
}

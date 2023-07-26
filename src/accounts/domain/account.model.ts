import { AggregateRoot } from '@nestjs/cqrs';
import { Role } from './role.enum';

export class Account extends AggregateRoot {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly roles: Role[],
  ) {
    super();
  }
}

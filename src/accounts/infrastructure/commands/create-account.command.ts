import { CreateAccountDto } from 'src/accounts/application/dtos';

export class CreateAccountCommand {
  constructor(public readonly createAccountDto: CreateAccountDto) {}
}

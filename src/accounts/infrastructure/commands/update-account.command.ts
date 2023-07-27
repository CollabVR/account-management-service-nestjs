import { UpdateAccountDto } from 'src/accounts/application/dtos/update-account.dto';

export class UpdateAccountCommand {
  constructor(
    public readonly id: number,
    public readonly updateAccountDto: UpdateAccountDto,
  ) {}
}

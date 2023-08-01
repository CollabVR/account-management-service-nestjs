import { SignInDto } from 'src/accounts/application/dtos';

export class SignInCommand {
  constructor(public readonly signInDto: SignInDto) {}
}

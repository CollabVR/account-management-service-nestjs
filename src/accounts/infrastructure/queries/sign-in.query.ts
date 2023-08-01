import { SignInDto } from 'src/accounts/application/dtos';

export class SignInQuery {
  constructor(public readonly signInDto: SignInDto) {}
}

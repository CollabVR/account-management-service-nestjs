import { GetRolesHandler } from './get-roles.handler';
import { CreateAccountHandler } from './create-account.handler';
import { UpdateAccountHandler } from './update-account.handler';
import { SignInHandler } from './sign-in.handler';
import { CreateEmailVerificationCodeHandler } from './create-email-verification-code.handler';
import { VerifyEmailHandler } from './verify-email.handler';

export const QueryHandlers = [GetRolesHandler, SignInHandler];
export const CommandHandlers = [
	VerifyEmailHandler,
	CreateAccountHandler,
	UpdateAccountHandler,
	CreateEmailVerificationCodeHandler,
];
export const EventHandlers = [];

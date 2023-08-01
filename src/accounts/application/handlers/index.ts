import { GetRolesHandler } from './get-roles.handler';
import { CreateAccountHandler } from './create-account.handler';
import { UpdateAccountHandler } from './update-account.handler';
import { SignInHandler } from './sign-in.handler';

export const QueryHandlers = [GetRolesHandler, SignInHandler];
export const CommandHandlers = [CreateAccountHandler, UpdateAccountHandler];
export const EventHandlers = [];

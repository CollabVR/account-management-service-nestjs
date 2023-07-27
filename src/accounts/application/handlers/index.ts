import { GetRolesHandler } from './get-roles.handler';
import { CreateAccountHandler } from './create-account.handler';
import { UpdateAccountHandler } from './update-account.handler';

export const QueryHandlers = [GetRolesHandler];
export const CommandHandlers = [CreateAccountHandler, UpdateAccountHandler];
export const EventHandlers = [];

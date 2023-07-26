import { Module } from '@nestjs/common';
import { AccountsController } from './controllers/accounts.controller';
import { RolesController } from './controllers/roles.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './application/handlers';

@Module({
  imports: [CqrsModule],
  controllers: [AccountsController, RolesController],
  providers: [...QueryHandlers],
})
export class AccountsModule {}

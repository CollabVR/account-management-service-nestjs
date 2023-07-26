import { Module } from '@nestjs/common';
import { AccountsController } from './controllers/accounts.controller';
import { RolesController } from './controllers/roles.controller';

@Module({
  controllers: [AccountsController, RolesController],
})
export class AccountsModule {}

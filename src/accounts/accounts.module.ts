import { Module } from '@nestjs/common';
import { AccountsController } from './controllers/accounts.controller';
import { RolesController } from './controllers/roles.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers, QueryHandlers } from './application/handlers';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';

@Module({
	imports: [CqrsModule, PassportModule, JwtModule.register({}), MailModule],
	controllers: [AccountsController, RolesController, AuthController],
	providers: [...QueryHandlers, ...CommandHandlers],
})
export class AccountsModule {}

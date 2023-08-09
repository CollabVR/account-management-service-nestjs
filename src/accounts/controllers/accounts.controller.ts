import {
	Body,
	Controller,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AccountEntity } from '../domain/account.entity';
import { CreateAccountDto, UpdateAccountDto } from '../application/dtos';
import {
	CreateAccountCommand,
	UpdateAccountCommand,
	VerifyEmailCommand,
} from '../infrastructure/commands';
import { GetEmailVerificationCodeQuery } from '../infrastructure/queries';

@Controller('accounts')
@ApiTags('accounts')
export class AccountsController {
	constructor(
		private readonly commandBuss: CommandBus,
		private readonly queryBus: QueryBus,
	) {}

	@Post()
	@ApiCreatedResponse({ type: AccountEntity })
	async createAccount(
		@Body() createAccountDto: CreateAccountDto,
	): Promise<AccountEntity> {
		const dbCode = await this.queryBus.execute(
			new GetEmailVerificationCodeQuery(createAccountDto.email),
		);
		await this.commandBuss.execute(
			new VerifyEmailCommand(
				dbCode,
				createAccountDto.emailVerificationCode,
				createAccountDto.email,
			),
		);
		return this.commandBuss.execute(new CreateAccountCommand(createAccountDto));
	}

	@Patch(':id')
	@ApiCreatedResponse({ type: AccountEntity })
	updateAccount(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateAccountDto: UpdateAccountDto,
	): Promise<AccountEntity> {
		return this.commandBuss.execute(
			new UpdateAccountCommand(id, updateAccountDto),
		);
	}
}

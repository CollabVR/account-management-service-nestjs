import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AccountEntity } from '../domain/account.entity';
import { CreateAccountDto, UpdateAccountDto } from '../application/dtos';
import {
	CreateAccountCommand,
	UpdateAccountCommand,
	VerifyEmailCommand,
} from '../infrastructure/commands';
import { MessagePattern } from '@nestjs/microservices';

@Controller('accounts')
export class AccountsController {
	constructor(private readonly commandBuss: CommandBus) {}

	@MessagePattern('create-account')
	async createAccount(
		createAccountDto: CreateAccountDto,
	): Promise<AccountEntity> {
		console.log('createAccount', createAccountDto);
		await this.commandBuss.execute(
			new VerifyEmailCommand(
				createAccountDto.emailVerificationCode,
				createAccountDto.email,
			),
		);
		return this.commandBuss.execute(new CreateAccountCommand(createAccountDto));
	}

	@MessagePattern('update-account')
	updateAccount(data: {
		id: number;
		updateAccountDto: UpdateAccountDto;
	}): Promise<AccountEntity> {
		return this.commandBuss.execute(
			new UpdateAccountCommand(data.id, data.updateAccountDto),
		);
	}
}

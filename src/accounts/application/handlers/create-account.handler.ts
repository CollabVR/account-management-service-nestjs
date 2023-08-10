import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccountEntity } from 'src/accounts/domain/account.entity';
import { CreateAccountCommand } from 'src/accounts/infrastructure/commands';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ForbiddenException } from '@nestjs/common';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
	implements ICommandHandler<CreateAccountCommand>
{
	//TODO: When sending a wrong role id, no error is shown but account is not created
	constructor(private readonly prisma: PrismaService) {}
	async execute(command: CreateAccountCommand): Promise<AccountEntity> {
		try {
			const account = this.prisma.account.create({
				data: {
					email: command.createAccountDto.email,
					firstName: command.createAccountDto.firstName,
					lastName: command.createAccountDto.lastName,
					password: await argon.hash(command.createAccountDto.password),
					roles: {
						connect: command.createAccountDto.rolesId.map((roleId) => ({
							id: roleId,
						})),
					},
				},
			});

			return new AccountEntity(await account);
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ForbiddenException('Credentials Taken');
				}
			} else {
				throw error;
			}
		}
	}
}

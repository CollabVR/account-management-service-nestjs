import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyEmailCommand } from 'src/accounts/infrastructure/commands';
import { PrismaService } from 'src/prisma/prisma.service';

@CommandHandler(VerifyEmailCommand)
export class VerifyEmailHandler implements ICommandHandler<VerifyEmailCommand> {
	constructor(private readonly prisma: PrismaService) {}

	execute(command: VerifyEmailCommand): Promise<any> {
		if (command.code !== command.dbCode) {
			throw new BadRequestException('Invalid email verification code');
		}
		return this.prisma.emailVerification.delete({
			where: {
				email: command.email,
			},
		});
	}
}

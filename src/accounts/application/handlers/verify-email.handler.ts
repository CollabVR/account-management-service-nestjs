import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { VerifyEmailCommand } from 'src/accounts/infrastructure/commands';
import { PrismaService } from 'src/prisma/prisma.service';

@CommandHandler(VerifyEmailCommand)
export class VerifyEmailHandler implements ICommandHandler<VerifyEmailCommand> {
	constructor(private readonly prisma: PrismaService) {}

	async execute(command: VerifyEmailCommand): Promise<any> {
		const emailVerification = await this.prisma.emailVerification.findUnique({
			where: {
				email: command.email,
			},
		});
		if (command.code !== emailVerification.code) {
			throw new RpcException('Invalid email verification code');
		}
		return this.prisma.emailVerification.delete({
			where: {
				email: command.email,
			},
		});
	}
}

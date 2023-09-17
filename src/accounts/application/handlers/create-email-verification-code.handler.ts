import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { CreateEmailVerificationCodeCommand } from 'src/accounts/infrastructure/commands';
import { PrismaService } from 'src/prisma/prisma.service';

@CommandHandler(CreateEmailVerificationCodeCommand)
export class CreateEmailVerificationCodeHandler
	implements ICommandHandler<CreateEmailVerificationCodeCommand>
{
	constructor(private readonly prisma: PrismaService) {}

	execute(command: CreateEmailVerificationCodeCommand): Promise<any> {
		try {
			return this.prisma.emailVerification.create({
				data: {
					code: command.code,
					email: command.email,
				},
			});
		} catch (error) {
			console.log(error);
			throw new RpcException(error);
		}
	}
}

import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignInDto, TokensDto } from '../application/dtos';
import { SignInQuery } from '../infrastructure/queries';
import { MailService } from 'src/mail/mail.service';
import { CreateEmailVerificationCodeCommand } from '../infrastructure/commands';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
		private readonly mailService: MailService,
	) {}
	@MessagePattern('sign-in')
	signIn(signInDto: SignInDto): Promise<TokensDto> {
		return this.queryBus.execute(new SignInQuery(signInDto));
	}
	@MessagePattern('send-email-verification-code')
	async sendEmailVerificationCode(email: string) {
		const code = this.generateRandomCode();
		await this.commandBus.execute(
			new CreateEmailVerificationCodeCommand(email, code),
		);
		return this.mailService.sendEmailVerificationCode(email, code);
	}

	private generateRandomCode(): number {
		return Math.floor(100000 + Math.random() * 900000);
	}
}

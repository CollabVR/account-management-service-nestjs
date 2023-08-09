import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto, TokensDto } from '../application/dtos';
import { SignInQuery } from '../infrastructure/queries';
import { MailService } from 'src/mail/mail.service';
import { CreateEmailVerificationCodeCommand } from '../infrastructure/commands';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
		private readonly mailService: MailService,
	) {}

	@Post('local/signin')
	@ApiOkResponse({ type: TokensDto })
	signIn(@Body() signInDto: SignInDto): Promise<TokensDto> {
		return this.queryBus.execute(new SignInQuery(signInDto));
	}

	@Post('/send-email-verification-code/:email')
	async sendEmailVerificationCode(@Param('email') email: string) {
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

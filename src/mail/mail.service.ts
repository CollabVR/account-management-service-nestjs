import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	async sendEmailVerificationCode(email: string, code: number) {
		await this.mailerService
			.sendMail({
				to: email,
				// from: '"Support Team" <support@example.com>', // override default from
				subject: 'Welcome to Nice App! Confirm your Email',
				template: 'confirmation', // `.hbs` extension is appended automatically
				context: {
					// ✏️ filling curly brackets with content
					code,
				},
			})
			.catch((error) => {
				console.log(error);
				//TODO: Throw Error so that the user can be notified that email wasn't send correctly
				throw error;
			});
	}
}

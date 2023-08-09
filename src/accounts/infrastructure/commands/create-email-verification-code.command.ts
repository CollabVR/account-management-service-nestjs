export class CreateEmailVerificationCodeCommand {
	constructor(public readonly email, public readonly code) {}
}

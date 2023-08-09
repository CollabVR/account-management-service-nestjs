export class VerifyEmailCommand {
	constructor(public code: number, public readonly email: string) {}
}

export class VerifyEmailCommand {
	constructor(
		public code: number,
		public readonly dbCode: number,
		public readonly email: string,
	) {}
}

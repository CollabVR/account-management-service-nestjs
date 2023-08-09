import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetEmailVerificationCodeQuery } from 'src/accounts/infrastructure/queries';
import { PrismaService } from 'src/prisma/prisma.service';
@QueryHandler(GetEmailVerificationCodeQuery)
export class GetEmailVerificationCodeHandler
	implements IQueryHandler<GetEmailVerificationCodeQuery>
{
	constructor(private readonly prisma: PrismaService) {}
	async execute(query: GetEmailVerificationCodeQuery): Promise<number> {
		const emailVerification = await this.prisma.emailVerification.findUnique({
			where: {
				email: query.email,
			},
		});
		return emailVerification.code;
	}
}

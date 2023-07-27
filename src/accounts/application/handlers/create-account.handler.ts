import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccountEntity } from 'src/accounts/domain/account.entity';
import { CreateAccountCommand } from 'src/accounts/infrastructure/commands';
import { PrismaService } from 'src/prisma/prisma.service';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand>
{
  constructor(private readonly prisma: PrismaService) {}
  async execute(command: CreateAccountCommand): Promise<AccountEntity> {
    const account = this.prisma.account.create({
      data: {
        email: command.createAccountDto.email,
        firstName: command.createAccountDto.firstName,
        lastName: command.createAccountDto.lastName,
        password: command.createAccountDto.password,
        roles: {
          connect: command.createAccountDto.rolesId.map((roleId) => ({
            id: roleId,
          })),
        },
      },
    });

    return new AccountEntity(await account);
  }
}

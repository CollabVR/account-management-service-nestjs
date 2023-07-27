import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccountEntity } from 'src/accounts/domain/account.entity';
import { UpdateAccountCommand } from 'src/accounts/infrastructure/commands';
import { PrismaService } from 'src/prisma/prisma.service';

@CommandHandler(UpdateAccountCommand)
export class UpdateAccountHandler
  implements ICommandHandler<UpdateAccountCommand>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: UpdateAccountCommand): Promise<AccountEntity> {
    const updatedAccount = this.prisma.account.update({
      where: { id: command.id },
      data: command.updateAccountDto,
    });

    return new AccountEntity(await updatedAccount);
  }
}

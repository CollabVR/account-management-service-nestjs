import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccountEntity } from 'src/accounts/domain/account.entity';
import { UpdateAccountCommand } from 'src/accounts/infrastructure/commands';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@CommandHandler(UpdateAccountCommand)
export class UpdateAccountHandler
  implements ICommandHandler<UpdateAccountCommand>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: UpdateAccountCommand): Promise<AccountEntity> {
    //if password is being updated, hash it
    if (command.updateAccountDto.password) {
      command.updateAccountDto.password = await argon.hash(
        command.updateAccountDto.password,
      );
    }
    const updatedAccount = this.prisma.account.update({
      where: { id: command.id },
      data: command.updateAccountDto,
    });

    return new AccountEntity(await updatedAccount);
  }
}

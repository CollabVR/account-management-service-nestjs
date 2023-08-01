import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInCommand } from 'src/accounts/infrastructure/commands';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';
import * as argon from 'argon2';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(private readonly prisma: PrismaService) {}
  async execute(command: SignInCommand): Promise<any> {
    const user = await this.prisma.account.findUnique({
      where: {
        email: command.signInDto.email,
      },
    });

    if (!user) throw new ForbiddenException('Credentials Incorrect');

    const pwMatches = await argon.verify(
      user.password,
      command.signInDto.password,
    );

    if (!pwMatches) throw new ForbiddenException('Credentials Incorrect');

    return user;
  }
}

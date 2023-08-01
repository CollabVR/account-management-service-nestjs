import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';
import * as argon from 'argon2';
import { RoleEntity } from 'src/accounts/domain/role.entity';
import { AccountEntity } from 'src/accounts/domain/account.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokensDto } from '../dtos';
import { SignInQuery } from 'src/accounts/infrastructure/queries';

@QueryHandler(SignInQuery)
export class SignInHandler implements IQueryHandler<SignInQuery> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}
  async execute(command: SignInQuery): Promise<TokensDto> {
    const account: AccountEntity = new AccountEntity(
      await this.prisma.account.findUnique({
        where: {
          email: command.signInDto.email,
        },
        include: {
          roles: true,
        },
      }),
    );

    if (!account) throw new ForbiddenException('Credentials Incorrect');

    const pwMatches = await argon.verify(
      account.password,
      command.signInDto.password,
    );

    if (!pwMatches) throw new ForbiddenException('Credentials Incorrect');

    const tokens = await this.signAccountTokens(
      account.id,
      account.email,
      account.roles,
    );
    return tokens;
  }

  //TODO: Complete implementation of Refresh Token using cookies
  async signAccountTokens(
    accountId: number,
    email: string,
    roles: RoleEntity[],
  ): Promise<TokensDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: accountId,
          email,
          roles: roles,
        },
        {
          secret: this.config.get('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: accountId,
          email,
        },
        {
          secret: this.config.get('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}

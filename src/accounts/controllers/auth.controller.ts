import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto, TokensDto } from '../application/dtos';
import { SignInQuery } from '../infrastructure/queries';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('local/signin')
  @ApiOkResponse({ type: TokensDto })
  signIn(@Body() signInDto: SignInDto): Promise<TokensDto> {
    return this.queryBus.execute(new SignInQuery(signInDto));
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from '../application/dtos';
import { SignInCommand } from '../infrastructure/commands';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly commandBuss: CommandBus) {}

  @Post('local/signin')
  signIn(@Body() signInDto: SignInDto): Promise<any> {
    return this.commandBuss.execute(new SignInCommand(signInDto));
  }
}

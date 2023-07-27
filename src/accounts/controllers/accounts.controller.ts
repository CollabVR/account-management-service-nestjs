import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AccountEntity } from '../domain/account.entity';
import { CreateAccountDto, UpdateAccountDto } from '../application/dtos';
import {
  CreateAccountCommand,
  UpdateAccountCommand,
} from '../infrastructure/commands';

@Controller('accounts')
@ApiTags('accounts')
export class AccountsController {
  constructor(private readonly commandBuss: CommandBus) {}

  @Post()
  @ApiCreatedResponse({ type: AccountEntity })
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<AccountEntity> {
    return this.commandBuss.execute(new CreateAccountCommand(createAccountDto));
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: AccountEntity })
  async updateAccount(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<AccountEntity> {
    return this.commandBuss.execute(
      new UpdateAccountCommand(id, updateAccountDto),
    );
  }
}

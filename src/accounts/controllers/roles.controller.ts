import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoleEntity } from '../domain/role.entity';
import { GetRolesQuery } from '../infrastructure/queries';
import { JwtAuthGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator';

@Controller('roles')
@ApiTags('roles')
export class RolesController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @ApiOkResponse({ type: RoleEntity, isArray: true })
  @ApiBearerAuth()
  async getRoles(): Promise<RoleEntity[]> {
    return this.queryBus.execute(new GetRolesQuery());
  }
}

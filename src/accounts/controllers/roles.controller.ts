import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoleEntity } from '../domain/role.entity';
import { GetRolesQuery } from '../infrastructure/queries/get-roles.query';

@Controller('roles')
@ApiTags('roles')
export class RolesController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: RoleEntity, isArray: true })
  async getRoles(): Promise<RoleEntity[]> {
    return this.queryBus.execute(new GetRolesQuery());
  }
}

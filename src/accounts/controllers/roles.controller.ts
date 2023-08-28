import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoleEntity } from '../domain/role.entity';
import { GetRolesQuery } from '../infrastructure/queries';
import { JwtAuthGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator';
import { MessagePattern } from '@nestjs/microservices';

@Controller('roles')
export class RolesController {
	constructor(private readonly queryBus: QueryBus) {}

	@MessagePattern('get-roles')
	async getRoles(): Promise<RoleEntity[]> {
		return this.queryBus.execute(new GetRolesQuery());
	}
}

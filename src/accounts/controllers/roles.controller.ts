import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { RoleEntity } from '../domain/role.entity';
import { GetRolesQuery } from '../infrastructure/queries';
import { MessagePattern } from '@nestjs/microservices';

@Controller('roles')
export class RolesController {
	constructor(private readonly queryBus: QueryBus) {}

	@MessagePattern('get-roles')
	async getRoles(): Promise<RoleEntity[]> {
		return this.queryBus.execute(new GetRolesQuery());
	}
}

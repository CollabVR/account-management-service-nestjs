import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RoleEntity } from 'src/accounts/domain/role.entity';
import { GetRolesQuery } from 'src/accounts/infrastructure/queries/get-roles.query';
import { PrismaService } from 'src/prisma/prisma.service';

@QueryHandler(GetRolesQuery)
export class GetRolesHandler implements IQueryHandler<GetRolesQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    const roles = this.prisma.role.findMany();
    return (await roles).map((role) => new RoleEntity(role));
  }
}

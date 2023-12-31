import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RoleEntity implements Role {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;

  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }
}

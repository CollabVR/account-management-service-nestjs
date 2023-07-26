import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AccountsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

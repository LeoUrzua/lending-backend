import { Module } from '@nestjs/common';
import { BorrowersService } from './borrowers.service';
import { BorrowersResolver } from './borrowers.resolver';

@Module({
  providers: [BorrowersResolver, BorrowersService],
})
export class BorrowersModule {}

import { Module } from '@nestjs/common';
import { BorrowersService } from './borrowers.service';
import { BorrowersResolver } from './borrowers.resolver';
import { Borrower } from './entities/borrower.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Borrower])],
  providers: [BorrowersResolver, BorrowersService],
})
export class BorrowersModule { }

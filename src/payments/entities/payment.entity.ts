import { ObjectType, Field, Float, ID } from '@nestjs/graphql';
import { Loan } from 'src/loans/entities/loan.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Payment {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Loan)
  @ManyToOne(() => Loan, (loan) => loan.payments)
  loan: Loan;

  @Field(() => Float)
  @Column('float')
  amountPaid: number;

  @Field(() => Date)
  @Column('date')
  paymentDate: Date;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}

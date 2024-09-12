import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';
import { Borrower } from 'src/borrowers/entities/borrower.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Loan {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Borrower)
  @ManyToOne(() => Borrower, (borrower) => borrower.loans)
  borrower: Borrower;

  @Field(() => Float)
  @Column('float')
  amount: number;

  @Field(() => Float)
  @Column('float')
  interestRate: number;

  @Field(() => Date)
  @Column('date')
  startDate: Date;

  @Field(() => Date)
  @Column('date')
  dueDate: Date;

  @Field()
  @Column({ default: 'active' })
  status: string;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field(() => [Payment])
  @OneToMany(() => Payment, (payment) => payment.loan)
  payments: Payment[];
}

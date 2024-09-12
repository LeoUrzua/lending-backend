import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Loan } from 'src/loans/entities/loan.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Borrower {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  phoneNumber: string;

  @Field()
  @Column({ type: 'float', default: 0 })
  score: number;

  @Field(() => Date)
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field(() => [Loan])
  @OneToMany(() => Loan, (loan) => loan.borrower)
  loans: Loan[];
}

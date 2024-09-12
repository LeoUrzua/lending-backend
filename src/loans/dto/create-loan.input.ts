import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { IsUUID, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

@InputType()
export class CreateLoanInput {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  borrowerId: string;

  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  interestRate: number;

  @Field()
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @Field()
  @IsDateString()
  @IsNotEmpty()
  dueDate: string;
}

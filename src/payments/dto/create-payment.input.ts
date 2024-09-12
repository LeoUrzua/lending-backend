import { InputType, Field, Float, ID } from '@nestjs/graphql';
import { IsUUID, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

@InputType()
export class CreatePaymentInput {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  loanId: string;

  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  amountPaid: number;

  @Field()
  @IsDateString()
  @IsNotEmpty()
  paymentDate: string;
}

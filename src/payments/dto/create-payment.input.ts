import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBorrowerInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

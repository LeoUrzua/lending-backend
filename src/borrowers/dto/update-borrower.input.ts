import { CreateBorrowerInput } from './create-borrower.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBorrowerInput extends PartialType(CreateBorrowerInput) { }

import { InputType, PartialType } from '@nestjs/graphql';
import { CreateLoanInput } from './create-loan.input';

@InputType()
export class UpdateLoanInput extends PartialType(CreateLoanInput) { }

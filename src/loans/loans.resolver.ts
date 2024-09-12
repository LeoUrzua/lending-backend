import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { LoansService } from './loans.service';
import { Loan } from './entities/loan.entity';
import { CreateLoanInput } from './dto/create-loan.input';
import { UpdateLoanInput } from './dto/update-loan.input';

@Resolver(() => Loan)
export class LoansResolver {
  constructor(private readonly loansService: LoansService) { }

  @Mutation(() => Loan)
  createLoan(@Args('createLoanInput') createLoanInput: CreateLoanInput) {
    return this.loansService.create(createLoanInput);
  }

  @Query(() => [Loan], { name: 'loans' })
  findAll() {
    return this.loansService.findAll();
  }

  @Query(() => Loan, { name: 'loan' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.loansService.findOne(id);
  }

  @Mutation(() => Loan)
  updateLoan(
    @Args('updateLoanInput') updateLoanInput: UpdateLoanInput,
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.loansService.update(id, updateLoanInput);
  }

  @Mutation(() => Loan)
  removeLoan(@Args('id', { type: () => ID }) id: string) {
    return this.loansService.remove(id);
  }
}

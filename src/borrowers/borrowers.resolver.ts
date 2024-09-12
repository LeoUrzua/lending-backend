import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { BorrowersService } from './borrowers.service';
import { Borrower } from './entities/borrower.entity';
import { CreateBorrowerInput } from './dto/create-borrower.input';
import { UpdateBorrowerInput } from './dto/update-borrower.input';

@Resolver(() => Borrower)
export class BorrowersResolver {
  constructor(private readonly borrowersService: BorrowersService) { }

  @Mutation(() => Borrower)
  createBorrower(
    @Args('createBorrowerInput') createBorrowerInput: CreateBorrowerInput,
  ) {
    return this.borrowersService.create(createBorrowerInput);
  }

  @Query(() => [Borrower], { name: 'borrowers' })
  findAll() {
    return this.borrowersService.findAll();
  }

  @Query(() => Borrower, { name: 'borrower' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.borrowersService.findOne(id);
  }

  @Mutation(() => Borrower)
  updateBorrower(
    @Args('updateBorrowerInput') updateBorrowerInput: UpdateBorrowerInput,
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.borrowersService.update(id, updateBorrowerInput);
  }

  @Mutation(() => Borrower)
  removeBorrower(@Args('id', { type: () => ID }) id: string) {
    return this.borrowersService.remove(id);
  }
}

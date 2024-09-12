import { Test, TestingModule } from '@nestjs/testing';
import { BorrowersResolver } from './borrowers.resolver';
import { BorrowersService } from './borrowers.service';

describe('BorrowersResolver', () => {
  let resolver: BorrowersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BorrowersResolver, BorrowersService],
    }).compile();

    resolver = module.get<BorrowersResolver>(BorrowersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

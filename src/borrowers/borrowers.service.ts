import { Injectable } from '@nestjs/common';
import { CreateBorrowerInput } from './dto/create-borrower.input';
import { UpdateBorrowerInput } from './dto/update-borrower.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrower } from './entities/borrower.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BorrowersService {
  constructor(
    @InjectRepository(Borrower)
    private borrowerRepository: Repository<Borrower>,
  ) { }

  async create(createBorrowerInput: CreateBorrowerInput): Promise<Borrower> {
    const newBorrower = this.borrowerRepository.create(createBorrowerInput);

    return this.borrowerRepository.save(newBorrower);
  }

  async findAll() {
    return this.borrowerRepository.find({
      relations: ['loans'],
    });
  }

  async findOne(id: string) {
    return this.borrowerRepository.findOne({
      where: { id },
      relations: ['loans'],
    });
  }

  async update(id: string, updateBorrowerInput: UpdateBorrowerInput) {
    const borrower = await this.borrowerRepository.find({
      where: { id },
    });

    if (!borrower) {
      throw new Error('Borrower not found');
    }

    Object.assign(borrower, updateBorrowerInput);
    return this.borrowerRepository.save(borrower);
  }

  async remove(id: string) {
    const borrower = this.borrowerRepository.find({
      where: { id },
    });

    if (!borrower) {
      throw new Error('Borrower not found');
    }

    await this.borrowerRepository.delete(id);
    return borrower;
  }
}

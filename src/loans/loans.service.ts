import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from './entities/loan.entity';
import { CreateLoanInput } from './dto/create-loan.input';
import { UpdateLoanInput } from './dto/update-loan.input';
import { Borrower } from '../borrowers/entities/borrower.entity';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan)
    private loansRepository: Repository<Loan>,

    @InjectRepository(Borrower)
    private borrowersRepository: Repository<Borrower>,
  ) { }

  // Create a new loan
  async create(createLoanInput: CreateLoanInput): Promise<Loan> {
    const borrower = await this.borrowersRepository.findOne({
      where: { id: createLoanInput.borrowerId },
    });

    if (!borrower) {
      throw new Error('Borrower not found');
    }

    const newLoan = this.loansRepository.create({
      borrower,
      amount: createLoanInput.amount,
      interestRate: createLoanInput.interestRate,
      startDate: new Date(createLoanInput.startDate),
      dueDate: new Date(createLoanInput.dueDate),
      status: 'active',
    });

    return this.loansRepository.save(newLoan);
  }

  async findAll(): Promise<Loan[]> {
    return this.loansRepository.find();
  }

  async findOne(id: string): Promise<Loan> {
    return this.loansRepository.findOne({
      where: { id },
      relations: ['borrower', 'payments'],
    });
  }

  async update(id: string, updateLoanInput: UpdateLoanInput): Promise<Loan> {
    const loan = await this.loansRepository.findOne({ where: { id } });
    if (!loan) {
      throw new Error(`Loan with id ${id} not found`);
    }

    Object.assign(loan, updateLoanInput);
    return this.loansRepository.save(loan);
  }

  async remove(id: string): Promise<Loan> {
    const loan = await this.loansRepository.findOne({ where: { id } });
    if (!loan) {
      throw new Error(`Loan with id ${id} not found`);
    }

    await this.loansRepository.remove(loan);
    return loan;
  }
}

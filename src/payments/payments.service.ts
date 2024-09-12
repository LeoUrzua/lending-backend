import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';
import { Loan } from '../loans/entities/loan.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,

    @InjectRepository(Loan)
    private loansRepository: Repository<Loan>,
  ) { }

  async create(createPaymentInput: CreatePaymentInput): Promise<Payment> {
    const loan = await this.loansRepository.findOne({
      where: { id: createPaymentInput.loanId },
    });

    if (!loan) {
      throw new Error('Loan not found');
    }

    const newPayment = this.paymentsRepository.create({
      loan,
      amountPaid: createPaymentInput.amountPaid,
      paymentDate: new Date(createPaymentInput.paymentDate),
    });

    return this.paymentsRepository.save(newPayment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find({
      relations: ['loan'],
    });
  }

  async findOne(id: string): Promise<Payment> {
    return this.paymentsRepository.findOne({
      where: { id },
      relations: ['loan'],
    });
  }

  async update(
    id: string,
    updatePaymentInput: UpdatePaymentInput,
  ): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({ where: { id } });
    if (!payment) {
      throw new Error(`Payment with id ${id} not found`);
    }

    Object.assign(payment, updatePaymentInput);
    return this.paymentsRepository.save(payment);
  }

  async remove(id: string): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({ where: { id } });
    if (!payment) {
      throw new Error(`Payment with id ${id} not found`);
    }

    await this.paymentsRepository.remove(payment);
    return payment;
  }
}

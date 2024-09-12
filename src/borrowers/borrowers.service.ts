import { Injectable } from '@nestjs/common';
import { CreateBorrowerInput } from './dto/create-borrower.input';
import { UpdateBorrowerInput } from './dto/update-borrower.input';

@Injectable()
export class BorrowersService {
  create(createBorrowerInput: CreateBorrowerInput) {
    return 'This action adds a new borrower';
  }

  findAll() {
    return `This action returns all borrowers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} borrower`;
  }

  update(id: number, updateBorrowerInput: UpdateBorrowerInput) {
    return `This action updates a #${id} borrower`;
  }

  remove(id: number) {
    return `This action removes a #${id} borrower`;
  }
}

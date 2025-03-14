import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TransferTypeEntity } from '../entities/transfer-type.entity';

@Injectable()
export class TransferTypeSeeder {
  constructor(
  ) {}

  async seed() {
    const count = await TransferTypeEntity.count();
    if (count === 0) {
      await TransferTypeEntity.insert([
        { id: 1, name: 'Bank Transfer' },
        { id: 2, name: 'Bill Payments' },
        { id: 3, name: 'Cash Withdrawal' },
      ]);
      console.log('TransferTypeSeeder ejecutado');
    } else {
      console.log('TransferTypeSeeder ya tiene datos');
    }
  }
}

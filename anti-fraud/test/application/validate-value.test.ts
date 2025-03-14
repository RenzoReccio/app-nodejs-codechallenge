import { Test, TestingModule } from '@nestjs/testing';
import { ValidateValueCommand } from 'src/application/transaction/commands/validate-value/validate-value.command';
import { ValidateValueHandler } from 'src/application/transaction/commands/validate-value/validate-value.handler';
import { TransactionStatus } from 'src/domain/transaction/transaction';
import { ITransactionRepository } from 'src/domain/transaction/transaction.repository';

const transactionRepositoryMock = {
  Send: jest.fn(),
};

describe('ValidateValueHandler', () => {
  let handler: ValidateValueHandler;
  let transactionRepository: ITransactionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateValueHandler,
        { provide: ITransactionRepository, useValue: transactionRepositoryMock },

      ],
    }).compile();

    handler = module.get<ValidateValueHandler>(ValidateValueHandler);
    transactionRepository = module.get<ITransactionRepository>(ITransactionRepository);
  });

  it('REJECTED si el valor es mayor a 1000', async () => {
    const query = new ValidateValueCommand("6a98e0d4-ae60-45a0-80a0-06c8f455c3e7", 1500);
    const result = await handler.execute(query);
    expect(result.status).toBe(TransactionStatus.REJECTED);
  });

  it('APPROVED si el valor es 1000 o menor', async () => {
    const query = new ValidateValueCommand("33144745-863d-48dd-8d26-c7cf838fd5ff", 500);
    const result = await handler.execute(query);
    expect(result.status).toBe(TransactionStatus.APPROVED);
  });
});

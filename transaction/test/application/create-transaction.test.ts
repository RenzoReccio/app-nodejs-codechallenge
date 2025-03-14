import { Test, TestingModule } from '@nestjs/testing';
import { ITransactionRepository } from 'src/domain/transaction/transaction.repository';
import { Transaction, TransactionStatus } from 'src/domain/transaction/transaction';
import { TransferType } from 'src/domain/transfer-type/transfer-type';
import { CreateTransactionCommand } from 'src/application/transaction/commands/create-transaction/create-transaction.command';
import { CreateTransactionHandler } from 'src/application/transaction/commands/create-transaction/create-transaction.handler';

const transactionRepositoryMock = {
  Insert: jest.fn(),
  Send: jest.fn(),
};

describe('CreateTransactionHandler', () => {
  let handler
  let transactionRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTransactionHandler,
        { provide: ITransactionRepository, useValue: transactionRepositoryMock },
      ],
    }).compile();

    handler = module.get<CreateTransactionHandler>(CreateTransactionHandler);
    transactionRepository = module.get<ITransactionRepository>(ITransactionRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería insertar una transacción y enviarla correctamente', async () => {
    const command = new CreateTransactionCommand(
      'debit-account-id',
      'credit-account-id',
      1,  
      500 
    );
    
    const insertedGuid = 'transaction-guid';

    transactionRepository.Insert.mockResolvedValue(insertedGuid); 
    transactionRepository.Send.mockResolvedValue(null); 

    const result = await handler.execute(command);

    expect(transactionRepository.Insert).toHaveBeenCalledTimes(1);
    expect(transactionRepository.Send).toHaveBeenCalledTimes(1);
    expect(result.transactionExternalId).toBe(insertedGuid);

    const expectedTransaction = new Transaction(
      null,
      command.accountExternalIdDebit,
      command.accountExternalIdCredit,
      new TransferType(command.transferTypeId, null),
      command.value,
      TransactionStatus.PENDING,
      null
    );
    
    expect(transactionRepository.Insert).toHaveBeenCalledWith(expectedTransaction);
  })
})
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateStatusCommand } from 'src/application/transaction/commands/update-status/update-status.command';
import { UpdateStatusHandler } from 'src/application/transaction/commands/update-status/update-status.handler';
import { ITransactionRepository } from 'src/domain/transaction/transaction.repository';

const transactionRepositoryMock = {
  UpdateStatus: jest.fn(),
};

describe('UpdateStatusHandler', () => {
  let handler: UpdateStatusHandler;
  let transactionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateStatusHandler,
        { provide: ITransactionRepository, useValue: transactionRepositoryMock },
      ],
    }).compile();

    handler = module.get<UpdateStatusHandler>(UpdateStatusHandler);
    transactionRepository = module.get<ITransactionRepository>(ITransactionRepository);
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('debería actualizar el estado de la transacción correctamente', async () => {
    const command = new UpdateStatusCommand('transaction-guid', 'APPROVED');
    
    transactionRepository.UpdateStatus.mockResolvedValue(undefined);

    await handler.execute(command);

    expect(transactionRepository.UpdateStatus).toHaveBeenCalledTimes(1);
    expect(transactionRepository.UpdateStatus).toHaveBeenCalledWith(command.guid, command.status);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ValidateValueHandler } from 'src/application/transaction/queries/validate-value/validate-value.handler';
import { ValidateValueQuery } from 'src/application/transaction/queries/validate-value/validate-value.query';
import { TransactionStatus } from 'src/domain/transaction/transaction';

describe('ValidateValueHandler', () => {
  let handler: ValidateValueHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateValueHandler],
    }).compile();

    handler = module.get<ValidateValueHandler>(ValidateValueHandler);
  });

  it('REJECTED si el valor es mayor a 1000', async () => {
    const query = new ValidateValueQuery(1500); 
    const result = await handler.execute(query);
    expect(result).toBe(TransactionStatus.REJECTED);
  });

  it('APPROVED si el valor es 1000 o menor', async () => {
    const query = new ValidateValueQuery(500); 
    const result = await handler.execute(query);
    expect(result).toBe(TransactionStatus.APPROVED);
  });
});

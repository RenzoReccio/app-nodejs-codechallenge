import { Provider } from "@nestjs/common";
import { ITransactionRepository } from "src/domain/transaction/transaction.repository";
import { TransactionRepository } from "src/infrastructure/repositories/transaction.repository";

export const Providers: Provider[] = [
    { provide: ITransactionRepository, useClass: TransactionRepository },
]
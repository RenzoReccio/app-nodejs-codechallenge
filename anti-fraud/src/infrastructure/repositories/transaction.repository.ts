import { Transaction } from "src/domain/transaction/transaction";
import { ITransactionRepository } from "src/domain/transaction/transaction.repository";
import { Inject } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

export class TransactionRepository implements ITransactionRepository {
    constructor(
        @Inject('TRANSACTION-RECEIVE') private client: ClientKafka
    ) {
    }

    async Send(transaction: Transaction): Promise<void> {
        await lastValueFrom(
            this.client.emit(
                'fraud.valid.response',
                {
                    transactionGuid: transaction.guid,
                    status: transaction.status
                }
            )
        )
    }
}
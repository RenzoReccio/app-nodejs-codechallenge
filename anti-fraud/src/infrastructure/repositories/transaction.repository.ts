import { Transaction } from "src/domain/transaction/transaction";
import { ITransactionRepository } from "src/domain/transaction/transaction.repository";
import { Inject, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

export class TransactionRepository implements ITransactionRepository, OnModuleInit, OnModuleDestroy {
    constructor(
        @Inject('TRANSACTION-RECEIVE') private client: ClientKafka
    ) {

    }
    async onModuleInit() {
        await this.client.connect();
    }
    
    async onModuleDestroy() {
        await this.client.close();
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
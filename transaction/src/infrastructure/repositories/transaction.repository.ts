import { Transaction } from "src/domain/transaction/transaction";
import { ITransactionRepository } from "src/domain/transaction/transaction.repository";
import { TransactionEntity } from "../entities/transaction.entity";
import { Inject } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

export class TransactionRepository implements ITransactionRepository {
    constructor(
        @Inject('TRANSACTION-SEND') private client: ClientKafka
    ) {

    }

    async Send(guid: string, value: number): Promise<void> {
        await lastValueFrom(this.client.emit('fraud.valid', { transactionGuid: guid, valueToValidate: value }))
    }

    async Insert(transaction: Transaction): Promise<string> {
        let inserted = await TransactionEntity.save({
            accountExternalIdDebit: transaction.accountExternalIdDebit,
            accountExternalIdCredit: transaction.accountExternalIdCredit,
            transferType: transaction.transferType,
            value: transaction.value,
            status: transaction.status
        })
        return inserted.guid
    }
    async UpdateStatus(guid: string, status: string): Promise<void> {
        await TransactionEntity.save({
            guid: guid,
            status: status
        })
    }
    async FindByGuid(guid: string): Promise<Transaction> {
        return await TransactionEntity.findOne(
            {
                where: { guid: guid },
                relations: ['transferType']
            }
        )
    }

}
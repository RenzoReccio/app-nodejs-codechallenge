import { IQueryHandler, CommandHandler } from "@nestjs/cqrs";
import { Transaction } from "src/domain/transaction/transaction";
import { ValidateValueCommand } from "./validate-value.command";
import { ITransactionRepository } from "src/domain/transaction/transaction.repository";


@CommandHandler(ValidateValueCommand)
export class ValidateValueHandler implements IQueryHandler<ValidateValueCommand, Transaction> {
    constructor(
        private _transactionRepository: ITransactionRepository
    ) { }
    async execute(query: ValidateValueCommand): Promise<Transaction> {
        const transaction = new Transaction(query.guid, query.value)
        await this._transactionRepository.Send(transaction)
        return transaction
    }

}
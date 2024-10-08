import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateTransactionCommand } from "./create-transaction.command";
import { ITransactionRepository } from "src/domain/transaction/transaction.repository";
import { Transaction } from "src/domain/transaction/transaction";
import { TransferType } from "src/domain/transfer-type/tranfer-type";

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler implements ICommandHandler<CreateTransactionCommand, string> {
    constructor(
        private _transactionRepository: ITransactionRepository
    ) { }
    async execute(command: CreateTransactionCommand): Promise<string> {
        let transaction = this.GenerateTransaction(command)

        return await this._transactionRepository.Insert(transaction)
    }

    private GenerateTransaction(command: CreateTransactionCommand) {
        return new Transaction(
            null,
            command.accountExternalIdDebit,
            command.accountExternalIdCredit,
            new TransferType(command.transferTypeId, null),
            command.value,
            'Pending',
            null
        )
    }
}
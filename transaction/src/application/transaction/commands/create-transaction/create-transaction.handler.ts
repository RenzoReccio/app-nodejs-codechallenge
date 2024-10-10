import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateTransactionCommand } from "./create-transaction.command";
import { ITransactionRepository } from "src/domain/transaction/transaction.repository";
import { Transaction, TransactionStatus } from "src/domain/transaction/transaction";
import { TransferType } from "src/domain/transfer-type/transfer-type";
import { CreateTransactionResponse } from "./create-transaction.response";

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler implements ICommandHandler<CreateTransactionCommand, CreateTransactionResponse> {
    constructor(
        private _transactionRepository: ITransactionRepository
    ) { }
    async execute(command: CreateTransactionCommand): Promise<CreateTransactionResponse> {
        const transaction = this.GenerateTransaction(command)
        const insertedGuid = await this._transactionRepository.Insert(transaction)
        await this._transactionRepository.Send(insertedGuid, transaction.value)
        return new CreateTransactionResponse(insertedGuid)
    }

    private GenerateTransaction(command: CreateTransactionCommand) {
        return new Transaction(
            null,
            command.accountExternalIdDebit,
            command.accountExternalIdCredit,
            new TransferType(command.transferTypeId, null),
            command.value,
            TransactionStatus.PENDING,
            null
        )
    }
}
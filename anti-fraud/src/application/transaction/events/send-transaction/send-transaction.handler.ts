import { EventsHandler, IEventHandler } from "@nestjs/cqrs"
import { SendTransactionEvent } from "./send-transaction.event"
import { ITransactionRepository } from "src/domain/transaction/transaction.repository"
import { Transaction } from "src/domain/transaction/transaction"

@EventsHandler(SendTransactionEvent)
export class SendTransactionHandler implements IEventHandler<SendTransactionEvent> {
    constructor(
        private _transactionRepository: ITransactionRepository
    ) { }
    async handle(event: SendTransactionEvent) {
        let transaction = new Transaction(event.guid, event.value, event.status)
        await this._transactionRepository.Send(transaction)
    }
}
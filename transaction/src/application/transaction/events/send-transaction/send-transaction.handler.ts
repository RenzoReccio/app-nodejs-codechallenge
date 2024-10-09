import { EventsHandler, IEventHandler } from "@nestjs/cqrs"
import { SendTransactionEvent } from "./send-transaction.event"
import { ITransactionRepository } from "src/domain/transaction/transaction.repository"

@EventsHandler(SendTransactionEvent)
export class SendTransactionHandler implements IEventHandler<SendTransactionEvent> {
    constructor(
        private _transactionRepository: ITransactionRepository
    ) { }
    async handle(event: SendTransactionEvent) {
        await this._transactionRepository.Send(event.guid, event.value)
    }
}
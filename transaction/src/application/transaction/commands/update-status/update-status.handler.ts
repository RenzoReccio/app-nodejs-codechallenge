import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ITransactionRepository } from "src/domain/transaction/transaction.repository";
import { UpdateStatusCommand } from "./update-status.command";

@CommandHandler(UpdateStatusCommand)
export class UpdateStatusHandler implements ICommandHandler<UpdateStatusCommand, void> {
    constructor(
        private _transactionRepository: ITransactionRepository
    ) { }
    async execute(command: UpdateStatusCommand): Promise<void> {
        await this._transactionRepository.UpdateStatus(command.guid, command.status)
    }

}
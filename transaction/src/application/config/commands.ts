import { CreateTransactionHandler } from "../transaction/commands/create-transaction/create-transaction.handler";
import { UpdateStatusHandler } from "../transaction/commands/update-status/update-status.handler";

export const CommandHandlers = [
    CreateTransactionHandler,
    UpdateStatusHandler
]
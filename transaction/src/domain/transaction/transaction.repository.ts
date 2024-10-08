import { Transaction } from "./transaction";

export abstract class ITransactionRepository {
    abstract Insert(transaction: Transaction): Promise<string>;
    abstract UpdateStatus(transaction: Transaction): Promise<void>;
    abstract FindByGuid(guid: string): Promise<Transaction>;
}
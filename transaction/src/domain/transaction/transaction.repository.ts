import { Transaction } from "./transaction";

export abstract class ITransactionRepository {
    abstract Insert(transaction: Transaction): Promise<string>;
    abstract UpdateStatus(guid: string, status: string): Promise<void>;
    abstract FindByGuid(guid: string): Promise<Transaction>;
    abstract Send(guid: string, value: number): Promise<void>; 
}
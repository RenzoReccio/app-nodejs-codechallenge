import { Transaction } from "./transaction";

export abstract class ITransactionRepository {
    abstract Send(transaction: Transaction): Promise<void>; 
}
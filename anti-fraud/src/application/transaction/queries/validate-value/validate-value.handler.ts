import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { ValidateValueQuery } from "./validate-value.query";
import { TransactionStatus } from "src/domain/transaction/transaction";


@QueryHandler(ValidateValueQuery)
export class ValidateValueHandler implements IQueryHandler<ValidateValueQuery, string> {
    constructor(
    ) { }
    async execute(query: ValidateValueQuery): Promise<string> {
        return query.value > 1000 ? TransactionStatus.REJECTED : TransactionStatus.APPROVED;
    }

}
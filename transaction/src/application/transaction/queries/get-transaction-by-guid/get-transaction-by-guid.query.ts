import { IQueryHandler, QueryHandler } from "@nestjs/cqrs"
import { ITransactionRepository } from "src/domain/transaction/transaction.repository"
import { GetTransactionByGuidQuery } from "./get-transaction-by-guid.handler"
import { GetTransactionByGuidResponse } from "./get-transaction-by-guid.response"

@QueryHandler(GetTransactionByGuidQuery)
export class GetTransactionByGuidHandler implements IQueryHandler<GetTransactionByGuidQuery, GetTransactionByGuidResponse> {
    constructor(
        private _transactionRepository: ITransactionRepository
    ) { }
    async execute(query: GetTransactionByGuidQuery): Promise<GetTransactionByGuidResponse> {
        let result = await this._transactionRepository.FindByGuid(query.guid)
        if (!result) throw new Error('Transaction not found')
        return new GetTransactionByGuidResponse(
            result.guid,
            result.transferType.name,
            result.status,
            result.value,
            result.createdDate.toString()
        )
    }

}
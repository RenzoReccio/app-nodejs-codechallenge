import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { QueryBus, CommandBus, EventBus } from "@nestjs/cqrs";
import { CreateTransactionCommand } from "src/application/transaction/commands/create-transaction/create-transaction.command";
import { GetTransactionByGuidParam } from "../params/get-transaction-by-guid.param";
import { GetTransactionByGuidQuery } from "src/application/transaction/queries/get-transaction-by-guid/get-transaction-by-guid.handler";
import { GetTransactionByGuidResponse } from "src/application/transaction/queries/get-transaction-by-guid/get-transaction-by-guid.response";

@Controller('transaction')
export class TransactionController {

    constructor(
        private _queryBus: QueryBus,
        private _commandBus: CommandBus,
        private _eventBus: EventBus,
    ) { }

    @Post()
    async insert(@Body() transactionDto: CreateTransactionCommand) {
        const result = await this._commandBus.execute<CreateTransactionCommand, string>(transactionDto)
        return { transactionExternalId: result }
    }

    @Get(":guid")
    async get(@Param() params: GetTransactionByGuidParam) {
        const result = await this._queryBus.execute<GetTransactionByGuidQuery, GetTransactionByGuidResponse>(new GetTransactionByGuidQuery(params.guid))

        return result
    }
}
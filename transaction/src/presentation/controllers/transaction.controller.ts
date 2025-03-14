import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { QueryBus, CommandBus, EventBus } from "@nestjs/cqrs";
import { CreateTransactionCommand } from "src/application/transaction/commands/create-transaction/create-transaction.command";
import { GetTransactionByGuidParam } from "../params/get-transaction-by-guid.param";
import { GetTransactionByGuidQuery } from "src/application/transaction/queries/get-transaction-by-guid/get-transaction-by-guid.handler";
import { GetTransactionByGuidResponse } from "src/application/transaction/queries/get-transaction-by-guid/get-transaction-by-guid.response";
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateTransactionResponse } from "src/application/transaction/commands/create-transaction/create-transaction.response";


@Controller('transaction')
@ApiTags('transaction')
export class TransactionController {

    constructor(
        private _queryBus: QueryBus,
        private _commandBus: CommandBus,
    ) { }

    @Post()
    @ApiResponse({ status: 201, type: CreateTransactionResponse })
    async insert(@Body() transactionDto: CreateTransactionCommand) {
        const result = await this._commandBus.execute<CreateTransactionCommand, CreateTransactionResponse>(transactionDto)
        return result
    }

    @Get(":guid")
    @ApiParam({ name: 'guid', type: String, description: 'GUID de la transacción' }) 
    @ApiResponse({ status: 201, type: GetTransactionByGuidResponse })
    async get(@Param() params: GetTransactionByGuidParam) {
        const result = await this._queryBus.execute<GetTransactionByGuidQuery, GetTransactionByGuidResponse>(new GetTransactionByGuidQuery(params.guid))

        return result
    }
}
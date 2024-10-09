import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { FraudValidDto } from "../dtos/fraud-valid.dto";
import { EventBus, QueryBus } from "@nestjs/cqrs";
import { ValidateValueQuery } from "src/application/transaction/queries/validate-value/validate-value.query";
import { SendTransactionEvent } from "src/application/transaction/events/send-transaction/send-transaction.event";

@Controller()
export class TransactionController {
    constructor(
        private _queryBus: QueryBus,
        private _eventBus: EventBus,
    ) { }

    @EventPattern('fraud.valid')
    async handleFraudValid(@Payload() message: FraudValidDto) {
        let status = await this._queryBus.execute(new ValidateValueQuery(message.valueToValidate))
        let event = new SendTransactionEvent(
            message.transactionGuid,
            message.valueToValidate,
            status
        )
        await this._eventBus.publish(event);
    }
}
import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { FraudValidDto } from "../dtos/fraud-valid.dto";
import { CommandBus } from "@nestjs/cqrs";
import { ValidateValueCommand } from "src/application/transaction/commands/validate-value/validate-value.command";

@Controller()
export class TransactionController {
    constructor(
        private _commandBus: CommandBus,
    ) { }

    @EventPattern('fraud.valid')
    async handleFraudValid(@Payload() message: FraudValidDto) {
        await this._commandBus.execute(new ValidateValueCommand(message.transactionGuid, message.valueToValidate))
    }
}
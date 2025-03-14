import { ApiProperty } from "@nestjs/swagger";

export class CreateTransactionResponse {
    @ApiProperty()
    transactionExternalId: string;
    constructor(transactionExternalId: string) {
        this.transactionExternalId = transactionExternalId
    }
}
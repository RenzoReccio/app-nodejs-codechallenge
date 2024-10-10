import { ApiProperty } from "@nestjs/swagger";

export class TransactionType {
    @ApiProperty()
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class TransactionStatus {
    @ApiProperty()
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class GetTransactionByGuidResponse {
    @ApiProperty()
    transactionExternalId: string;

    @ApiProperty()
    transactionType: TransactionType;

    @ApiProperty()
    transactionStatus: TransactionStatus;

    @ApiProperty()
    value: number;

    @ApiProperty()
    createdAt: string;

    constructor(
        transactionExternalId: string,
        transactionType: string,
        transactionStatus: string,
        value: number,
        createdAt: string
    ) {
        this.transactionExternalId = transactionExternalId;
        this.transactionType = new TransactionType(transactionType);
        this.transactionStatus = new TransactionStatus(transactionStatus);
        this.value = value;
        this.createdAt = createdAt;
    }
}

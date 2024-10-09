export class GetTransactionByGuidResponse {
    transactionExternalId: string
    transactionType: TransactionType
    transactionStatus: TransactionStatus
    value: number
    createdAt: string
    constructor(
        transactionExternalId: string,
        transactionType: string,
        transactionStatus: string,
        value: number,
        createdAt: string
    ) {
        this.transactionExternalId = transactionExternalId
        this.transactionType = new TransactionType(transactionType)
        this.transactionStatus = new TransactionStatus(transactionStatus)
        this.value = value
        this.createdAt = createdAt
    }
}

export class TransactionType {
    name: string
    constructor(name: string) {
        this.name = name
    }
}

export class TransactionStatus {
    name: string
    constructor(name: string) {
        this.name = name
    }
}

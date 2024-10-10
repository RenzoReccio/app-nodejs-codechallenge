export class Transaction {
    readonly guid: string
    readonly value: number
    readonly status: TransactionStatus
    constructor(guid: string, value: number) {
        this.guid = guid
        this.value = value
        this.status = value > 1000 ? TransactionStatus.REJECTED : TransactionStatus.APPROVED;
    }
}

export enum TransactionStatus {
    APPROVED = 'Approved',
    REJECTED = 'Rejected'
}
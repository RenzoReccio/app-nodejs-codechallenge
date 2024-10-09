export class Transaction {
    guid: string
    value: number
    status: string
    constructor(guid: string, value: number, status: string) {
        this.guid = guid
        this.value = value
        this.status = status
    }
}


export enum TransactionStatus {
    APPROVED = 'Approved',
    REJECTED = 'Rejected'
}
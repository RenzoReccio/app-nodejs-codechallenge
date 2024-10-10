import { TransferType } from "../transfer-type/transfer-type"

export class Transaction {
    guid: string;
    accountExternalIdDebit: string
    accountExternalIdCredit: string
    transferType: TransferType
    value: number
    status: string
    createdDate: Date
    constructor(
        guid: string,
        accountExternalIdDebit: string,
        accountExternalIdCredit: string,
        transferType: TransferType,
        value: number,
        status: TransactionStatus,
        createdDate: Date
    ) {
        this.guid = guid
        this.accountExternalIdDebit = accountExternalIdDebit
        this.accountExternalIdCredit = accountExternalIdCredit
        this.transferType = transferType
        this.value = value
        this.status = status
        this.createdDate = createdDate
    }
}

export enum TransactionStatus {
    PENDING = 'Pending',
    APPROVED = 'Approved',
    REJECTED = 'Rejected'
}
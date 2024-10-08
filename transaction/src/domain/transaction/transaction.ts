import { TransferType } from "../transfer-type/tranfer-type"

export class Transaction {
    guid: string;
    accountExternalIdDebit: string
    accountExternalIdCredit: string
    transferTypeId: TransferType
    value: number
    status: 'Pending' | 'Approved' | 'Rejected'
    createdDate: Date
    constructor(
        guid: string,
        accountExternalIdDebit: string,
        accountExternalIdCredit: string,
        transferTypeId: TransferType,
        value: number,
        status: 'Pending' | 'Approved' | 'Rejected',
        createdDate: Date
    ) {
        this.guid = guid
        this.accountExternalIdDebit = accountExternalIdDebit
        this.accountExternalIdCredit = accountExternalIdCredit
        this.transferTypeId = transferTypeId
        this.value = value
        this.status = status
        this.createdDate = createdDate
    }
}
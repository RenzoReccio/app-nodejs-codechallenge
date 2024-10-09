import { IsUUID, IsNumber } from "class-validator"

export class CreateTransactionCommand {
    @IsUUID()
    accountExternalIdDebit: string

    @IsUUID()
    accountExternalIdCredit: string
    
    @IsNumber()
    transferTypeId: number
    
    @IsNumber()
    value: number
    constructor(
        accountExternalIdDebit: string,
        accountExternalIdCredit: string,
        transferTypeId: number,
        value: number
    ) {
        this.accountExternalIdDebit = accountExternalIdDebit
        this.accountExternalIdCredit = accountExternalIdCredit
        this.transferTypeId = transferTypeId
        this.value = value
    }
}
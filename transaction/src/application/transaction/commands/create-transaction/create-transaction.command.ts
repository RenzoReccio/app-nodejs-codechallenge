import { ApiProperty } from "@nestjs/swagger"
import { IsUUID, IsNumber } from "class-validator"

export class CreateTransactionCommand {
    @IsUUID()
    @ApiProperty()
    accountExternalIdDebit: string

    @IsUUID()
    @ApiProperty()
    accountExternalIdCredit: string
    
    @IsNumber()
    @ApiProperty()
    transferTypeId: number
    
    @IsNumber()
    @ApiProperty()
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
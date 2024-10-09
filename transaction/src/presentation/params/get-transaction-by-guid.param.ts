import { IsUUID } from "class-validator";

export class GetTransactionByGuidParam {
    @IsUUID()
    guid: string
}
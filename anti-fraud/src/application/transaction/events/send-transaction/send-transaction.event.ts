export class SendTransactionEvent {
    guid: string
    value: number
    status: string
    constructor(guid: string, value: number, status: string) {
        this.guid = guid
        this.value = value
        this.status = status
    }
}
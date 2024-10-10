export class UpdateStatusCommand {
    guid: string
    status: string
    constructor(guid: string, status: string) {
        this.guid = guid
        this.status = status
    }
}
export class ValidateValueCommand {
    guid: string
    value: number
  constructor(guid: string, value: number) {
    this.guid = guid
    this.value = value
  }
}
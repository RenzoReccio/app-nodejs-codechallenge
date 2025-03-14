import { Controller, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Kafka, Consumer } from "kafkajs";
import { UpdateStatusCommand } from "src/application/transaction/commands/update-status/update-status.command";
import { HandleTransactionDto } from "../dtos/handle-transaction.dto";
import { KAFKA_BROKER } from "src/config";

@Controller()
export class TransactionConsummer implements OnModuleInit, OnModuleDestroy {
    private kafka: Kafka;
    private consumer: Consumer;

    constructor(
        private _commandBus: CommandBus
    ) {
        this.kafka = new Kafka({
            clientId: 'transaction-service-recieve',
            brokers: [KAFKA_BROKER()],
        });
        this.consumer = this.kafka.consumer({ groupId: 'transaction-group' });
    }

    private handleMessage(message: HandleTransactionDto) {
        let command = new UpdateStatusCommand(message.transactionGuid, message.status);
        this._commandBus.execute(command);
    }

    async onModuleInit() {
        await this.consumer.connect();
        await this.subscribe('fraud.valid.response', async (message) => {
            this.handleMessage(message);
        });
    }

    async onModuleDestroy() {
        await this.consumer.disconnect();
    }

    async subscribe(topic: string, eachMessageFn: (message: any) => Promise<void>) {
        await this.consumer.subscribe({ topic, fromBeginning: true });
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const value = JSON.parse(message.value.toString());
                await eachMessageFn(value);
            },
        });
    }
}
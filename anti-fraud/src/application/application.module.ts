import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsHandlers } from './config/commands';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Providers } from './config/providers';

@Module({
    imports: [
        CqrsModule,
        ClientsModule.registerAsync([
            {
                name: 'TRANSACTION-RECEIVE',
                useFactory: async () => ({
                    transport: Transport.KAFKA,
                    options: {
                        client: {
                            clientId: 'fraud-sv-res',
                            brokers: ['localhost:9092'],
                        },
                    },
                }),
            },
        ]),
    ],
    providers: [
        ...CommandsHandlers,
        ...Providers
    ]
})
export class ApplicationModule { }

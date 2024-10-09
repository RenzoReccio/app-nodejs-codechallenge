import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { QueriesHandlers } from './config/queries';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventsHandlers } from './config/events';
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
        ...QueriesHandlers,
        ...EventsHandlers,
        ...Providers
    ]
})
export class ApplicationModule { }

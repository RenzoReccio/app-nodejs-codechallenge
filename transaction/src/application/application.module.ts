import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './config/commands';
import { Providers } from './config/providers';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QueryHandlers } from './config/queries';
import { KAFKA_BROKER } from 'src/config';

@Module({
    imports: [
        CqrsModule,
        ClientsModule.registerAsync([
            {
                name: 'TRANSACTION-SEND',
                useFactory: async () => ({
                    transport: Transport.KAFKA,
                    options: {
                        client: {
                            clientId: 'transaction-sv',
                            brokers: [KAFKA_BROKER()],
                        },
                    },
                }),
            },
        ]),
    ],
    providers: [
        ...CommandHandlers,
        ...Providers,
        ...QueryHandlers
    ]
})
export class ApplicationModule { }

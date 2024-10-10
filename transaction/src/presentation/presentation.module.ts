import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from 'src/application/application.module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { TransactionConsummer } from './consumer/transaction.consummer';

@Module({
    imports: [
        CqrsModule,
        InfrastructureModule,
        ApplicationModule
    ],
    controllers: [
        TransactionController,
        TransactionConsummer
    ]
})
export class PresentationModule { }

import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from 'src/application/application.module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    controllers: [TransactionController],
    imports: [
        CqrsModule,
        InfrastructureModule,
        ApplicationModule,
        ConfigModule.forRoot()
    ]
})
export class PresentationModule { }

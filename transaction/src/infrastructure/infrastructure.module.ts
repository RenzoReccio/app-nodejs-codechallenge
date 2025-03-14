import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from 'src/config';
import { TransferTypeSeeder } from './seeders/transfer-type.seeder';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: "postgres",
                host: DB_HOST(),
                port: Number(DB_PORT()),
                username: DB_USER(),
                password: DB_PASSWORD(),
                database: DB_DATABASE(),
                synchronize: true,
                logging: false,
                entities: [join(__dirname, "./entities/*.entity{.ts,.js}")],
            }),
        }),
    ],
    providers: [TransferTypeSeeder],
    exports: [TransferTypeSeeder],
})
export class InfrastructureModule {}

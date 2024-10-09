import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TransferTypeEntity } from "./transfer-type.entity";

@Entity("transaction")
export class TransactionEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    guid: string;

    @Column({ nullable: false })
    accountExternalIdDebit: string

    @Column({ nullable: false })
    accountExternalIdCredit: string

    @ManyToOne(() => TransferTypeEntity, { nullable: true })
    transferType: TransferTypeEntity

    @Column('int', { nullable: false, })
    value: number

    @Column({ nullable: false })
    status: string

    @CreateDateColumn()
    createdDate: Date
}
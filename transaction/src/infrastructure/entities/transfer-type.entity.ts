import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("transferType")
export class TransferTypeEntity extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column({ nullable: true })
    name: string;
}
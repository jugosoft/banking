import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IDepositType } from '../interfaces/deposit-type.interface';

@Entity('deposit_type')
export class DepositType implements IDepositType {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ unique: true })
  type!: string;

  @Column()
  name!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

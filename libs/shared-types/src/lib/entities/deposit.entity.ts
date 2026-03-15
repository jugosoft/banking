import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { DepositType } from './deposit-type.entity';
import { Bank } from './bank.entity';
import { Period } from './period.interface';
import { PercentPeriod } from './percent-period.interface';
import { IDeposit } from './interfaces/deposit.interface';

@Entity('deposit')
export class Deposit implements IDeposit {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ default: false })
  archived: boolean;

  @Column('json')
  period: Period;

  @ManyToOne(() => DepositType)
  @JoinColumn({ name: 'typeId' })
  type: DepositType;

  @ManyToOne(() => Bank)
  @JoinColumn({ name: 'bankId' })
  bank: Bank;

  @Column({ default: false })
  capitalization: boolean;

  @Column({ nullable: true })
  comment: string;

  @Column({ type: 'decimal', precision: 5, scale: 4 })
  displayPercent: number;

  @Column('json')
  percentPeriods: PercentPeriod[];

  @Column({ default: false })
  replenishable: boolean;

  @Column({ default: false })
  withdrawal: boolean;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  startAmount: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  currentAmount: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.deposits)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  typeId: number;

  @Column()
  bankId: number;
}

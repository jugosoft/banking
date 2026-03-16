import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IBank } from '../interfaces/bank.interface';

@Entity('bank')
export class Bank implements IBank {
  @PrimaryGeneratedColumn('increment')
  public id!: number;

  @Column({ unique: true })
  public name!: string;

  @Column({ unique: true })
  public shortName!: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}

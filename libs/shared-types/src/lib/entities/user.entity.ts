import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IResponseErrors } from '../shared';
import { IUser } from '../interfaces/user.interface';
import { Deposit } from './deposit.entity';

@Entity('user')
export class User implements IUser {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  patronymic?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Deposit, deposit => deposit.user)
  deposits?: Deposit[];
}

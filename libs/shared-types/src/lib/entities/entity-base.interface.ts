import { IDepositType } from './deposit-type.interface';

export interface IEntityBase {
    id: number;
    archived: boolean;
    type: IDepositType;
}
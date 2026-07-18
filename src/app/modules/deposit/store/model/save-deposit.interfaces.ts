export interface ISaveDepositProps {
    deposit: {
        id?: number;
        bankId: number;
        depositTypeId: number;
        amount: number;
        percent: number;
        startDate: Date;
        endDate: Date;
        term: number;
    };
}

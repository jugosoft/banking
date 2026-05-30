export interface ISaveDepositProps {
    deposit: {
        bankId: number;
        depositTypeId: number;
        amount: number;
        percent: number;
        startDate: Date;
        endDate: Date;
    };
}

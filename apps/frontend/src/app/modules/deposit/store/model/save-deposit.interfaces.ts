export interface ISaveDepositProps {
    deposit: {
        bankId: number;
        typeId: number;
        amount: number;
        percent: number;
        startDate: Date;
        endDate: Date;
    };
}
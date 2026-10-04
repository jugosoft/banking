export interface IInvestForm {
    bank: { id: number; name: string; shortName: string } | null;
    depositType: { id: number; name: string; } | null;
    amount: number | null;
    startDate: Date | null;
    snapshotDate: Date | null;
}

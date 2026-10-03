export interface IInvestForm {
    bank: { id: number; name: string; shortName: string } | null;
    depositType: { id: number; name: string; } | null;
    depositGroup: { id: number; name: string; code: string };
    amount: number | null;
    startDate: Date | null;
    snapshotDate: Date | null;
}

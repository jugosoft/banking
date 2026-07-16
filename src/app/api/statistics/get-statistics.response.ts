import { IApiResponse } from '../api.interfaces';

export interface INearestDepositClosingInfo {
  id: number;
  bankName: string;
  closeDate: Date;
}

export interface IStatistics {
  totalAmount: number;
  totalInterest: number;
  currentIncome: number;
  nearestDepositClosingInfo: INearestDepositClosingInfo;
}

export interface IGetStatisticsResponse extends IApiResponse<IStatistics> { }

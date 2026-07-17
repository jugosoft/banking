import { IApiResponse } from '../api.interfaces';

export interface IInvestStatistics {
  totalAmount: number;
}

export interface IGetInvestStatisticsResponse extends IApiResponse<IInvestStatistics> { }

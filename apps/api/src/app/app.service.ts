import { Injectable } from '@nestjs/common';
import { IBank } from "@banking/shared-types";
import { IGetDataResponse } from "./types/get-data-response.interface";

@Injectable()
export class AppService {
  public getData(): IBank {
    return  {
        id: 1,
        bankCode: 'alpha',
        bankName: 'Альфа',
        amount: 10_000_000,
        percent: 10.0
    };
  }

  public buildGetDataResponse(bank: IBank): IGetDataResponse {
    return {bank};
  }
}

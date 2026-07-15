import { Component, Input } from '@angular/core';
import { IDeposit } from '@api/deposit';

@Component({
  selector: 'app-deposit-banner',
  standalone: false,
  templateUrl: './deposit-banner.html',
  styleUrl: './deposit-banner.scss',
})
export class DepositBanner {
  @Input() deposits: IDeposit[] = [];

  public get calculatedTotalAmount(): number {
    return this.deposits.reduce((sum, deposit) => sum + deposit.amount, 0);
  }

  public get calculatedTotalInterest(): number {
    const sum = this.deposits.reduce((sum, deposit) => sum + +deposit.percent, 0);
    return sum / this.deposits.length;
  }
}

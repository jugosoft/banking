import { Component, Input, OnInit } from '@angular/core';
import { IDeposit } from '@banking/shared-types';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../shared.module';
import { dateDiffInDays } from '../../../common/utils/date-utils';

@Component({
  selector: 'banking-deposit-card',
  standalone: true,
  imports: [MaterialModule, SharedModule],
  templateUrl: './deposit-card.component.html',
  styleUrl: './deposit-card.component.scss',
})
export class DepositCardComponent implements OnInit {
  @Input() public deposit!: IDeposit;
  public daysBeforeClose: number | null = null;
  public daysTotal: number | null = null;
  public isClosingSoon = false;
  public progressBarColor: 'primary' | 'warn' = 'primary';
  public progressBarPercentage = 0;

  public ngOnInit(): void {
    this.daysBeforeClose = this.getDaysBeforeClose();
    this.daysTotal = this.getDaysTotal();
    this.isClosingSoon = this.getIsClosingSoon();
    if (this.daysBeforeClose) {
      this.progressBarPercentage =
        ((this.daysTotal - this.daysBeforeClose) / this.daysTotal) * 100;
    }

    if (this.isClosingSoon) {
      this.progressBarColor = 'warn';
    }
  }

  /**
   * Поучить число дней до закрытия
   */
  private getDaysBeforeClose(): number {
    return -dateDiffInDays(this.deposit.period.end!, new Date());
  }

  /**
   * Поучить число прогресс-бара
   */
  private getDaysTotal(): number {
    return dateDiffInDays(this.deposit.period.start, this.deposit.period.end!);
  }

  /**
   * Показывать ли, сколько дней осталось до окончания срочного вклада
   */
  private getIsClosingSoon(): boolean {
    return this.daysBeforeClose ? this.daysBeforeClose < 15 : false;
  }
}

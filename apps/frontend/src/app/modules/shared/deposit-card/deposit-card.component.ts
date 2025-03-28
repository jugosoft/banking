import { Component, inject, Input, OnInit } from '@angular/core';
import { IDeposit } from '@banking/shared-types';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../shared.module';
import { dateDiffInDays } from '../../../common/utils/date-utils';
import { Router } from '@angular/router';

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
  public progressBarColor: 'primary' | 'accent' | 'warn' = 'primary';
  public progressBarPercentage = 0;

  private readonly router = inject(Router);

  public ngOnInit(): void {
    if (this.deposit.period.end) {
      this.daysBeforeClose = this.getDaysBeforeClose();
      this.daysTotal = this.getDaysTotal();
      this.isClosingSoon = this.getIsClosingSoon();
      this.progressBarPercentage = ((this.daysTotal - this.daysBeforeClose) / this.daysTotal) * 100;
    }

    if (this.isClosingSoon) {
      this.progressBarColor = 'warn';
    }
  }

  public editDeposit(): void {
    void this.router.navigate(['/deposit', this.deposit.id]);
  }

  /**
   * Поучить число дней до закрытия
   */
  private getDaysBeforeClose(): number {
    return -dateDiffInDays(new Date(this.deposit.period.end!), new Date());
  }

  /**
   * Поучить число прогресс-бара
   */
  private getDaysTotal(): number {
    return dateDiffInDays(
      new Date(this.deposit.period.start),
      new Date(this.deposit.period.end!)
    );
  }

  /**
   * Показывать ли, сколько дней осталось до окончания срочного вклада
   */
  private getIsClosingSoon(): boolean {
    return this.daysBeforeClose ? this.daysBeforeClose < 15 : false;
  }
}

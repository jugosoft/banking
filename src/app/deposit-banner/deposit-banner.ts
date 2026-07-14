import { Component, Input } from '@angular/core';
import { IDepositStats } from '@api/deposit';

@Component({
  selector: 'app-deposit-banner',
  standalone: false,
  templateUrl: './deposit-banner.html',
  styleUrl: './deposit-banner.scss',
})
export class DepositBanner {
  @Input() depositStats: IDepositStats | null = null;
}

import { Component, inject, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/api/statistics.service';
import { IGetStatisticsResponse, IStatistics } from '@api/statistics';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-deposit-banner',
  standalone: false,
  templateUrl: './deposit-banner.html',
  styleUrl: './deposit-banner.scss'
})
export class DepositBanner implements OnInit {
  private readonly statisticsService = inject(StatisticsService);

  public isLoading$ = new BehaviorSubject<boolean>(false);
  public statistics$ = new BehaviorSubject<IStatistics | undefined>(undefined);

  public ngOnInit(): void {
    this.loadStatistics();
  }

  public loadStatistics(): void {
    this.isLoading$.next(true);
    this.statisticsService.getDepositsStatistics$().pipe(
      finalize(() => this.isLoading$.next(false)),
    ).subscribe({
      next: (response: IGetStatisticsResponse) => {
        this.statistics$.next(response.data);
      }
    });
  }
}

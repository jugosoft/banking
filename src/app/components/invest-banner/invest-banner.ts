import { Component, inject, OnInit, signal } from '@angular/core';
import { StatisticsService } from 'src/app/services/api/statistics.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { IInvestStatistics } from '@api/statistics/get-invest-statistics.response';
import { CardLayoutComponent } from "src/app/modules/shared/layouts/card-layout/card-layout.component";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-invest-banner',
  standalone: true,
  imports: [CardLayoutComponent, CommonModule, MatProgressSpinner],
  templateUrl: './invest-banner.html',
  styleUrl: './invest-banner.scss',
})
export class InvestBanner implements OnInit {
  private readonly statisticsService = inject(StatisticsService);

  public isLoading = signal(false);
  public statistics$ = new BehaviorSubject<IInvestStatistics | null>(null);

  public ngOnInit(): void {
    this.loadStatistics();
  }

  public loadStatistics(): void {
    this.isLoading.set(true)
    this.statisticsService.getInvestStatistics$().pipe(
      finalize(() => this.isLoading.set(false)),
    ).subscribe({
      next: response => {
        this.statistics$.next(response.data!);
      }
    });
  }
}

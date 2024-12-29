import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from './modules/shared/shared.module';
import { BankingUiModule } from './modules/banking-ui/banking-ui.module';
import { BehaviorSubject, finalize, map } from 'rxjs';
import { IBank } from '@banking/shared-types';

@Component({
  standalone: true,
  imports: [RouterModule, SharedModule, HttpClientModule, BankingUiModule],
  selector: 'banking-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public readonly navigation: ReadonlyArray<string> = [
    'Вклады',
    'Текущее состояние',
    'Калькулятор',
  ];
  public readonly preloader$ = new BehaviorSubject(false);
  public readonly bank$ = new BehaviorSubject<IBank | null>(null);

  private readonly httpClient = inject(HttpClient);

  public ngOnInit(): void {
    this.preloader$.next(true);
    this.httpClient
      .get<any>('/api/app/fetchText')
      .pipe(
        finalize(() => this.preloader$.next(false)),
        map((response) => response.bank)
      )
      .subscribe({
        next: (bank) => this.bank$.next(bank),
      });
  }
}

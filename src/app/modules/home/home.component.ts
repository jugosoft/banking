import {
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { DepositService } from 'src/app/services/api/deposit.service';
import { BehaviorSubject, combineLatest, concatMap, finalize, forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { IDeposit, IDepositStats, IGetDepositStatsResponse } from 'src/app/api/deposit';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';

/**
 * Компонент домашней страницы
 */
@UntilDestroy()
@Component({
    selector: 'banking-home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    private readonly depositService = inject(DepositService);
    private readonly router = inject(Router);
    public isLoading$ = new BehaviorSubject<boolean>(false);
    public isLoadingStats$ = new BehaviorSubject<boolean>(false);
    public deposits$ = new BehaviorSubject<IDeposit[]>([]);
    public depositStats$ = new BehaviorSubject<IDepositStats | null>(null);

    public ngOnInit(): void {
        this.loadDeposits();
        this.loadDepositStats();
    }

    public onCreateDeposit(): void {
        void this.router.navigate(['/deposit', 'create']);
    }

    public loadDeposits(): void {
        this.isLoading$.next(true);
        this.getDeposits().pipe(
            finalize(() => this.isLoading$.next(false)),
            untilDestroyed(this)
        ).subscribe({
            next: deposits => this.deposits$.next(deposits)
        });
    }

    public loadDepositStats(): void {
        this.isLoadingStats$.next(true);
        this.depositService.getDepositStats$().pipe(
            finalize(() => this.isLoadingStats$.next(false)),
            map(response => response.data ?? null),
            untilDestroyed(this)
        ).subscribe({
            next: depositStats => this.depositStats$.next(depositStats)
        });
    }

    public onDelete(depositId: number): void {
        this.isLoading$.next(true);
        this.deleteDeposit(depositId).pipe(
            switchMap(() => forkJoin([this.getDeposits(), this.getDepositStats()])),
            finalize(() => this.isLoading$.next(false)),
            untilDestroyed(this)
        ).subscribe({
            next: ([deposits, depositStats]) => {
                this.deposits$.next(deposits);
                this.depositStats$.next(depositStats);
            }
        });
    }

    private getDeposits(): Observable<IDeposit[]> {
        return this.depositService.getDepositList$().pipe(
            map(response => response.data?.items ?? []),
        );
    }


    private getDepositStats(): Observable<IDepositStats> {
        return this.depositService.getDepositStats$().pipe(
            map(response => response.data!),
        );
    }

    private deleteDeposit(id: number): Observable<boolean> {
        return this.depositService.deleteDeposit$(id);
    }
}

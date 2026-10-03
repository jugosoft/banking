import {
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { DepositService } from 'src/app/services/api/deposit.service';
import { ReferenceService } from 'src/app/services/api/reference.service';
import { IDeposit } from 'src/app/api/deposit';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { BehaviorSubject, finalize, map, Observable, switchMap } from 'rxjs';
import { IDepositListFilter } from '../store/model/deposit-list-filter.interfaces';

/**
 * Компонент домашней страницы
 */
@UntilDestroy()
@Component({
    selector: 'app-deposit-list',
    standalone: false,
    templateUrl: './deposit-list.component.html',
    styleUrl: './deposit-list.component.scss',
})
export class DepositListComponent implements OnInit {
    private readonly depositService = inject(DepositService);
    private readonly referenceService = inject(ReferenceService);
    private readonly router = inject(Router);

    public isLoading$ = new BehaviorSubject<boolean>(false);
    public deposits$ = new BehaviorSubject<IDeposit[]>([]);
    public banks$ = this.referenceService.banks$;

    // Пагинация
    private readonly pageSize = 10;
    public currentPage = 0;
    public hasMore = true;
    public isLoadingMore = false;

    // Фильтр
    public filter: IDepositListFilter = {
        actual: true
    };

    public get isFiltered(): boolean {
        const { actual, ...restFilters } = this.filter;
        return !!restFilters;
    }

    public ngOnInit(): void {
        this.loadDeposits();
    }

    public onCreateDeposit(): void {
        void this.router.navigate(['/deposit', 'create']);
    }

    public loadDeposits(): void {
        this.isLoading$.next(true);
        this.currentPage = 0;
        this.hasMore = true;
        this.getDeposits().pipe(
            finalize(() => this.isLoading$.next(false)),
            untilDestroyed(this)
        ).subscribe({
            next: response => {
                this.deposits$.next(response.items);
                this.hasMore = response.hasMore;
                this.currentPage = response.page + 1;
            }
        });
    }

    public selectBank(bankId: number | null): void {
        this.filter = {
            ...this.filter,
            bankId: typeof bankId === 'number' ? [bankId] : [],
        };

        this.loadDeposits();
    }

    public loadMoreDeposits(): void {
        if (this.isLoadingMore || !this.hasMore) {
            return;
        }

        this.isLoadingMore = true;
        this.getDeposits(this.currentPage).pipe(
            finalize(() => this.isLoadingMore = false),
            untilDestroyed(this)
        ).subscribe({
            next: response => {
                const currentDeposits = this.deposits$.value;
                this.deposits$.next([...currentDeposits, ...response.items]);
                this.hasMore = response.hasMore;
                this.currentPage = response.page + 1;
            }
        });
    }

    public onDelete(depositId: number): void {
        this.isLoading$.next(true);
        this.deleteDeposit(depositId).pipe(
            switchMap(() => this.getDeposits()),
            finalize(() => this.isLoading$.next(false)),
            untilDestroyed(this)
        ).subscribe({
            next: response => {
                this.deposits$.next(response.items);
                this.hasMore = response.hasMore;
                this.currentPage = response.page + 1;
            }
        });
    }

    private getDeposits(page: number = 0): Observable<{ items: IDeposit[]; hasMore: boolean; page: number }> {
        return this.depositService.getDepositList$(page, this.pageSize, this.filter).pipe(
            map(response => ({
                items: response.data?.items ?? [],
                hasMore: response.data?.hasMore ?? false,
                page: response.data?.page ?? 0
            })),
        );
    }

    private deleteDeposit(id: number): Observable<boolean> {
        return this.depositService.deleteDeposit$(id);
    }
}

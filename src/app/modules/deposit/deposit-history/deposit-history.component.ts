import {
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { BehaviorSubject, finalize, map, Observable } from 'rxjs';
import { DepositService } from 'src/app/services/api/deposit.service';
import { IDeposit } from 'src/app/api/deposit';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScrollTriggerDirective } from 'src/app/common/directives/scroll.directive';
import { IDepositListFilter } from '../store/model/deposit-list-filter.interfaces';
import { EmptyState } from '../../home/empty-state/empty-state';
import { DepositCardComponent } from '../../shared/deposit-card/deposit-card.component';

@Component({
    selector: 'app-deposit-history',
    standalone: true,
    imports: [
        AsyncPipe,
        MatProgressSpinnerModule,
        ScrollTriggerDirective,
        DepositCardComponent,
        EmptyState
    ],
    templateUrl: './deposit-history.component.html',
    styleUrl: './deposit-history.component.scss',
})
export class DepositHistoryComponent implements OnInit {
    private readonly depositService = inject(DepositService);

    public isLoading$ = new BehaviorSubject<boolean>(false);
    public deposits$ = new BehaviorSubject<IDeposit[]>([]);

    private readonly pageSize = 10;
    protected currentPage = 0;
    protected hasMore = true;
    public isLoadingMore = false;

    public filter: IDepositListFilter = {
        actual: false
    };

    public ngOnInit(): void {
        this.loadItems();
    }

    public loadItems(): void {
        this.isLoading$.next(true);
        this.currentPage = 0;
        this.hasMore = true;
        this.getItems().pipe(
            finalize(() => this.isLoading$.next(false))
        ).subscribe({
            next: response => {
                this.deposits$.next(response.items);
                this.hasMore = response.hasMore;
                this.currentPage = response.page + 1;
            }
        });
    }

    public loadMoreItems(): void {
        if (this.isLoadingMore || !this.hasMore) {
            return;
        }

        this.isLoadingMore = true;
        this.getItems(this.currentPage).pipe(
            finalize(() => this.isLoadingMore = false)
        ).subscribe({
            next: response => {
                const currentDeposits = this.deposits$.value;
                this.deposits$.next([...currentDeposits, ...response.items]);
                this.hasMore = response.hasMore;
                this.currentPage = response.page + 1;
            }
        });
    }

    protected getItems(page: number = 0): Observable<{ items: IDeposit[]; hasMore: boolean; page: number }> {
        return this.depositService.getDepositList$(page, this.pageSize, this.filter).pipe(
            map(response => ({
                items: response.data?.items ?? [],
                hasMore: response.data?.hasMore ?? false,
                page: response.data?.page ?? 0
            })),
        );
    }

    public onDelete(depositId: number): void {
        this.isLoading$.next(true);
        this.deleteDeposit(depositId).pipe(
            finalize(() => this.isLoading$.next(false))
        ).subscribe({
            next: () => this.loadItems()
        });
    }

    private deleteDeposit(id: number): Observable<boolean> {
        return this.depositService.deleteDeposit$(id);
    }
}

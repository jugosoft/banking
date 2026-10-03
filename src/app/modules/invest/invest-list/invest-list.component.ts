import {
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { InvestService } from 'src/app/services/api/invest.service';
import { IInvestListItem } from 'src/app/api/invest';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { BehaviorSubject, finalize, map, Observable, switchMap } from 'rxjs';

/**
 * Компонент домашней страницы инвестиций
 */
@UntilDestroy()
@Component({
    selector: 'app-invest-list',
    standalone: false,
    templateUrl: './invest-list.component.html',
    styleUrl: './invest-list.component.scss',
})
export class InvestListComponent implements OnInit {
    private readonly investService = inject(InvestService);
    private readonly router = inject(Router);
    
    public isLoading$ = new BehaviorSubject<boolean>(false);
    public invests$ = new BehaviorSubject<IInvestListItem[]>([]);
    
    // Пагинация
    private readonly pageSize = 10;
    public currentPage = 0;
    public hasMore = true;
    public isLoadingMore = false;

    public ngOnInit(): void {
        this.loadInvests();
    }

    public onCreateInvest(): void {
        void this.router.navigate(['/invest', 'create']);
    }

    public loadInvests(): void {
        this.isLoading$.next(true);
        this.currentPage = 0;
        this.hasMore = true;
        this.getInvests().pipe(
            finalize(() => this.isLoading$.next(false)),
            untilDestroyed(this)
        ).subscribe({
            next: response => {
                this.invests$.next(response.items);
                this.hasMore = response.hasMore;
                this.currentPage = response.page + 1;
            }
        });
    }

    public loadMoreInvests(): void {
        if (this.isLoadingMore || !this.hasMore) {
            return;
        }

        this.isLoadingMore = true;
        this.getInvests(this.currentPage).pipe(
            finalize(() => this.isLoadingMore = false),
            untilDestroyed(this)
        ).subscribe({
            next: response => {
                const currentInvests = this.invests$.value;
                this.invests$.next([...currentInvests, ...response.items]);
                this.hasMore = response.hasMore;
                this.currentPage = response.page + 1;
            }
        });
    }

    public onDelete(investId: number): void {
        this.isLoading$.next(true);
        this.deleteInvest(investId).pipe(
            switchMap(() => this.getInvests()),
            finalize(() => this.isLoading$.next(false)),
            untilDestroyed(this)
        ).subscribe({
            next: response => {
                this.invests$.next(response.items);
                this.hasMore = response.hasMore;
                this.currentPage = response.page + 1;
            }
        });
    }

    private getInvests(page: number = 0): Observable<{ items: IInvestListItem[]; hasMore: boolean; page: number }> {
        return this.investService.getInvestList$(page, this.pageSize).pipe(
            map(response => ({
                items: response.data?.items ?? [],
                hasMore: response.data?.hasMore ?? false,
                page: response.data?.page ?? 0
            })),
        );
    }

    private deleteInvest(id: number): Observable<boolean> {
        return this.investService.deleteInvest$(id);
    }
}

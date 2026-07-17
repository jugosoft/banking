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

    public ngOnInit(): void {
        this.loadInvests();
    }

    public onCreateInvest(): void {
        void this.router.navigate(['/invest', 'create']);
    }

    public loadInvests(): void {
        this.isLoading$.next(true);
        this.getInvests().pipe(
            finalize(() => this.isLoading$.next(false)),
            untilDestroyed(this)
        ).subscribe({
            next: invests => this.invests$.next(invests)
        });
    }

    public onDelete(investId: number): void {
        this.isLoading$.next(true);
        this.deleteInvest(investId).pipe(
            switchMap(() => this.getInvests()),
            finalize(() => this.isLoading$.next(false)),
            untilDestroyed(this)
        ).subscribe({
            next: invests => this.invests$.next(invests)
        });
    }

    private getInvests(): Observable<IInvestListItem[]> {
        return this.investService.getInvestList$().pipe(
            map(response => response.data?.items ?? []),
        );
    }

    private deleteInvest(id: number): Observable<boolean> {
        return this.investService.deleteInvest$(id);
    }
}

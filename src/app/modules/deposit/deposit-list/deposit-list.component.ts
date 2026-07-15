import {
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { DepositService } from 'src/app/services/api/deposit.service';
import { IDeposit } from 'src/app/api/deposit';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { BehaviorSubject, finalize, map, Observable, switchMap } from 'rxjs';

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
    private readonly router = inject(Router);
    public isLoading$ = new BehaviorSubject<boolean>(false);
    public deposits$ = new BehaviorSubject<IDeposit[]>([]);

    public ngOnInit(): void {
        this.loadDeposits();
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

    public onDelete(depositId: number): void {
        this.isLoading$.next(true);
        this.deleteDeposit(depositId).pipe(
            switchMap(() => this.getDeposits()),
            finalize(() => this.isLoading$.next(false)),
            untilDestroyed(this)
        ).subscribe({
            next: deposits => this.deposits$.next(deposits)
        });
    }

    private getDeposits(): Observable<IDeposit[]> {
        return this.depositService.getDepositList$().pipe(
            map(response => response.data?.items ?? []),
        );
    }

    private deleteDeposit(id: number): Observable<boolean> {
        return this.depositService.deleteDeposit$(id);
    }
}

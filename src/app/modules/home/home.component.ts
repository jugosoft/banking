import {
    Component,
    DestroyRef,
    inject,
    OnInit,
} from '@angular/core';
import { DepositService } from 'src/app/services/api/deposit.service';
import { BehaviorSubject, finalize, map, Observable, switchMap } from 'rxjs';
import { IDeposit } from 'src/app/api/deposit';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../auth/store/auth.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Компонент домашней страницы
 */
@Component({
    selector: 'banking-home',
    standalone: false,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    private readonly depositService = inject(DepositService);
    private readonly router = inject(Router);
    private readonly store = inject(Store);
    private readonly destroyRef = inject(DestroyRef);

    public isLoading$ = new BehaviorSubject<boolean>(false);
    public deposits$ = new BehaviorSubject<IDeposit[]>([]);
    public currentUser$ = this.store.select(selectCurrentUser);
    public isLoadingUser$ = new BehaviorSubject<boolean>(true);

    public ngOnInit(): void {
        this.checkAuthAndLoad();
    }

    /**
     * Проверяем состояние авторизации.
     * Если пользователь не загружен (ошибка getCurrentUser или не авторизован) — показываем GuestBanner.
     * Иначе загружаем список депозитов.
     */
    private checkAuthAndLoad(): void {
        this.currentUser$.pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe((user) => {
            this.isLoadingUser$.next(false);

            if (!user) {
                // Не авторизован или ошибка загрузки — показываем баннер гостя
                return;
            }

            this.loadDeposits();
        });
    }

    public onCreateDeposit(): void {
        void this.router.navigate(['/deposit', 'create']);
    }

    public loadDeposits(): void {
        this.isLoading$.next(true);
        this.getDeposits().pipe(
            finalize(() => this.isLoading$.next(false)),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe({
            next: deposits => this.deposits$.next(deposits)
        });
    }

    public onDelete(depositId: number): void {
        this.isLoading$.next(true);
        this.deleteDeposit(depositId).pipe(
            switchMap(() => this.getDeposits()),
            finalize(() => this.isLoading$.next(false)),
            takeUntilDestroyed(this.destroyRef)
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

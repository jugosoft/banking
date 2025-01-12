import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../../auth/store/auth.selectors';

/**
 * Компонент десктопного заголовка страницы. Применяется внутри контейнера
 */
@Component({
  selector: 'banking-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  public readonly isLoggedIn$ = this.store.pipe(select(selectIsLoggedIn));

  public readonly navigation: readonly string[] = [
    'Вклады',
    'Текущее состояние',
    'Калькулятор',
  ];

  public onLoginClick(): void {
    void this.router.navigate(['/auth', 'login']);
  }

  public onRegisterClick(): void {
    void this.router.navigate(['/auth', 'register']);
  }

  public goToDepositCreate(): void {
    void this.router.navigate(['/deposit', 'create']);
  }
}

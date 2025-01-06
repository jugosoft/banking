import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../../auth/store/auth.selectors';
import { tap } from 'rxjs';

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
  public readonly isLoggedIn$ = this.store.pipe(
    tap((val) => console.log(val)),
    select(selectIsLoggedIn)
  );

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
}

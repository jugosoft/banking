import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../../auth/store/auth.selectors';

/**
 * Компонент обёртки страницы
 */
@Component({
  selector: 'banking-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss',
})
export class WrapperComponent {
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  public readonly isLoggedIn$ = this.store.pipe(select(selectIsLoggedIn));

  public onLoginClick(): void {
    void this.router.navigate(['/auth', 'login']);
  }

  public onRegisterClick(): void {
    void this.router.navigate(['/auth', 'register']);
  }

  public onDepositCreate(): void {
    void this.router.navigate(['/deposit', 'create']);
  }
}

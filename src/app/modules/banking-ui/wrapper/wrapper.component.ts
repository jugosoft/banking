import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { selectIsLoggedIn } from '../../auth/store/auth.selectors';
import { logout } from '../../auth/store/auth.actions';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

/**
 * Компонент обёртки страницы с адаптивным layout
 */
@Component({
  selector: 'banking-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    RouterLink,
    RouterLinkActive,
    AsyncPipe
  ],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss',
  animations: [
    trigger('navAnimation', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ]),
    trigger('mobileMenuAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0.8)' })),
      state('*', style({ opacity: 1, transform: 'scale(1)' })),
      transition('void => *', [
        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ]),
    trigger('logoAnimation', [
      state('normal', style({ transform: 'scale(1)' })),
      state('compact', style({ transform: 'scale(0.9)' })),
      transition('normal => compact', [
        animate('200ms ease-in')
      ]),
      transition('compact => normal', [
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class WrapperComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly store = inject(Store);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly destroy$ = new Subject<void>();

  public readonly isLoggedIn$ = this.store.select(selectIsLoggedIn);
  public isSidenavOpen = signal(false);
  public isScrolled = signal(false);

  // Определение мобильного устройства
  public isMobile = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small])
    .pipe(
      map(state => state.matches),
      startWith(this.breakpointObserver.isMatched([Breakpoints.Handset, Breakpoints.Small]))
    );

  ngOnInit(): void {
    // Обработка скролла для компактного хедера
    fromEvent(window, 'scroll')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isScrolled.set(window.pageYOffset > 20);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public toggleSidenav(): void {
    this.isSidenavOpen.update(value => !value);
  }

  public onSidenavOpened(): void {
    this.isSidenavOpen.set(true);
  }

  public onSidenavClosed(): void {
    this.isSidenavOpen.set(false);
  }

  public onSidenavLinkClick(): void {
    if (this.breakpointObserver.isMatched([Breakpoints.Handset, Breakpoints.Small])) {
      this.isSidenavOpen.set(false);
    }
  }

  public onSidenavLogoutClick(): void {
    this.store.dispatch(logout());
    this.isSidenavOpen.set(false);
  }

  public onSidenavRegisterClick(): void {
    void this.router.navigate(['/auth', 'register']);
    this.isSidenavOpen.set(false);
  }

  public onSidenavLoginClick(): void {
    void this.router.navigate(['/auth', 'login']);
    this.isSidenavOpen.set(false);
  }

  // Desktop navigation methods
  public onHomeClick(): void {
    void this.router.navigate(['/home']);
  }

  public onLoginClick(): void {
    void this.router.navigate(['/auth', 'login']);
  }

  public onRegisterClick(): void {
    void this.router.navigate(['/auth', 'register']);
  }

  public onDepositCreate(): void {
    void this.router.navigate(['/deposit', 'create']);
  }

  public onProfileClick(): void {
    void this.router.navigate(['/profile']);
  }

  public onLogoutClick(): void {
    this.store.dispatch(logout());
  }
}

// Helper function for window events
function fromEvent(target: Window | EventTarget, eventName: string): Observable<Event> {
  return new Observable<Event>(subscriber => {
    const handler = (e: Event) => subscriber.next(e);
    target.addEventListener(eventName, handler);
    return () => target.removeEventListener(eventName, handler);
  });
}
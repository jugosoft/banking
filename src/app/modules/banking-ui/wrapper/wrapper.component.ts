import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { Observable, fromEvent } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { selectIsLoggedIn } from '../../auth/store/auth.selectors';
import { logout } from '../../auth/store/auth.actions';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AsyncPipe } from '@angular/common';

/**
 * Компонент обёртки страницы с адаптивным layout
 */
@Component({
    selector: 'banking-wrapper',
    standalone: true,
    imports: [
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        AsyncPipe,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
    ],
    templateUrl: './wrapper.component.html',
    styleUrl: './wrapper.component.scss'
})
export class WrapperComponent implements OnInit {
    private readonly router = inject(Router);
    private readonly platformId = inject(PLATFORM_ID);
    private readonly store = inject(Store);
    private readonly breakpointObserver = inject(BreakpointObserver);
    private readonly destroyRef = inject(DestroyRef);

    public readonly isLoggedIn$ = this.store.select(selectIsLoggedIn);
    public isSidenavOpen = signal(false);
    public isScrolled = signal(false);

    // Определение мобильного устройства
    public isMobile = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small]).pipe(
        map(state => state.matches),
        startWith(this.breakpointObserver.isMatched([Breakpoints.Handset, Breakpoints.Small]))
    );

    public ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            // Обработка скролла для компактного хедера
            fromEvent(window, 'scroll').pipe(
                takeUntilDestroyed(this.destroyRef)
            ).subscribe(() => {
                this.isScrolled.set(window.pageYOffset > 20);
            });
        }
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
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'banking-guest-banner',
    standalone: true,
    imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
    template: `
        <div class="guest-banner">
            <mat-icon class="guest-banner__icon">person_off</mat-icon>
            <h2 class="guest-banner__title">Добро пожаловать в BANKING</h2>
            <p class="guest-banner__subtitle">
                Войдите в систему или зарегистрируйтесь, чтобы управлять своими вкладами и инвестициями
            </p>
            <div class="guest-banner__actions">
                <a routerLink="/auth/login" mat-raised-button color="primary">
                    <mat-icon>login</mat-icon>
                    Войти
                </a>
                <a routerLink="/auth/register" mat-stroked-button>
                    <mat-icon>person_add</mat-icon>
                    Регистрация
                </a>
            </div>
        </div>
    `,
    styles: [`
        .guest-banner {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 64px 24px;
            text-align: center;
            min-height: 400px;
        }

        .guest-banner__icon {
            font-size: 64px;
            width: 64px;
            height: 64px;
            color: rgba(0, 0, 0, 0.38);
            margin-bottom: 24px;
        }

        .guest-banner__title {
            margin: 0 0 12px;
            font-size: 28px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.87);
        }

        .guest-banner__subtitle {
            margin: 0 0 32px;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.6);
            max-width: 480px;
            line-height: 1.5;
        }

        .guest-banner__actions {
            display: flex;
            gap: 16px;
        }

        @media (max-width: 599px) {
            .guest-banner {
                padding: 40px 16px;
                min-height: 300px;
            }

            .guest-banner__icon {
                font-size: 48px;
                width: 48px;
                height: 48px;
            }

            .guest-banner__title {
                font-size: 22px;
            }

            .guest-banner__subtitle {
                font-size: 14px;
            }

            .guest-banner__actions {
                flex-direction: column;
                width: 100%;
                max-width: 280px;
            }
        }
    `],
})
export class GuestBannerComponent { }

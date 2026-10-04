import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'banking-not-found',
    standalone: true,
    imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
    template: `
        <div class="not-found">
            <mat-icon class="not-found__icon">error_outline</mat-icon>
            <h1 class="not-found__code">404</h1>
            <h2 class="not-found__title">Страница не найдена</h2>
            <p class="not-found__description">
                Запрашиваемая страница не существует или была перемещена.
                Проверьте URL и попробуйте снова.
            </p>
            <div class="not-found__actions">
                <a routerLink="/home" mat-raised-button color="primary">
                    <mat-icon>home</mat-icon>
                    На главную
                </a>
                <button mat-stroked-button (click)="goBack()">
                    <mat-icon>arrow_back</mat-icon>
                    Назад
                </button>
            </div>
        </div>
    `,
    styles: [`
        .not-found {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 64px 24px;
            text-align: center;
            min-height: 60vh;
        }

        .not-found__icon {
            font-size: 80px;
            width: 80px;
            height: 80px;
            color: rgba(0, 0, 0, 0.12);
            margin-bottom: 16px;
        }

        .not-found__code {
            font-size: 96px;
            font-weight: 300;
            margin: 0;
            color: rgba(0, 0, 0, 0.54);
            line-height: 1;
        }

        .not-found__title {
            font-size: 24px;
            font-weight: 400;
            margin: 16px 0 8px;
            color: rgba(0, 0, 0, 0.87);
        }

        .not-found__description {
            font-size: 16px;
            color: rgba(0, 0, 0, 0.6);
            max-width: 400px;
            margin: 0 0 32px;
            line-height: 1.5;
        }

        .not-found__actions {
            display: flex;
            gap: 16px;
        }

        @media (max-width: 599px) {
            .not-found {
                padding: 40px 16px;
                min-height: 50vh;
            }

            .not-found__code {
                font-size: 64px;
            }

            .not-found__icon {
                font-size: 56px;
                width: 56px;
                height: 56px;
            }

            .not-found__actions {
                flex-direction: column;
                width: 100%;
                max-width: 280px;
            }
        }
    `],
})
export class NotFoundComponent {
    public goBack(): void {
        window.history.back();
    }
}

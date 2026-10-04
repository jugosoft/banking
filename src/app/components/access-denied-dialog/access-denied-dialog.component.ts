import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'banking-access-denied-dialog',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
    template: `
        <div class="access-denied">
            <div class="access-denied__header">
                <mat-icon class="access-denied__icon">lock</mat-icon>
                <h2 mat-dialog-title>Доступ запрещён</h2>
            </div>
            <div class="access-denied__body">
                <p>У вас нет прав доступа к запрошенному ресурсу.</p>
                <p class="access-denied__hint">Если вы считаете, что это ошибка, обратитесь к администратору.</p>
            </div>
            <div class="access-denied__actions">
                <button mat-raised-button color="primary" (click)="close()" autofocus>
                    <mat-icon>arrow_back</mat-icon>
                    Вернуться на главную
                </button>
            </div>
        </div>
    `,
    styles: [`
        .access-denied {
            padding: 8px;
            max-width: 400px;
        }

        .access-denied__header {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;
        }

        .access-denied__icon {
            font-size: 48px;
            width: 48px;
            height: 48px;
            color: #ff9800;
        }

        .access-denied__header h2 {
            margin: 0;
            font-size: 20px;
            font-weight: 500;
            text-align: center;
        }

        .access-denied__body {
            margin-bottom: 24px;
            text-align: center;
        }

        .access-denied__body p {
            margin: 0 0 8px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.87);
            line-height: 1.5;
        }

        .access-denied__hint {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.54);
        }

        .access-denied__actions {
            display: flex;
            justify-content: center;
        }
    `],
})
export class AccessDeniedDialogComponent {
    private dialogRef = inject(MatDialogRef<AccessDeniedDialogComponent>);

    public close(): void {
        this.dialogRef.close();
    }
}

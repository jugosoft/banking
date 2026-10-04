import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccessDeniedDialogComponent } from '../../components/access-denied-dialog/access-denied-dialog.component';

/**
 * Интерцептор для обработки ошибок 403 (Forbidden).
 * При получении 403 показывает модалку "Доступ запрещён".
 */
@Injectable()
export class ForbiddenInterceptor implements HttpInterceptor {
    private readonly dialog = inject(MatDialog);
    private hasShownDialog = false;

    public intercept(
        req: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 403 && !this.hasShownDialog) {
                    this.hasShownDialog = true;
                    this.dialog.open(AccessDeniedDialogComponent, {
                        maxWidth: '400px',
                        disableClose: true,
                    });

                    // Через 3 секунды закрываем и редиректим на главную
                    setTimeout(() => {
                        window.location.href = '/home';
                    }, 3000);
                }
                return throwError(() => error);
            })
        );
    }
}

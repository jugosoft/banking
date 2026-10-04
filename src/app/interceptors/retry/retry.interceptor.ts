import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError, retry } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Интерцептор для автоматического повтора запросов при серверных ошибках (5xx).
 * Retry применяется только к GET-запросам, чтобы избежать дублирования мутаций.
 * Максимум 2 повторения с задержкой 500мс и 1с.
 */
@Injectable()
export class RetryInterceptor implements HttpInterceptor {
    private readonly maxRetries = 2;

    public intercept(
        req: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        // Retry только для GET-запросов (безопасная операция)
        if (req.method !== 'GET') {
            return next.handle(req);
        }

        return next.handle(req).pipe(
            retry({
                count: this.maxRetries,
                delay: (attempt, retryCount) => {
                    // Exponential backoff: 500ms, 1000ms
                    return new Promise(resolve =>
                        setTimeout(resolve, 500 * Math.pow(2, attempt - 1))
                    );
                },
            }),
            catchError((error: HttpErrorResponse) => {
                // Не retry-им 4xx ошибки — это клиентские ошибки
                if (error.status >= 400 && error.status < 500) {
                    return throwError(() => error);
                }
                return throwError(() => error);
            })
        );
    }
}

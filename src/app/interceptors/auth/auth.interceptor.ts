import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private readonly router = inject(Router);

    public intercept(
        req: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        req = req.clone({ withCredentials: true });

        return next.handle(req).pipe(
            // tap({
            //     error: (error: HttpErrorResponse) => {
            //         if (error.status === 401) {
            //             // Перенаправляем на страницу входа
            //             this.router.navigate(['/auth']);
            //         }
            //     }
            // })
        );
    }
}

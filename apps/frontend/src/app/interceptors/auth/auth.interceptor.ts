import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage-service/local-storage-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly localStorageService = inject(LocalStorageService);
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.localStorageService.get<string>('jwtToken');
    req = req.clone({
      setHeaders: {
        Authorization: token ?? '',
      },
    });
    return next.handle(req);
  }
}

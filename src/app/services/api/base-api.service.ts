import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../config/api.config';
import { ToastService } from '../toast/toast.service';
import { ApiEntity } from './api-entities.type';

@Injectable()
export abstract class BaseApiService {
    private readonly httpClient = inject(HttpClient);
    private readonly toastService = inject(ToastService);
    private readonly platformId = inject(PLATFORM_ID);

    protected readonly apiUrl = environment.apiUrl;
    protected readonly entity: ApiEntity;

    constructor(entity: ApiEntity) {
        if (!entity) {
            throw new Error('Entity is required');
        }

        this.entity = entity;
    }

    protected isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    protected get<T>(url: string, params?: any): Observable<T> {
        if (!this.isBrowser()) {
            return new Observable<T>(subscriber => {
                subscriber.complete();
            });
        }
        return this.httpClient.get<T>(`${this.apiUrl}${this.entity}${url}`, { params }).pipe(
            catchError(this.handleError)
        );
    }

    protected post<T>(url: string, body?: any): Observable<T> {
        if (!this.isBrowser()) {
            return new Observable<T>(subscriber => {
                subscriber.complete();
            });
        }
        return this.httpClient.post<T>(`${this.apiUrl}${this.entity}${url}`, body).pipe(
            catchError(this.handleError)
        );
    }

    protected put<T>(url: string, body?: any): Observable<T> {
        if (!this.isBrowser()) {
            return new Observable<T>(subscriber => {
                subscriber.complete();
            });
        }
        return this.httpClient.put<T>(`${this.apiUrl}${this.entity}${url}`, body).pipe(
            catchError(this.handleError)
        );
    }

    protected delete<T>(url: string): Observable<T> {
        if (!this.isBrowser()) {
            return new Observable<T>(subscriber => {
                subscriber.complete();
            });
        }
        return this.httpClient.delete<T>(`${this.apiUrl}${this.entity}${url}`).pipe(
            catchError(this.handleError)
        );
    }

    private readonly handleError = (error: HttpErrorResponse): Observable<never> => {
        let errorMessage = 'Произошла ошибка';
        if (error.error instanceof ErrorEvent) {
            // Клиентская ошибка
            errorMessage = `Ошибка: ${error.error.message}`;
        } else {
            // Серверная ошибка
            errorMessage = `Сообщение: ${error.message}`;
        }
        this.toastService.error(errorMessage);
        return throwError(() => new Error(errorMessage));
    };
}

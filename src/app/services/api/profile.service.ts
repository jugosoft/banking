import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';

@Injectable({
    providedIn: 'root',
})
export class ProfileService extends BaseApiService {
    constructor() {
        super('/profile');
    }

    // Добавьте методы сервиса при необходимости
}

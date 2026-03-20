import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    private isBrowser: boolean;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    public get(key: string): string | null {
        if (!this.isBrowser) {
            return null;
        }

        try {
            return localStorage.getItem(key);
        } catch (e) {
            console.warn('localStorage is not accessible', e);
            return null;
        }
    }

    public set(key: string, value: string): void {
        if (!this.isBrowser) {
            return;
        }

        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.warn('localStorage is not accessible', e);
        }
    }

    public remove(key: string): void {
        if (!this.isBrowser) {
            return;
        }

        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('localStorage is not accessible', e);
        }
    }
}
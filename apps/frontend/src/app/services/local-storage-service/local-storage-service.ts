import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public get<T>(key: string): T | null {
    const value: string | null = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  }

  public save(key: string, obj: unknown = {}): void {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }
}

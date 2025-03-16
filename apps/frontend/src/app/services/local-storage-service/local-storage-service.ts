import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public get<T extends string>(key: string): T | null {
    const value: string | null = localStorage.getItem(key);
    return value ? value as T : null;
  }

  public save(key: string, obj: unknown = {}): void {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }
}

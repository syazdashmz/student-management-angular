import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Data {
  private isBrowser = typeof window !== 'undefined' && !!window.localStorage;

  setLocalStorage(key: string, value: any): void {
    if (!this.isBrowser) return;

    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalStorage<T = any>(key: string): T | null {
    if (!this.isBrowser) return null;

    const item = localStorage.getItem(key);

    if (!item) return null;

    try {
      return JSON.parse(item) as T;
    } catch {
      return item as T;
    }
  }

  removeLocalStorage(key: string): void {
    if (!this.isBrowser) return;

    localStorage.removeItem(key);
  }
}
import { Injectable } from '@angular/core';
import { Api } from './api';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private api: Api) {}

  login(email: string, password: string) {
    return this.api.httpPost('/auth/login', {
      email,
      password,
    });
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  storeUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  clearAuth(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  logout(): void {
    this.clearAuth();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
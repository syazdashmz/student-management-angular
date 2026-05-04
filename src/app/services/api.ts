import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseURL = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  httpGet(path: string) {
    const fullUrl = this.buildUrl(path);
    const headers = this.getAuthHeaders();

    return new Promise((resolve, reject) => {
      this.httpClient.get(fullUrl, { headers }).subscribe({
        next: (response: any) => resolve(response),
        error: (error: any) => reject(error),
      });
    });
  }

  httpPost(path: string, payload: any) {
    const fullUrl = this.buildUrl(path);
    const headers = this.getAuthHeaders();

    return new Promise((resolve, reject) => {
      this.httpClient.post(fullUrl, payload, { headers }).subscribe({
        next: (response: any) => resolve(response),
        error: (error: any) => reject(error),
      });
    });
  }

  private buildUrl(path: string): string {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    return this.baseURL + path;
  }

  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();

    const token = localStorage.getItem('token');

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }
}
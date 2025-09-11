import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl + 'api/Auth/login';
  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        if (response?.token?.result) {
          // const token = response.token.result;
          // sessionStorage.setItem('authToken', token);
          // sessionStorage.setItem('entityId', response.entityId);
          // sessionStorage.setItem('isSPOC', response.isSPOC);
          // sessionStorage.setItem('bankId', response.bankId);
          // this.tokenSubject.next(token);

        }
      })
    );
  }

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }
  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;
    const now = Math.floor(Date.now() / 1000);

    return expiry < now;
  }


  logout() {
    sessionStorage.clear();
    sessionStorage.removeItem('hasRefreshed');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('entityId');
    sessionStorage.removeItem('isSPOC');
    sessionStorage.removeItem('bankId');
    sessionStorage.removeItem('roleName');
    sessionStorage.removeItem('roleId');
    sessionStorage.removeItem('permissions');
    this.tokenSubject.next(null);
  }
}
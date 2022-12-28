import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { map, Observable, tap } from 'rxjs';
import {
  AuthenticationResponse,
  LoginRequest,
  RefreshToken,
  RegisterRequest,
} from 'src/app/dto/data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  private refreshTokenObject: RefreshToken = {
    refreshToken: this.getRefreshToken(),
    email: this.getUserEmail(),
  };

  register(user: RegisterRequest): Observable<boolean> {
    this.clearLocalStorage();
    return this.http
      .post<AuthenticationResponse>(
        `${environment.apiBaseUrl}/api/auth/register`,
        user
      )
      .pipe(
        map((data) => {
          this.localStorage.store(
            'authentication_token',
            data.authenticationToken
          );
          this.localStorage.store('expires_at', data.expiresAt);
          this.localStorage.store('refresh_token', data.refreshToken);
          this.localStorage.store('c_email', data.email);

          //////////////////////////////////////
          return true;
        })
      );
  }

  login(user: LoginRequest): Observable<boolean> {
    this.clearLocalStorage();
    return this.http
      .post<AuthenticationResponse>(
        `${environment.apiBaseUrl}/api/auth/login`,
        user
      )
      .pipe(
        map((data) => {
          this.localStorage.store(
            'authentication_token',
            data.authenticationToken
          );
          this.localStorage.store('expires_at', data.expiresAt);
          this.localStorage.store('refresh_token', data.refreshToken);
          this.localStorage.store('c_email', data.email);

          //////////////////////////////////////
          return true;
        })
      );
  }

  getJwtToken() {
    return this.localStorage.retrieve('authentication_token');
  }

  refreshToken() {
    return this.http
      .post<AuthenticationResponse>(
        `${environment.apiBaseUrl}/api/auth/refresh/token`,
        this.refreshTokenObject
      )
      .pipe(
        tap((response) => {
          this.localStorage.clear('authentication_token');
          this.localStorage.clear('expires_at');
          // restore them
          this.localStorage.store(
            'authenticationToken',
            response.authenticationToken
          );
          this.localStorage.store('expires_at', response.expiresAt);
        })
      );
  }

  logout(): void {
    this.http
      .post(
        `${environment.apiBaseUrl}/api/auth/logout`,
        this.refreshTokenObject,
        {
          responseType: 'text',
        }
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log('error => ', error);
        }
      );
    this.clearLocalStorage();
  }

  isManager(): Observable<Boolean> {
    return this.http.get<Boolean>(
      `${environment.apiBaseUrl}/api/auth/system/user/${this.getUserEmail()}`
    );
  }

  getUserEmail(): string {
    return this.localStorage.retrieve('c_email');
  }

  getRefreshToken(): string {
    return this.localStorage.retrieve('refresh_token');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  clearLocalStorage(): void {
    this.localStorage.clear('authentication_token');
    this.localStorage.clear('c_email');
    this.localStorage.clear('refresh_token');
    this.localStorage.clear('expires_at');
  }
}

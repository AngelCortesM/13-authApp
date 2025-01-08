import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AuthStatus, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private readonly http = inject(HttpClient);
  private readonly _currentUser = signal<User | null>(null);
  private readonly _authStatus = signal<AuthStatus>(AuthStatus.cheking);
  public readonly currentUser = computed(() => this._currentUser());
  public readonly authStatus = computed(() => this._authStatus());
  constructor() {}

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };
    return this.http.post<LoginResponse>(url, body).pipe(
      tap(({ user, token }) => {
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token', token);
        console.log({ user, token });
      }),
      map(() => true),
      catchError((err) => throwError(() => err.error.message))
    );
  }
}

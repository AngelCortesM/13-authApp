import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthStatus, User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private readonly http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.cheking);

  constructor() {}

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(
        map((response: any) => {
          const user = response as User;
          this._currentUser.set(user);
          this._authStatus.set(AuthStatus.authenticated);
          return true;
        }),
        catchError(() => {
          this._currentUser.set(null);
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      );
  }
}

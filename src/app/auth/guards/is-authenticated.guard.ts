import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.authStatus() === 'authenticated') {
    return true;
  }
  const router = inject(Router);
  const url = state.url;
  localStorage.setItem('redirectUrl', url);
  router.navigateByUrl('/auth/login');
  return false;
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.verifyToken().pipe(
    map(response => {
      localStorage.setItem('userData', JSON.stringify(response.user));
      localStorage.setItem('Token', response.token);
      authService.setUserData(response.user)
      return true;  // allow navigation
    }),
    catchError(error => {
      localStorage.removeItem('Token');
      localStorage.removeItem('userData');
      router.navigateByUrl('/login');
      return of(false);  // block navigation
    })
  );
};


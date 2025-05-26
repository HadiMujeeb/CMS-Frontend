import { CanActivateFn, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = (route, state):Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isUserExisted$().pipe(
    map((isUserExisted) => {
      if (isUserExisted) {
        router.navigateByUrl("/dashboard");
        return false;
      } else {
        return true;
      }
    })
  );
};

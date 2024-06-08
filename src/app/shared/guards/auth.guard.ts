import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { StateService } from '../../core/store/state.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(StateService);
  const router = inject(Router);

  return authService.checkUserState().pipe(
    map(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate(['/auth/login']);
        return false;
      }
      return true;
    })
  );
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ROUTES } from '../constants/routes-constants';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);
  const translation = inject(TranslateService);

  if (authService.isLoggedIn) {
    return true;
  } else {
    router.navigate([ROUTES.HOME]).then(() => {
      toastService.showInfo(
        `${translation.instant('hey')}!`,
        translation.instant('login_to_continue')
      );
    });

    return false;
  }
};

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthProvider } from '../enums/auth-provider.enum';
import { MsalService } from '@azure/msal-angular';
import { SessionStorageItem } from '../enums/session-storage-item.enum';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const msalAuthService = inject(MsalService);

  if (authService.isLoggedIn) {
    let token: string | null = null;

    if (authService.currentAuthProvider == AuthProvider.MICROSOFT) {
      const activeAccount = msalAuthService.instance.getActiveAccount();
      token = activeAccount?.idToken || null;
    }

    if (authService.currentAuthProvider == AuthProvider.GOOGLE) {
      token = sessionStorage.getItem(SessionStorageItem.AccessToken);
    }

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }

  return next(req);
};

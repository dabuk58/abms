import { Inject, Injectable } from '@angular/core';
import {
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { AuthenticationResult, PopupRequest } from '@azure/msal-browser';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthMethod } from '../enums/auth-method.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authMethod: AuthMethod | undefined;
  private microsoftObservableSub: Subscription | null = null;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalAuthService: MsalService
  ) {}

  loginMicrosoft() {
    if (this.msalGuardConfig.authRequest) {
      this.msalAuthService
        .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.msalAuthService.instance.setActiveAccount(response.account);
          console.log(response);
        });
    } else {
      this.msalAuthService
        .loginPopup()
        .subscribe((response: AuthenticationResult) => {
          this.msalAuthService.instance.setActiveAccount(response.account);
          console.log(response);
        });
    }
  }

  logoutMicrosoft(): void {
    this.microsoftObservableSub?.unsubscribe();
    this.msalAuthService.logoutPopup({
      mainWindowRedirectUri: environment.homePath,
    });
  }
}

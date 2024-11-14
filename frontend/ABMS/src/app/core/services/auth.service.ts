import { Inject, Injectable } from '@angular/core';
import {
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { AuthenticationResult, PopupRequest } from '@azure/msal-browser';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from '../../environments/environment';
import { AuthMethod } from '../enums/auth-method.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authMethod: AuthMethod | undefined;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalAuthService: MsalService
  ) {}

  get isLoggedIn(): boolean {
    const activeAccount = this.msalAuthService.instance.getActiveAccount();
    return !!activeAccount;
  }

  logout(): void {
    if (this.authMethod === AuthMethod.MICROSOFT) {
      this.logoutMicrosoft();
    } else {
      //todo google logout
    }
  }

  loginMicrosoft(dialogRef: DynamicDialogRef): void {
    if (this.msalGuardConfig.authRequest) {
      this.msalAuthService
        .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.msalAuthService.instance.setActiveAccount(response.account);
          this.authMethod = AuthMethod.MICROSOFT;
          dialogRef.close();
        });
    } else {
      this.msalAuthService
        .loginPopup()
        .subscribe((response: AuthenticationResult) => {
          this.msalAuthService.instance.setActiveAccount(response.account);
          this.authMethod = AuthMethod.MICROSOFT;
          dialogRef.close();
        });
    }
  }

  private logoutMicrosoft(): void {
    this.msalAuthService.logoutPopup({
      mainWindowRedirectUri: environment.homePath,
    });
  }
}

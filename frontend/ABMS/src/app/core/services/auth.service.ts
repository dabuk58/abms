import { Inject, Injectable } from '@angular/core';
import {
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { AuthenticationResult, PopupRequest } from '@azure/msal-browser';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthMethodEnum } from '../enums/auth-method.enum';
import { LoaderEnum } from '../enums/loader.enum';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authMethod: AuthMethodEnum | undefined;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalAuthService: MsalService,
    private loaderService: LoaderService
  ) {
    const savedAuthMethod = sessionStorage.getItem('authMethod');
    this.authMethod = savedAuthMethod
      ? (savedAuthMethod as AuthMethodEnum)
      : undefined;
  }

  get isLoggedIn(): boolean {
    const activeMsalAccount = this.msalAuthService.instance.getActiveAccount();
    const googleUser = sessionStorage.getItem('loggedinUser');

    return !!activeMsalAccount || !!googleUser;
  }

  logout(): void {
    if (this.authMethod === AuthMethodEnum.MICROSOFT) {
      this.logoutMicrosoft();
    } else {
      this.logoutGoogle();
      window.location.reload();
    }
  }

  loginMicrosoft(dialogRef: DynamicDialogRef): void {
    const authRequest = this.msalGuardConfig.authRequest
      ? { ...this.msalGuardConfig.authRequest }
      : {};
    this.msalAuthService
      .loginPopup(authRequest as PopupRequest)
      .pipe(finalize(() => this.loaderService.setInactive(LoaderEnum.LOGIN)))
      .subscribe((response: AuthenticationResult) => {
        this.msalAuthService.instance.setActiveAccount(response.account);
        this.setAuthMethod(AuthMethodEnum.MICROSOFT);
        dialogRef.close();
      });
  }

  private logoutMicrosoft(): void {
    this.msalAuthService.logoutPopup({
      mainWindowRedirectUri: environment.homePath,
    });
  }

  private logoutGoogle(): void {
    sessionStorage.removeItem('loggedinUser');
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
  }

  setAuthMethod(method: AuthMethodEnum): void {
    this.authMethod = method;
    sessionStorage.setItem('authMethod', method);
  }
}

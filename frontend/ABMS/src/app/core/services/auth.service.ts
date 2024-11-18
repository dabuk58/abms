import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { AuthenticationResult, PopupRequest } from '@azure/msal-browser';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { GRAPH_ENDPOINT } from '../config/msal.config';
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
    private loaderService: LoaderService,
    private http: HttpClient
  ) {
    if (this.isLoggedIn) {
      this.setAuthMethod();
    }
  }

  get isLoggedIn(): boolean {
    const activeMsalAccount = this.msalAuthService.instance.getActiveAccount();
    const googleUser = sessionStorage.getItem('loggedinUser');
    return !!activeMsalAccount || !!googleUser;
  }

  setAuthMethod(): void {
    if (this.msalAuthService.instance.getActiveAccount()) {
      this.authMethod = AuthMethodEnum.MICROSOFT;
    } else if (sessionStorage.getItem('loggedInUser')) {
      this.authMethod = AuthMethodEnum.GOOGLE;
    }
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
      .pipe(
        tap((response: AuthenticationResult) => {
          this.msalAuthService.instance.setActiveAccount(response.account);
          this.setAuthMethod();
        }),
        switchMap(() => this.http.get(GRAPH_ENDPOINT)),
        tap((x) => console.log(x)),
        finalize(() => this.loaderService.setInactive(LoaderEnum.LOGIN))
      )
      .subscribe(() => {
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
}

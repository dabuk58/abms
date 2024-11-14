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
  ) {}

  get isLoggedIn(): boolean {
    const activeAccount = this.msalAuthService.instance.getActiveAccount();
    return !!activeAccount;
  }

  logout(): void {
    this.logoutMicrosoft();
    if (this.authMethod === AuthMethodEnum.MICROSOFT) {
      // this.logoutMicrosoft();
    } else {
      //todo google logout
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
        this.authMethod = AuthMethodEnum.MICROSOFT;
        dialogRef.close();
      });
  }

  private logoutMicrosoft(): void {
    this.msalAuthService.logoutPopup({
      mainWindowRedirectUri: environment.homePath,
    });
  }
}

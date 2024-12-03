import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, PopupRequest } from '@azure/msal-browser';
import { TranslateService } from '@ngx-translate/core';
import { jwtDecode } from 'jwt-decode';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  catchError,
  finalize,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { CheckOrAddUserCommand, UserDto, UsersApiService } from '../../../api';
import { environment } from '../../environments/environment';
import { mapUser } from '../../shared/mappers/user-mapper';
import { fillString } from '../../shared/tools/functions';
import { ROUTES } from '../constants/routes-constants';
import { AuthProvider } from '../enums/auth-provider.enum';
import { LoaderEnum } from '../enums/loader.enum';
import { SessionStorageItem } from '../enums/session-storage-item.enum';
import { ToastType } from '../enums/toast-type.enum';
import { LoaderService } from './loader.service';
import { ToastService } from './toast.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authProvider: AuthProvider | undefined;

  constructor(
    private msalAuthService: MsalService,
    private loaderService: LoaderService,
    private usersApiService: UsersApiService,
    private userService: UserService,
    private translation: TranslateService,
    private toastService: ToastService,
    private router: Router
  ) {
    if (this.isLoggedIn) {
      this.setAuthMethod();
    }
  }

  get isLoggedIn(): boolean {
    const activeMsalAccount = this.msalAuthService.instance.getActiveAccount();
    const googleUser = sessionStorage.getItem(SessionStorageItem.LoggedUser);
    return !!activeMsalAccount || !!googleUser;
  }

  get currentAuthProvider(): AuthProvider | undefined {
    return this.authProvider;
  }

  setAuthMethod(): void {
    if (this.msalAuthService.instance.getActiveAccount()) {
      this.authProvider = AuthProvider.MICROSOFT;
    } else if (sessionStorage.getItem(SessionStorageItem.LoggedUser)) {
      this.authProvider = AuthProvider.GOOGLE;
    }
  }

  logout(): void {
    this.router.navigate([ROUTES.HOME]);
    if (this.authProvider === AuthProvider.MICROSOFT) {
      this.logoutMicrosoft();
    } else {
      this.logoutGoogle();
    }
  }

  loginMicrosoft(dialogRef: DynamicDialogRef): void {
    this.msalAuthService
      .loginPopup({} as PopupRequest)
      .pipe(
        catchError(() => throwError(() => new Error())),
        tap((response: AuthenticationResult) => {
          this.msalAuthService.instance.setActiveAccount(response.account);
          this.setAuthMethod();
        }),
        switchMap((response: AuthenticationResult) => {
          return this.checkMsalUserExistence$(response.accessToken);
        }),
        finalize(() => this.loaderService.setInactive(LoaderEnum.LOGIN))
      )
      .subscribe({
        next: (username) => {
          dialogRef.close();
          this.showWelcomeToast(username);
        },
        error: () => {
          this.msalAuthService.instance.setActiveAccount(null);
          this.msalAuthService.instance.clearCache();
          dialogRef.close();
        },
      });
  }

  checkMsalUserExistence$(token: any): Observable<string> {
    const decodedToken = jwtDecode<any>(token);
    const userEmail = decodedToken?.email || '';
    const msalUserId = decodedToken?.oid || '';
    const userName = decodedToken?.given_name || '';

    if (!userEmail || !msalUserId) {
      return throwError(() => new Error());
    }

    const params: CheckOrAddUserCommand = {
      authProviderUserId: msalUserId,
      authProvider: 2,
      email: userEmail,
    };

    return this.usersApiService.checkOrAddUser(params).pipe(
      tap((response) => this.setActiveUser(response.user)),
      switchMap(() => of(userName))
    );
  }

  checkGoogleUserExistence$(token: any): Observable<string> {
    const decodedToken = jwtDecode<any>(token);
    const userEmail = decodedToken?.email || '';
    const googleUserId = decodedToken?.sub || '';
    const userName = decodedToken?.given_name || '';

    if (!userEmail || !googleUserId) {
      return throwError(() => new Error('No user id or email defined!'));
    }

    const params: CheckOrAddUserCommand = {
      authProviderUserId: googleUserId,
      authProvider: 2,
      email: userEmail,
    };

    return this.usersApiService.checkOrAddUser(params).pipe(
      tap((response) => this.setActiveUser(response.user)),
      switchMap(() => of(userName))
    );
  }

  setActiveUser(user?: UserDto): void {
    this.userService.activeUser = user ? mapUser(user) : undefined;
  }

  private logoutMicrosoft(): void {
    const logoutRequest = {
      account: this.msalAuthService.instance.getActiveAccount(),
      mainWindowRedirectUri: environment.homePath,
    };
    this.msalAuthService.logoutPopup(logoutRequest);
    this.msalAuthService.instance.setActiveAccount(null);
    this.setLogoutToastInStorage();
    window.location.reload();
  }

  private logoutGoogle(): void {
    this.setLogoutToastInStorage();
    sessionStorage.removeItem(SessionStorageItem.AccessToken);
    sessionStorage.removeItem(SessionStorageItem.LoggedUser);
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
    window.location.reload();
  }

  showWelcomeToast(username: string): void {
    this.toastService.showSuccess(
      this.translation.instant('logged_in_successfully'),
      fillString(
        this.translation.instant('hi_user_nice_to_see_you'),
        username ? ' ' + username : username
      )
    );
  }

  private setLogoutToastInStorage(): void {
    sessionStorage.setItem(
      SessionStorageItem.ToastMessage,
      JSON.stringify({
        title: this.translation.instant('logout_successfully'),
        message: this.translation.instant(
          'account_has_been_logout_successfully'
        ),
        type: ToastType.Success,
      })
    );
  }
}

import { Inject, Injectable } from '@angular/core';
import {
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { AuthenticationResult, PopupRequest } from '@azure/msal-browser';
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
import { AuthProviderEnum } from '../enums/auth-provider.enum';
import { LoaderEnum } from '../enums/loader.enum';
import { LoaderService } from './loader.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authProvider: AuthProviderEnum | undefined;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalAuthService: MsalService,
    private loaderService: LoaderService,
    private usersApiService: UsersApiService,
    private userService: UserService
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
      this.authProvider = AuthProviderEnum.MICROSOFT;
    } else if (sessionStorage.getItem('loggedInUser')) {
      this.authProvider = AuthProviderEnum.GOOGLE;
    }
  }

  logout(): void {
    if (this.authProvider === AuthProviderEnum.MICROSOFT) {
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
        next: (userName) => {
          dialogRef.close(userName);
        },
        error: () => {
          this.logout();
          dialogRef.close(null);
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

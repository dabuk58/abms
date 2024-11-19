import { AfterViewInit, Component, Input } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, Observable, Subject, takeUntil, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoaderEnum } from '../../../enums/loader.enum';
import { AuthService } from '../../../services/auth.service';
import { LoaderService } from '../../../services/loader.service';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-google-login-button',
  standalone: true,
  imports: [],
  templateUrl: './google-login-button.component.html',
  styleUrl: './google-login-button.component.scss',
})
export class GoogleLoginButtonComponent implements AfterViewInit {
  @Input() dialogRef!: DynamicDialogRef;
  redirectUrl!: string;
  scriptId = 'google-signin-script';

  private readonly _destroying$ = new Subject<void>();

  constructor(
    private loaderService: LoaderService,
    private authService: AuthService
  ) {}

  ngAfterViewInit(): void {
    this.initializeSignIn();
  }

  initializeSignIn(): void {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: environment.googleConfig.clientId,
        callback: this.handleOauthResponse.bind(this),
        context: 'signin',
        ux_mode: 'popup',
        auto_prompt: false,
      });

      window.google.accounts.id.renderButton(
        document.querySelector('.g_id_signin'),
        {
          type: 'standard',
          shape: 'rectangular',
          theme: 'filled_black',
          text: 'signin_with',
          size: 'large',
          logo_alignment: 'left',
        }
      );
    }
  }

  handleOauthResponse(response: any): void {
    this.loaderService.setActive(LoaderEnum.LOGIN);
    const responsePayload = jwtDecode<any>(response.credential);

    this.checkUserExistence$(response.credential)
      .pipe(
        catchError((e) => {
          console.error(e);
          return throwError(() => new Error());
        }),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        sessionStorage.setItem('loggedinUser', JSON.stringify(responsePayload));
        this.dialogRef.close(responsePayload?.given_name);
        this.authService.setAuthMethod();
        this.loaderService.setInactive(LoaderEnum.LOGIN);
      });
  }

  checkUserExistence$(token: any): Observable<string> {
    return this.authService.checkGoogleUserExistence$(token);
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}

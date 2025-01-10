import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { filter } from 'rxjs';
import translationsEN from './../assets/i18n/en.json';
import translationsPL from './../assets/i18n/pl.json';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { AuthProvider } from './core/enums/auth-provider.enum';
import { SessionStorageItem } from './core/enums/session-storage-item.enum';
import { ToastType } from './core/enums/toast-type.enum';
import { AuthService } from './core/services/auth.service';
import { ToastService } from './core/services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ToastModule,
    ConfirmDialogModule,
    FooterComponent,
  ],
  providers: [ConfirmationService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private config: PrimeNGConfig,
    private translate: TranslateService,
    private msalAuthService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.setTranslations();
  }

  ngOnInit(): void {
    this.initializeMicrosoftLogin();
  }

  ngAfterViewInit(): void {
    this.checkToastsInStorage();
  }

  setTranslations(): void {
    this.translate.addLangs(['pl', 'en']);
    this.translate.setTranslation('pl', translationsPL);
    this.translate.setTranslation('en', translationsEN);
    this.translate.setDefaultLang('pl');
    this.translate.use('pl');
    this.translate
      .get('primeng')
      .subscribe((res) => this.config.setTranslation(res));
  }

  initializeMicrosoftLogin(): void {
    this.msalAuthService.handleRedirectObservable().subscribe();

    this.manageAuthEvents();
  }

  manageAuthEvents(): void {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe((x) => {
        this.setActiveAccount();
      });
  }

  setActiveAccount(): void {
    const activeAccount = this.msalAuthService.instance.getActiveAccount();
    const accounts = this.msalAuthService.instance.getAllAccounts();

    if (
      !activeAccount &&
      accounts.length > 0 &&
      this.authService.currentAuthProvider === AuthProvider.MICROSOFT
    ) {
      this.msalAuthService.instance.setActiveAccount(accounts[0]);
    }
  }

  checkToastsInStorage(): void {
    const toastData = sessionStorage.getItem(SessionStorageItem.ToastMessage);

    if (toastData) {
      const { title, message, type } = JSON.parse(toastData);

      switch (type) {
        case ToastType.Success:
          this.toastService.showSuccess(title, message);
          break;
        case ToastType.Error:
          this.toastService.showError(title, message);
          break;
        case ToastType.Info:
          this.toastService.showInfo(title, message);
          break;
        case ToastType.Warn:
          this.toastService.showWarn(title, message);
          break;
      }
    }

    sessionStorage.removeItem(SessionStorageItem.ToastMessage);
  }
}

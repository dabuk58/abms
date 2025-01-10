import { NgClass } from '@angular/common';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { GB, PL } from 'country-flag-icons/string/3x2';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { Subject } from 'rxjs';
import { ROUTES } from '../../constants/routes-constants';
import { AuthService } from '../../services/auth.service';
import { ConstantsService } from '../../services/constants.service';
import { ToastService } from '../../services/toast.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule,
    TranslatePipe,
    RouterLink,
    DynamicDialogModule,
    SplitButtonModule,
    NgClass,
    ToastModule,
  ],
  providers: [DialogService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {
  ROUTES = ROUTES;
  splitButtonConfig: MenuItem[];
  loginDialogRef?: DynamicDialogRef;
  headerCollapsed = false;
  flagPL: SafeHtml;
  flagGB: SafeHtml;
  private previousScrollTop = 0;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    public dialogService: DialogService,
    private translateService: TranslateService,
    private authService: AuthService,
    private constantsService: ConstantsService,
    private router: Router,
    private toast: ToastService,
    private translate: TranslateService,
    private sanitizer: DomSanitizer
  ) {
    this.splitButtonConfig = this.constantsService.headerButtonConfig;
    this.flagGB = this.sanitizer.bypassSecurityTrustHtml(GB);
    this.flagPL = this.sanitizer.bypassSecurityTrustHtml(PL);
  }

  onLogin(): void {
    this.loginDialogRef = this.dialogService.open(LoginModalComponent, {
      header: this.translateService.instant('choose_option'),
      width: '400px',
      focusOnShow: false,
    });
  }

  showLoginError(): void {
    this.toast.showError(
      this.translateService.instant('error_during_login'),
      this.translateService.instant('try_again_later')
    );
  }

  onLogout(): void {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  onProfile(): void {
    this.router.navigate([ROUTES.USER, ROUTES.PROFILE]);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const currentScrollTop =
      window.scrollY || document.documentElement.scrollTop;

    if (currentScrollTop > this.previousScrollTop) {
      this.headerCollapsed = true;
    }
    if (currentScrollTop == 0) {
      this.headerCollapsed = false;
    }

    this.previousScrollTop = currentScrollTop;
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}

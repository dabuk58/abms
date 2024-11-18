import { NgClass } from '@angular/common';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { Subject, takeUntil } from 'rxjs';
import { fillString } from '../../../shared/tools/functions';
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
  private previousScrollTop = 0;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    public dialogService: DialogService,
    private translateService: TranslateService,
    private authService: AuthService,
    private constantsService: ConstantsService,
    private router: Router,
    private toast: ToastService
  ) {
    this.splitButtonConfig = this.constantsService.headerButtonConfig;
  }

  onLogin(): void {
    this.loginDialogRef = this.dialogService.open(LoginModalComponent, {
      header: this.translateService.instant('choose_option'),
      width: '400px',
      focusOnShow: false,
      data: {
        dialogRef: this.loginDialogRef,
      },
    });

    this.loginDialogRef.onClose
      .pipe(takeUntil(this._destroying$))
      .subscribe((userName) => {
        if (userName !== null) {
          this.showLoginWelcomeMessage(userName);
        } else {
          this.showLoginError();
        }
      });
  }

  showLoginWelcomeMessage(userName: string): void {
    this.toast.showSuccess(
      this.translateService.instant('logged_in_successfully'),
      fillString(
        this.translateService.instant('hi_user_nice_to_see_you'),
        userName ? ' ' + userName : userName
      )
    );
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
    this.router.navigate([ROUTES.PROFILE]);
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

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}

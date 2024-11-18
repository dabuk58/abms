import { NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
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
import { ROUTES } from '../../constants/routes-constants';
import { AuthService } from '../../services/auth.service';
import { ConstantsService } from '../../services/constants.service';
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
  ],
  providers: [DialogService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  ROUTES = ROUTES;
  splitButtonConfig: MenuItem[];
  loginDialogRef?: DynamicDialogRef;
  headerCollapsed = false;
  private previousScrollTop = 0;

  constructor(
    public dialogService: DialogService,
    private translateService: TranslateService,
    private authService: AuthService,
    private constantsService: ConstantsService,
    private router: Router
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
}

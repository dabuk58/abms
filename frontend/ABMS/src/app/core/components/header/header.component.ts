import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ROUTES } from '../../constants/routes-constants';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, TranslatePipe, RouterLink, DynamicDialogModule],
  providers: [DialogService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  ROUTES = ROUTES;

  loginDialogRef?: DynamicDialogRef;

  constructor(
    public dialogService: DialogService,
    private translateService: TranslateService
  ) {}

  onLogin(): void {
    this.loginDialogRef = this.dialogService.open(LoginModalComponent, {
      header: this.translateService.instant('choose_option'),
      width: '400px',
      focusOnShow: false,
    });
  }
}

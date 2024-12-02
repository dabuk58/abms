import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { ROUTES } from '../../../../core/constants/routes-constants';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-nav-menu',
  standalone: true,
  imports: [
    PanelModule,
    ButtonModule,
    TranslatePipe,
    DividerModule,
    RouterLink,
  ],
  templateUrl: './dashboard-nav-menu.component.html',
  styleUrl: './dashboard-nav-menu.component.scss',
})
export class DashboardNavMenuComponent {
  ROUTES = ROUTES;

  constructor(private authService: AuthService) {}

  onSignOut(): void {
    this.authService.logout();
  }
}

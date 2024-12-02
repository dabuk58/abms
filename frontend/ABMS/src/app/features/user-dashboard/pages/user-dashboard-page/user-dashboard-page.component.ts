import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DashboardNavMenuComponent } from '../../components/dashboard-nav-menu/dashboard-nav-menu.component';

@Component({
  selector: 'app-user-dashboard-page',
  standalone: true,
  imports: [RouterOutlet, CardModule, DashboardNavMenuComponent],
  templateUrl: './user-dashboard-page.component.html',
  styleUrl: './user-dashboard-page.component.scss',
})
export class UserDashboardPageComponent {}

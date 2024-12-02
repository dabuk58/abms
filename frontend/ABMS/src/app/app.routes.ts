import { Routes } from '@angular/router';
import { ROUTES } from './core/constants/routes-constants';

export const routes: Routes = [
  {
    path: '',
    redirectTo: `/${ROUTES.HOME}`,
    pathMatch: 'full',
  },
  {
    path: ROUTES.HOME,
    loadComponent: () =>
      import('./features/home/pages/home-page/home-page.component').then(
        (c) => c.HomePageComponent
      ),
  },
  {
    path: ROUTES.USER,
    loadChildren: () =>
      import('./features/user-dashboard/user-dashboard.routes').then(
        (c) => c.routes
      ),
  },
  {
    path: ROUTES.ACCOMMODATIONS,
    loadChildren: () =>
      import('./features/accommodations/accommodations.routes').then(
        (c) => c.routes
      ),
  },
  {
    path: '**',
    redirectTo: ROUTES.HOME,
  },
];

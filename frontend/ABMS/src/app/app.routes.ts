import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
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
    path: ROUTES.PROFILE,
    loadComponent: () =>
      import(
        './features/profile/pages/profile-page/profile-page.component'
      ).then((c) => c.ProfilePageComponent),
    canActivate: [MsalGuard],
  },
  {
    path: '**',
    redirectTo: ROUTES.HOME,
  },
];

import { Routes } from '@angular/router';
import { ROUTES } from '../../core/constants/routes-constants';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/user-dashboard-page/user-dashboard-page.component').then(
        (c) => c.UserDashboardPageComponent
      ),
    children: [
      {
        path: ROUTES.PROFILE,
        loadComponent: () =>
          import('./components/profile/profile.component').then(
            (c) => c.ProfileComponent
          ),
      },
      {
        path: ROUTES.BOOKINGS,
        loadComponent: () =>
          import('./components/bookings/bookings.component').then(
            (c) => c.BookingsComponent
          ),
      },
      {
        path: ROUTES.OFFERS,
        loadComponent: () =>
          import('./components/offers/offers.component').then(
            (c) => c.OffersComponent
          ),
      },
      {
        path: ROUTES.FAVORITES,
        loadComponent: () =>
          import('./components/favorites/favorites.component').then(
            (c) => c.FavoritesComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: ROUTES.HOME,
  },
];

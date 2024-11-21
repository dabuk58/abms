import { Routes } from '@angular/router';
import { ROUTES } from '../../core/constants/routes-constants';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './pages/accommodations-search-page/accommodations-search-page.component'
      ).then((c) => c.AccommodationsSearchPageComponent),
  },
  {
    path: '**',
    redirectTo: ROUTES.HOME,
  },
];

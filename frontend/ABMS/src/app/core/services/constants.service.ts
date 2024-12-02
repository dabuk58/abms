import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { ROUTES } from '../constants/routes-constants';
import { AccommodationSort } from '../enums/accommodation-sort.enum';
import { Amenity } from '../enums/amenity.enum';
import { SelectOption } from '../interfaces/select-option';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  constructor(
    private translation: TranslateService,
    private router: Router,
    private authService: AuthService
  ) {}

  get headerButtonConfig(): MenuItem[] {
    return [
      {
        label: this.translation.instant('profile'),
        icon: 'pi pi-fw pi-user',
        command: () => this.router.navigate([ROUTES.USER, ROUTES.PROFILE]),
      },
      {
        label: this.translation.instant('bookings'),
        icon: 'pi pi-fw pi-calendar',
        command: () => this.router.navigate([ROUTES.USER, ROUTES.BOOKINGS]),
      },
      {
        separator: true,
      },
      {
        label: this.translation.instant('logout'),
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.authService.logout(),
      },
    ];
  }

  getAmenitiesOptions(): string[] {
    return [
      'free_wifi',
      'parking',
      'tv',
      'pool',
      'gym',
      'free_breakfast',
      'free_meals',
      'kitchen',
      'balcony',
      'private_bathroom',
    ];
  }

  getAccommodationsSortOptions(): SelectOption[] {
    return [
      {
        label: this.translation.instant('price_asc'),
        value: AccommodationSort.PRICE_ASC,
      },
      {
        label: this.translation.instant('price_desc'),
        value: AccommodationSort.PRICE_DESC,
      },
      {
        label: this.translation.instant('rating_asc'),
        value: AccommodationSort.RATING_ASC,
      },
      {
        label: this.translation.instant('rating_desc'),
        value: AccommodationSort.RATING_DESC,
      },
    ];
  }

  getPlacesForPlaceholder(): string[] {
    const places = [
      this.translation.instant('places.krynica_zdroj'),
      this.translation.instant('places.cracow'),
      this.translation.instant('places.pomerania'),
      this.translation.instant('places.silesia'),
      this.translation.instant('places.wroclaw'),
      this.translation.instant('places.sopot'),
      this.translation.instant('places.zakopane'),
      this.translation.instant('places.masovia'),
      this.translation.instant('places.poznan'),
      this.translation.instant('places.gdansk'),
      this.translation.instant('places.szczawnica'),
      this.translation.instant('places.solina'),
      this.translation.instant('places.warsaw'),
      this.translation.instant('places.szczecin'),
      this.translation.instant('places.szklarska_poreba'),
      this.translation.instant('places.chelm'),
      this.translation.instant('places.zamosc'),
      this.translation.instant('places.torun'),
      this.translation.instant('places.zielona_gora'),
      this.translation.instant('places.polanica_zdroj'),
      this.translation.instant('places.ustron'),
      this.translation.instant('places.bukowina_tatrzanska'),
      this.translation.instant('places.przemysl'),
    ];

    return places.sort(() => Math.random() - 0.5);
  }

  getAmenityIconMap(): Record<Amenity, string> {
    const amenityIconMap: Record<Amenity, string> = {
      [Amenity.FreeWifi]: 'bi-wifi',
      [Amenity.Parking]: 'bi-p-circle',
      [Amenity.Pool]: 'bi-water',
      [Amenity.Gym]: 'bi-duffle',
      [Amenity.TV]: 'bi-tv',
      [Amenity.FreeBreakfast]: 'bi-alarm',
      [Amenity.FreeMeals]: 'bi-egg-fried',
      [Amenity.Kitchen]: 'bi-cup-hot',
      [Amenity.Balcony]: 'bi-wind',
      [Amenity.PrivateBathroom]: 'bi-badge-wc',
    };

    return amenityIconMap;
  }
}

import { createCustomElement } from '@angular/elements';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { MapSearchResultsPopupComponent } from './app/features/accommodations/components/map-search-results-popup/map-search-results-popup.component';

bootstrapApplication(AppComponent, appConfig)
  .then((appRef) => {
    const injector = appRef.injector;
    const popupElement = createCustomElement(MapSearchResultsPopupComponent, { injector });
    customElements.define('app-map-popup', popupElement);
  })
  .catch((err) => console.error(err));

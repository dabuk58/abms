import { createCustomElement } from '@angular/elements';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { MapPopupComponent } from './app/features/accommodations/components/map-popup/map-popup.component';

bootstrapApplication(AppComponent, appConfig)
  .then((appRef) => {
    const injector = appRef.injector;
    const popupElement = createCustomElement(MapPopupComponent, { injector });
    customElements.define('app-map-popup', popupElement);
  })
  .catch((err) => console.error(err));

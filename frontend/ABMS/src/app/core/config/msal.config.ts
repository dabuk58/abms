import { Provider } from '@angular/core';
import {
  MSAL_INSTANCE,
  MsalBroadcastService,
  MsalService,
} from '@azure/msal-angular';
import {
  BrowserCacheLocation,
  IPublicClientApplication,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';
import { environment } from './../../environments/environment';

// export const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

export function loggerCallback(logLevel: LogLevel, message: string) {
  // console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msalConfig.auth.clientId,
      authority: environment.msalConfig.auth.authority,
      redirectUri: environment.homePath,
      postLogoutRedirectUri: environment.homePath,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {
      allowNativeBroker: false, // Disables WAM Broker
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

// export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
//   const protectedResourceMap = new Map<string, Array<string>>();
//   // protectedResourceMap.set(
//   //   environment.apiConfig.uri,
//   //   environment.apiConfig.scopes
//   // );

//   return {
//     interactionType: InteractionType.Popup,
//     protectedResourceMap,
//   };
// }

// export function MSALGuardConfigFactory(): MsalGuardConfiguration {
//   return {
//     interactionType: InteractionType.Popup,
//     authRequest: {
//       scopes: [...environment.apiConfig.scopes],
//     },
//     loginFailedRoute: '/home',
//   };
// }

export const msalProviders: Provider[] = [
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: MsalInterceptor,
  //   multi: true,
  // },
  {
    provide: MSAL_INSTANCE,
    useFactory: MSALInstanceFactory,
  },
  // {
  //   provide: MSAL_GUARD_CONFIG,
  //   useFactory: MSALGuardConfigFactory,
  // },
  // {
  //   provide: MSAL_INTERCEPTOR_CONFIG,
  //   useFactory: MSALInterceptorConfigFactory,
  // },
  MsalService,
  // MsalGuard,
  MsalBroadcastService,
];

import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  return next(
    req.url.startsWith('http')
      ? req
      : req.clone({ url: `${environment.apiConfig.uri}${req.url}` })
  );
};

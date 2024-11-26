/**
 * Generated by orval 7.3.0
 */
import {
  HttpClient
} from '@angular/common/http'
import type {
  HttpContext,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpResponse as AngularHttpResponse
} from '@angular/common/http'
import {
  Injectable
} from '@angular/core'
import {
  Observable
} from 'rxjs'
import type {
  AccommodationsParams,
  GetAccommodationResponse,
  GetAccommodationsResponse,
  SuggestionDto,
  SuggestionsParams
} from '../../model'


type HttpClientOptions = {
  headers?: HttpHeaders | {
      [header: string]: string | string[];
  };
  context?: HttpContext;
  observe?: any;
  params?: HttpParams | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  reportProgress?: boolean;
  responseType?: any;
  withCredentials?: boolean;
};



@Injectable({ providedIn: 'root' })
export class AccommodationsApiService {
  constructor(
    private http: HttpClient,
  ) {} accommodations<TData = GetAccommodationsResponse>(
    params?: AccommodationsParams, options?: Omit<HttpClientOptions, 'observe'> & { observe?: 'body' }
  ): Observable<TData>;
    accommodations<TData = GetAccommodationsResponse>(
    params?: AccommodationsParams, options?: Omit<HttpClientOptions, 'observe'> & { observe?: 'response' }
  ): Observable<AngularHttpResponse<TData>>;
    accommodations<TData = GetAccommodationsResponse>(
    params?: AccommodationsParams, options?: Omit<HttpClientOptions, 'observe'> & { observe?: 'events' }
  ): Observable<HttpEvent<TData>>;accommodations<TData = GetAccommodationsResponse>(
    params?: AccommodationsParams, options?: HttpClientOptions
  ): Observable<TData>  {
    return this.http.get<TData>(
      `/accommodations`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }
 suggestions<TData = SuggestionDto[]>(
    params: SuggestionsParams, options?: Omit<HttpClientOptions, 'observe'> & { observe?: 'body' }
  ): Observable<TData>;
    suggestions<TData = SuggestionDto[]>(
    params: SuggestionsParams, options?: Omit<HttpClientOptions, 'observe'> & { observe?: 'response' }
  ): Observable<AngularHttpResponse<TData>>;
    suggestions<TData = SuggestionDto[]>(
    params: SuggestionsParams, options?: Omit<HttpClientOptions, 'observe'> & { observe?: 'events' }
  ): Observable<HttpEvent<TData>>;suggestions<TData = SuggestionDto[]>(
    params: SuggestionsParams, options?: HttpClientOptions
  ): Observable<TData>  {
    return this.http.get<TData>(
      `/accommodations/suggestions`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }
 accommodation<TData = GetAccommodationResponse>(
    id: number, options?: Omit<HttpClientOptions, 'observe'> & { observe?: 'body' }
  ): Observable<TData>;
    accommodation<TData = GetAccommodationResponse>(
    id: number, options?: Omit<HttpClientOptions, 'observe'> & { observe?: 'response' }
  ): Observable<AngularHttpResponse<TData>>;
    accommodation<TData = GetAccommodationResponse>(
    id: number, options?: Omit<HttpClientOptions, 'observe'> & { observe?: 'events' }
  ): Observable<HttpEvent<TData>>;accommodation<TData = GetAccommodationResponse>(
    id: number, options?: HttpClientOptions
  ): Observable<TData>  {
    return this.http.get<TData>(
      `/accommodations/${id}`,options
    );
  }
};

export type AccommodationsClientResult = NonNullable<GetAccommodationsResponse>
export type SuggestionsClientResult = NonNullable<SuggestionDto[]>
export type AccommodationClientResult = NonNullable<GetAccommodationResponse>

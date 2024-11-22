import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AccommodationsResponse } from '../../../../core/interfaces/accommodations-response';
import { AdvancedFilters } from '../../../../core/interfaces/advanced-filters';
import { BasicFilters } from '../../../../core/interfaces/basic-filters';
import { AccommodationsAdvancedFiltersComponent } from '../../components/accommodations-advanced-filters/accommodations-advanced-filters.component';
import { AccommodationsBasicFiltersComponent } from '../../components/accommodations-basic-filters/accommodations-basic-filters.component';
import { AccommodationsSearchPageLoaderComponent } from '../../components/accommodations-search-page-loader/accommodations-search-page-loader.component';
import { AccommodationsSearchResultsComponent } from '../../components/accommodations-search-results/accommodations-search-results.component';
import { mapFiltersToAccommodationsParams } from '../../mappers/accommodations-mapper';
import { AccommodationsService } from '../../services/accommodations.service';

@Component({
  selector: 'app-accommodations-search-page',
  standalone: true,
  imports: [
    AccommodationsBasicFiltersComponent,
    AccommodationsAdvancedFiltersComponent,
    AccommodationsSearchResultsComponent,
    TranslatePipe,
    PaginatorModule,
    AccommodationsSearchPageLoaderComponent,
    AsyncPipe,
  ],
  templateUrl: './accommodations-search-page.component.html',
  styleUrl: './accommodations-search-page.component.scss',
})
export class AccommodationsSearchPageComponent implements OnInit, OnDestroy {
  basicFiltersToPatch: BasicFilters | null = null;
  private basicFilters: BasicFilters = {} as BasicFilters;
  private advancedFilters: AdvancedFilters = {} as AdvancedFilters;
  offset: number = 0;
  recordNo: number = 10;

  accommodationsResponse$!: Observable<AccommodationsResponse>;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private accommodationsService: AccommodationsService
  ) {}

  ngOnInit(): void {
    this.extractQueryParamsData();
    this.search();
  }

  extractQueryParamsData(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this._destroying$))
      .subscribe((paramMap: ParamMap) => {
        this.setFilters(paramMap);
      });
  }

  setFilters(paramMap: ParamMap): void {
    if (paramMap.keys.length) {
      const guests = paramMap.get('guests');
      this.basicFiltersToPatch = {
        query: paramMap.get('query'),
        dateFrom: paramMap.get('dateFrom'),
        dateTo: paramMap.get('dateTo'),
        guests: guests !== null ? +guests : null,
      };
    }
  }

  onBasicSearch(event: BasicFilters): void {
    this.basicFilters = event;
    this.search();
  }

  onAdvancedSearch(event: AdvancedFilters): void {
    this.advancedFilters = event;
    this.search();
  }

  search(): void {
    let params = mapFiltersToAccommodationsParams(
      this.basicFilters,
      this.advancedFilters
    );

    params = {
      ...params,
      Offset: this.offset,
      RecordNo: this.recordNo,
    };

    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.accommodationsResponse$ =
      this.accommodationsService.getAccommodations$(params);
  }

  onPageChange(event: PaginatorState): void {
    this.offset = event.first ?? this.offset;
    this.recordNo = event.rows ?? this.recordNo;
    this.search();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}

import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Observable, Subject } from 'rxjs';
import { AccommodationsResponse } from '../../../../core/interfaces/accommodations-response';
import { AdvancedFilters } from '../../../../core/interfaces/advanced-filters';
import { BasicFilters } from '../../../../core/interfaces/basic-filters';
import { AccommodationsAdvancedFiltersComponent } from '../../components/accommodations-advanced-filters/accommodations-advanced-filters.component';
import { AccommodationsBasicFiltersComponent } from '../../components/accommodations-basic-filters/accommodations-basic-filters.component';
import { AccommodationsSearchPageLoaderComponent } from '../../components/accommodations-search-page-loader/accommodations-search-page-loader.component';
import { AccommodationsSearchResultsComponent } from '../../components/accommodations-search-results/accommodations-search-results.component';
import { mapFiltersToAccommodationsParams } from '../../mappers/accommodations-params-mapper';
import { AccommodationsService } from '../../services/accommodations.service';

export type CombinedFilters = BasicFilters & AdvancedFilters;

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
export class AccommodationsSearchPageComponent
  implements AfterViewInit, OnDestroy
{
  @ViewChild(AccommodationsBasicFiltersComponent)
  basicFiltersComponent!: AccommodationsBasicFiltersComponent;
  @ViewChild(AccommodationsAdvancedFiltersComponent)
  advancedFiltersComponent!: AccommodationsAdvancedFiltersComponent;

  offset: number = 0;
  recordNo: number = 10;

  accommodationsResponse$!: Observable<AccommodationsResponse>;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    private accommodationsService: AccommodationsService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.search();
  }

  search(): void {
    const basicFilters = this.basicFiltersComponent.getFilters();
    const advancedFilters = this.advancedFiltersComponent.getFilters();

    const filters: CombinedFilters = { ...basicFilters, ...advancedFilters };

    console.log(filters);

    const params = mapFiltersToAccommodationsParams(filters);

    this.router.navigate([], {
      queryParams: filters,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });

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

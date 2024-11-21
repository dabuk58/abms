import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AdvancedFilters } from '../../../../core/interfaces/advanced-filters';
import { BasicFilters } from '../../../../core/interfaces/basic-filters';
import { AccommodationsAdvancedFiltersComponent } from '../../components/accommodations-advanced-filters/accommodations-advanced-filters.component';
import { AccommodationsBasicFiltersComponent } from '../../components/accommodations-basic-filters/accommodations-basic-filters.component';
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
  ],
  templateUrl: './accommodations-search-page.component.html',
  styleUrl: './accommodations-search-page.component.scss',
})
export class AccommodationsSearchPageComponent implements OnInit, OnDestroy {
  basicFiltersToPatch: BasicFilters | null = null;
  private basicFilters: BasicFilters = {} as BasicFilters;
  private advancedFilters: AdvancedFilters = {} as AdvancedFilters;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private accommodationsService: AccommodationsService
  ) {}

  ngOnInit(): void {
    this.extractQueryParamsData();
    console.log(this.basicFilters);
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
    const params = mapFiltersToAccommodationsParams(
      this.basicFilters,
      this.advancedFilters
    );

    this.accommodationsService.getAccommodations$(params).subscribe();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
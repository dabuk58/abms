import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BasicFilters } from '../../../../core/interfaces/basic-filters';
import { AccommodationsAdvancedFiltersComponent } from '../../components/accommodations-advanced-filters/accommodations-advanced-filters.component';
import { AccommodationsBasicFiltersComponent } from '../../components/accommodations-basic-filters/accommodations-basic-filters.component';
import { AccommodationsSearchResultsComponent } from '../../components/accommodations-search-results/accommodations-search-results.component';

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
  basicFilters: BasicFilters | null = null;

  private readonly _destroying$ = new Subject<void>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.extractQueryParamsData();
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
      this.basicFilters = {
        query: paramMap.get('query'),
        dateFrom: paramMap.get('dateFrom'),
        dateTo: paramMap.get('dateTo'),
        guests: guests !== null ? +guests : null,
      };
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}

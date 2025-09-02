import { AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { AccommodationsParams } from '../../../../../api';
import { AccommodationsResponse } from '../../../../core/interfaces/accommodations-response';
import { AdvancedFilters } from '../../../../core/interfaces/advanced-filters';
import { BasicFilters } from '../../../../core/interfaces/basic-filters';
import { SelectOption } from '../../../../core/interfaces/select-option';
import { ConstantsService } from '../../../../core/services/constants.service';
import { AccommodationsAdvancedFiltersComponent } from '../../components/accommodations-advanced-filters/accommodations-advanced-filters.component';
import { AccommodationsBasicFiltersComponent } from '../../components/accommodations-basic-filters/accommodations-basic-filters.component';
import { AccommodationsSearchPageSkeletonLoaderComponent } from '../../components/accommodations-search-page-skeleton-loader/accommodations-search-page-skeleton-loader.component';
import { AccommodationsSearchResultsComponent } from '../../components/accommodations-search-results/accommodations-search-results.component';
import { MapSearchResultsComponent } from '../../components/map-search-results/map-search-results.component';
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
    ButtonModule,
    AccommodationsSearchPageSkeletonLoaderComponent,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  providers: [DialogService],
  templateUrl: './accommodations-search-page.component.html',
  styleUrl: './accommodations-search-page.component.scss',
})
export class AccommodationsSearchPageComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(AccommodationsBasicFiltersComponent)
  basicFiltersComponent!: AccommodationsBasicFiltersComponent;
  @ViewChild(AccommodationsAdvancedFiltersComponent)
  advancedFiltersComponent!: AccommodationsAdvancedFiltersComponent;
  rowsPerPageOptions!: undefined | any[];
  isMobileView!: boolean;

  lastUsedParams: AccommodationsParams = {};

  offset: number = 0;
  recordNo: number = 10;

  form!: FormGroup;

  accommodationsResponse$!: Observable<AccommodationsResponse>;
  sortOptions: SelectOption[] = [];
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private accommodationsService: AccommodationsService,
    private router: Router,
    private fb: FormBuilder,
    protected translation: TranslateService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private constantsService: ConstantsService
  ) {
    this.sortOptions = this.constantsService.getAccommodationsSortOptions();
    this.form = this.fb.group({
      sortBy: [null],
    });
    this.handleWindowResize();
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this._destroying$))
      .subscribe((params) => {
        this.form.patchValue({
          sortBy: params['sortBy']
            ? this.sortOptions.find(
                (option) => option.value == params['sortBy']
              ) || null
            : null,
        });
      });
  }

  ngAfterViewInit(): void {
    this.search();
  }

  search(paginationSearch: boolean = false): void {
    let params: AccommodationsParams;

    if (!paginationSearch) {
      this.offset = 0;
      const filters = this.getFilters();
      params = this.getParams(filters);

      this.lastUsedParams = params;

      this.router.navigate([], {
        queryParams: {
          ...filters,
          sortBy: this.form.get('sortBy')?.value
            ? this.form.get('sortBy')?.value.value
            : null,
        },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    } else {
      params = {
        ...this.lastUsedParams,
        Offset: this.offset,
        RecordNo: this.recordNo,
      };
    }

    window.scrollTo({
      top: this.isMobileView && paginationSearch ? 420 : 0,
      behavior: 'smooth',
    });

    this.accommodationsResponse$ =
      this.accommodationsService.getAccommodations$(params);
  }

  getParams(filters: CombinedFilters): AccommodationsParams {
    const params = {
      ...mapFiltersToAccommodationsParams(
        filters,
        this.form.get('sortBy')?.value?.value
      ),
      Offset: this.offset,
      RecordNo: this.recordNo,
    };

    return params;
  }

  getFilters(): CombinedFilters {
    const basicFilters = this.basicFiltersComponent.getFilters();
    const advancedFilters = this.advancedFiltersComponent.getFilters();
    const filters: CombinedFilters = { ...basicFilters, ...advancedFilters };

    return filters;
  }

  onSortChange(): void {
    this.search();
  }

  onPageChange(event: PaginatorState): void {
    this.offset = event.first ?? this.offset;
    this.recordNo = event.rows ?? this.recordNo;
    this.search(true);
  }

  onMapView(): void {
    this.dialogService.open(MapSearchResultsComponent, {
      header: `${this.translation.instant('found_accommodations')}:`,
      width: this.isMobileView ? '100%' : '90%',
      height: '100%',
      focusOnShow: false,
      data: {
        searchParams: {
          ...this.getParams(this.getFilters()),
          Offset: 0,
          RecordNo: null,
        },
      },
    });
  }

  onFilters(): void {
    const ref = this.dialogService.open(
      AccommodationsAdvancedFiltersComponent,
      {
        header: this.translation.instant('filters'),
        width: '95%',
        focusOnShow: true,
        contentStyle: { overflow: 'scroll' },
        data: {
          isModal: true,
          sortControl: this.form.get('sortBy'),
          sortOptions: this.sortOptions,
        },
        styleClass: 'max-w-100',
      }
    );

    ref.onClose
      .pipe(takeUntil(this._destroying$))
      .subscribe((filters: AdvancedFilters | undefined) => {
        if (filters) {
          this.advancedFiltersComponent.form.patchValue(filters);
          this.search();
        }
      });
  }

  @HostListener('window:resize')
  handleWindowResize(): void {
    const mdBreakpoint = 768;
    this.rowsPerPageOptions =
      window.innerWidth < mdBreakpoint ? undefined : [10, 25, 50];
    this.isMobileView = window.innerWidth < mdBreakpoint;
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}

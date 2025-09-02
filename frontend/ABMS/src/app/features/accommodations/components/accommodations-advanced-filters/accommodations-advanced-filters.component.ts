import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { RatingModule } from 'primeng/rating';
import { SliderChangeEvent, SliderModule } from 'primeng/slider';
import { Subject, takeUntil } from 'rxjs';
import { AdvancedFilters } from '../../../../core/interfaces/advanced-filters';
import { SelectOption } from '../../../../core/interfaces/select-option';
import { ConstantsService } from '../../../../core/services/constants.service';

@Component({
  selector: 'app-accommodations-advanced-filters',
  standalone: true,
  imports: [
    PanelModule,
    TranslatePipe,
    SliderModule,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
    RatingModule,
  ],
  templateUrl: './accommodations-advanced-filters.component.html',
  styleUrl: './accommodations-advanced-filters.component.scss',
})
export class AccommodationsAdvancedFiltersComponent
  implements OnInit, OnDestroy
{
  @Output() onFilter = new EventEmitter<void>();

  form!: FormGroup;
  amenitiesOptions: string[] = [];
  sortOptions: SelectOption[] = [];
  selectedAmenities: string[] = [];
  isModal: boolean;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private constantsService: ConstantsService,
    protected translation: TranslateService,
    private route: ActivatedRoute,
    @Optional() private config: DynamicDialogConfig,
    @Optional() private ref: DynamicDialogRef
  ) {
    this.form = this.fb.group({
      minPrice: [0],
      maxPrice: [5000],
      priceRange: [[0, 5000]],
      amenities: [[]],
      rating: [null],
    });
    this.sortOptions = this.constantsService.getAccommodationsSortOptions();
    this.amenitiesOptions = this.constantsService.getAmenitiesOptions();
    this.isModal = this.config?.data.isModal;
    this.handleSortControl();
  }

  ngOnInit(): void {
    this.patchFilters();
  }

  handleSortControl(): void {
    if (this.config?.data.sortControl) {
      this.form.addControl('sortBy', this.config.data.sortControl);
      this.sortOptions = this.config.data.sortOptions;
    }
  }

  patchFilters(): void {
    this.route.queryParams
      .pipe(takeUntil(this._destroying$))
      .subscribe((params) => {
        this.form.patchValue({
          minPrice: params['minPrice'] || 0,
          maxPrice: params['maxPrice'] || 5000,
          priceRange: [params['minPrice'] || 0, params['maxPrice'] || 5000],
          amenities: params['amenities'] ? params['amenities'].split(',') : [],
          rating: params['rating'] || null,
        });
      });
  }

  updatePriceInputs(event: SliderChangeEvent): void {
    const rangeStart = event.values![0];
    const rangeEnd = event.values![1];

    if (rangeStart > rangeEnd) {
      this.form.get('minPrice')?.patchValue(rangeEnd);
      this.form.get('maxPrice')?.patchValue(rangeStart);
    }
    if (rangeStart < rangeEnd) {
      this.form.get('minPrice')?.patchValue(rangeStart);
      this.form.get('maxPrice')?.patchValue(rangeEnd);
    }
    if (rangeEnd === rangeStart) {
      this.form.get('minPrice')?.patchValue(rangeStart);
      this.form.get('maxPrice')?.patchValue(rangeEnd);
    }
  }

  clearFilters(): void {
    this.form.patchValue({
      minPrice: 0,
      maxPrice: 5000,
      priceRange: [0, 5000],
      amenities: [],
      rating: null,
    });
  }

  onSearch(): void {
    if (this.isModal) {
      const filters = this.getFilters();
      let filtersModified = {
        ...filters,
        amenities: filters.amenities ? filters.amenities?.split(',') : null,
      };
      this.ref.close(filtersModified);
    } else {
      this.onFilter.emit();
    }
  }

  getFilters(): AdvancedFilters {
    const filters: AdvancedFilters = {
      minPrice:
        this.form.get('minPrice')?.value !== 0
          ? this.form.get('minPrice')?.value
          : null,
      maxPrice:
        this.form.get('maxPrice')?.value !== 5000
          ? this.form.get('maxPrice')?.value
          : null,
      amenities: this.form.get('amenities')?.value?.length
        ? this.form.get('amenities')?.value.join(',')
        : null,
      rating: this.form.get('rating')?.value,
    };

    return filters;
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}

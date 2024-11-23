import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { RatingModule } from 'primeng/rating';
import { SliderChangeEvent, SliderModule } from 'primeng/slider';
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
export class AccommodationsAdvancedFiltersComponent {
  @Output() onFilter = new EventEmitter<AdvancedFilters>();

  form!: FormGroup;
  amenities: string[] = [];
  sortOptions: SelectOption[] = [];
  selectedAmenities: string[] = [];

  constructor(
    private fb: FormBuilder,
    private constantsService: ConstantsService,
    protected translation: TranslateService
  ) {
    this.form = this.fb.group({
      minPrice: [0],
      maxPrice: [5000],
      priceRange: [[0, 5000]],
      amenities: [null],
      rating: [null],
      sortBy: [null],
    });

    this.sortOptions = this.constantsService.getAccommodationsSortOptions();
    this.amenities = this.constantsService.getAmenitiesOptions();
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
    const advancedFilters: AdvancedFilters = {
      minPrice: this.form.get('minPrice')?.value,
      maxPrice: this.form.get('maxPrice')?.value,
      amenities: this.form.get('amenities')?.value,
      rating: this.form.get('rating')?.value,
      sortBy: this.form.get('sortBy')?.value.value,
    };

    this.onFilter.emit(advancedFilters);
  }
}

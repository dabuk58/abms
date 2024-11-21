import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { RatingModule } from 'primeng/rating';
import { SliderChangeEvent, SliderModule } from 'primeng/slider';
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
    CheckboxModule,
    ButtonModule,
    RatingModule,
  ],
  templateUrl: './accommodations-advanced-filters.component.html',
  styleUrl: './accommodations-advanced-filters.component.scss',
})
export class AccommodationsAdvancedFiltersComponent {
  form!: FormGroup;
  amenities: string[] = [];
  selectedAmenities: string[] = [];

  constructor(
    private fb: FormBuilder,
    private constantsService: ConstantsService,
    protected translation: TranslateService
  ) {
    this.form = this.fb.group({
      priceMin: [0],
      priceMax: [5000],
      priceRange: [[0, 5000]],
      amenities: [[]],
      rating: [null],
    });

    this.amenities = this.constantsService.getAmenitiesOptions();
  }

  updatePriceInputs(event: SliderChangeEvent): void {
    const rangeStart = event.values![0];
    const rangeEnd = event.values![1];

    if (rangeStart > rangeEnd) {
      this.form.get('priceMin')?.patchValue(rangeEnd);
      this.form.get('priceMax')?.patchValue(rangeStart);
    }
    if (rangeStart < rangeEnd) {
      this.form.get('priceMin')?.patchValue(rangeStart);
      this.form.get('priceMax')?.patchValue(rangeEnd);
    }
    if (rangeEnd === rangeStart) {
      this.form.get('priceMin')?.patchValue(rangeStart);
      this.form.get('priceMax')?.patchValue(rangeEnd);
    }
  }

  clearFilters(): void {
    this.form.patchValue({
      priceMin: 0,
      priceMax: 5000,
      priceRange: [0, 5000],
      amenities: [],
      rating: null,
    });
  }

  onSearch(): void {
    console.log(this.form.value);
  }
}

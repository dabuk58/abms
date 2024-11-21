import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { BasicFilters } from '../../../../core/interfaces/basic-filters';
import { incrementDateByOneDay } from '../../../../shared/tools/functions';

@Component({
  selector: 'app-accommodations-basic-filters',
  standalone: true,
  imports: [
    PanelModule,
    ButtonModule,
    ReactiveFormsModule,
    TranslatePipe,
    CalendarModule,
    InputTextModule,
    InputNumberModule,
  ],
  providers: [DatePipe],
  templateUrl: './accommodations-basic-filters.component.html',
  styleUrl: './accommodations-basic-filters.component.scss',
})
export class AccommodationsBasicFiltersComponent implements OnInit {
  @Input() filtersToPatch!: BasicFilters | null;

  minDate: Date = new Date(new Date().setDate(new Date().getDate() + 1));
  maxDate: Date = new Date(
    new Date().setFullYear(new Date().getFullYear() + 2)
  );
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    protected translation: TranslateService,
    private datePipe: DatePipe
  ) {
    this.form = this.fb.group({
      query: [null],
      dates: [null],
      guests: [null],
    });
  }

  ngOnInit(): void {
    this.patchFilters();
  }

  patchFilters(): void {
    if (!this.filtersToPatch) return;

    const { query, dateFrom, dateTo, guests } = this.filtersToPatch;

    query && this.form.get('query')?.setValue(query);

    if (dateFrom) {
      const datesValue = `${dateFrom} - ${
        dateTo ?? incrementDateByOneDay(dateFrom)
      }`;
      this.form.get('dates')?.setValue(datesValue);
    }

    guests && this.form.get('guests')?.setValue(guests);
  }

  onInput(): void {
    //TODO suggestions
  }

  onSearch(): void {
    this.checkAndEnhanceDates();
    console.log(this.form.value);
  }

  checkAndEnhanceDates(): void {
    const datesControl = this.form.get('dates');
    const datePipeTransform = (date: any) =>
      this.datePipe.transform(date, 'dd.MM.yyyy');

    const [dateFromRaw, dateToRaw] = datesControl?.value || [];
    const dateFrom = datePipeTransform(dateFromRaw);
    const dateTo = datePipeTransform(dateToRaw);

    if (!dateFrom && !dateTo) return;

    if (dateFrom && (!dateTo || dateFrom === dateTo)) {
      const enhancedDateTo = incrementDateByOneDay(dateFrom);
      datesControl?.patchValue(`${dateFrom} - ${enhancedDateTo}`);
    }
  }
}

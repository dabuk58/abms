import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() onFilter = new EventEmitter<BasicFilters>();

  minDate: Date = new Date(
    new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0)
  );
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
      calendarControl: [null],
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
      this.form.get('calendarControl')?.setValue(datesValue);
    }

    guests && this.form.get('guests')?.setValue(guests);

    this.checkAndEnhanceDates();
  }

  onInput(): void {
    //TODO suggestions
  }

  onSearch(): void {
    this.checkAndEnhanceDates();

    let dateFrom: string | null = null;
    let dateTo: string | null = null;
    const dateControl = this.form.get('calendarControl')?.value;

    if (dateControl) {
      if (Array.isArray(dateControl)) {
        dateFrom = this.datePipe.transform(dateControl[0], 'dd.MM.yyyy');
        dateTo = this.datePipe.transform(dateControl[1], 'dd.MM.yyyy');
      } else {
        dateFrom = dateControl.split(' - ')[0];
        dateTo = dateControl.split(' - ')[1];
      }
    }

    const basicFilters: BasicFilters = {
      query: this.form.get('query') ? this.form.get('query')?.value : null,
      dateFrom: dateFrom,
      dateTo: dateTo,
      guests: this.form.get('guests')?.value,
    };

    this.onFilter.emit(basicFilters);
  }

  checkAndEnhanceDates(): void {
    let dateFrom, dateTo;
    const dates = this.form.get('calendarControl')?.value;

    if (!dates) return;

    if (Array.isArray(dates)) {
      dateFrom = this.form.get('calendarControl')?.value[0];
      dateTo = this.form.get('calendarControl')?.value[1];
    } else {
      dateFrom = dates.split(' - ')[0];
      dateTo = dates.split(' - ')[1];
    }

    if (!dateFrom && !dateTo) return;

    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(dateFrom)) {
      dateFrom = this.datePipe.transform(
        this.form.get('calendarControl')?.value[0],
        'dd.MM.yyyy'
      );
      dateTo = this.datePipe.transform(
        this.form.get('calendarControl')?.value[1],
        'dd.MM.yyyy'
      );
    }

    if (dateFrom && (!dateTo || dateFrom === dateTo)) {
      const enhancedDateTo = incrementDateByOneDay(dateFrom);
      this.form
        .get('calendarControl')
        ?.patchValue(`${dateFrom} - ${enhancedDateTo}`);
    }
  }
}

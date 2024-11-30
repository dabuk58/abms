import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { Subject, takeUntil } from 'rxjs';
import { BasicFilters } from '../../../../core/interfaces/basic-filters';
import {
  enhanceCalendarDates,
  incrementDateByOneDay,
} from '../../../../shared/tools/functions';

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
export class AccommodationsBasicFiltersComponent implements OnInit, OnDestroy {
  @Output() onFilter = new EventEmitter<void>();

  minDate: Date = new Date(
    new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0)
  );
  maxDate: Date = new Date(
    new Date().setFullYear(new Date().getFullYear() + 2)
  );
  form!: FormGroup;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    protected translation: TranslateService,
    private datePipe: DatePipe,
    private route: ActivatedRoute
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
    this.route.queryParams
      .pipe(takeUntil(this._destroying$))
      .subscribe((params) => {
        const query = params['query'] || null;
        const dateFrom = params['dateFrom'] || null;
        const dateTo = params['dateTo'] || null;
        const guests = params['guests'] || null;

        query && this.form.get('query')?.setValue(query);

        if (dateFrom) {
          const datesValue = `${dateFrom} - ${
            dateTo ?? incrementDateByOneDay(dateFrom)
          }`;
          this.form.get('calendarControl')?.setValue(datesValue);
        }

        guests && this.form.get('guests')?.setValue(guests);

        enhanceCalendarDates(
          this.form.get('calendarControl') as FormControl,
          this.datePipe
        );
      });
  }

  onInput(): void {
    //TODO suggestions
  }

  onSearch(): void {
    enhanceCalendarDates(
      this.form.get('calendarControl') as FormControl,
      this.datePipe
    );
    this.onFilter.emit();
  }

  getFilters(): BasicFilters {
    enhanceCalendarDates(
      this.form.get('calendarControl') as FormControl,
      this.datePipe
    );

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

    const filters: BasicFilters = {
      query: this.form.get('query') ? this.form.get('query')?.value : null,
      dateFrom: dateFrom,
      dateTo: dateTo,
      guests: this.form.get('guests')?.value,
    };

    return filters;
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}

import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ROUTES } from '../../../../core/constants/routes-constants';
import { ConstantsService } from '../../../../core/services/constants.service';
import { ProposalsCarouselComponent } from '../../components/proposals-carousel/proposals-carousel.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ButtonModule,
    TranslatePipe,
    InputTextModule,
    CalendarModule,
    ReactiveFormsModule,
    InputNumberModule,
    ProposalsCarouselComponent,
    PanelModule,
  ],
  providers: [DatePipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit, OnDestroy {
  placeholders: string[];
  currentPlaceholder: string = '';
  placeholderIndex: number = 0;
  charIndex: number = 0;
  isDeleting: boolean = false;
  typingInterval: any;
  caretInterval: any;
  didUserInteract = false;
  minDate: Date = new Date(
    new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0)
  );
  maxDate: Date = new Date(
    new Date().setFullYear(new Date().getFullYear() + 2)
  );

  dates!: string;
  form!: FormGroup;

  constructor(
    protected translation: TranslateService,
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    private constantsService: ConstantsService
  ) {
    this.placeholders = this.constantsService.getPlacesForPlaceholder();

    this.currentPlaceholder = this.placeholders[0];

    this.form = this.fb.group({
      query: [null],
      dates: [null],
      guests: [null],
    });
  }

  ngOnInit(): void {
    this.startTypingEffect();
  }

  startTypingEffect(): void {
    this.typingInterval = setInterval(() => {
      const currentWord = this.placeholders[this.placeholderIndex];

      if (this.isDeleting) {
        this.charIndex--;
        this.currentPlaceholder = currentWord.substring(0, this.charIndex);
      } else {
        this.charIndex++;
        this.currentPlaceholder = currentWord.substring(0, this.charIndex);
      }

      if (!this.isDeleting && this.charIndex === currentWord.length) {
        clearInterval(this.typingInterval);
        setTimeout(() => {
          this.isDeleting = true;
          this.startTypingEffect();
        }, 1000);
      } else if (this.isDeleting && this.charIndex === 0) {
        this.isDeleting = false;
        this.placeholderIndex =
          (this.placeholderIndex + 1) % this.placeholders.length;
      }
    }, 110);
  }

  onInput(): void {
    //TODO suggestions search
    if (!this.didUserInteract) {
      this.currentPlaceholder =
        this.translation.instant('type_destination') + '...';
      clearInterval(this.typingInterval);
    }
  }

  onSearch(): void {
    this.router.navigate([ROUTES.ACCOMMODATIONS], {
      queryParams: {
        query: this.form.get('query')?.value,
        dateFrom:
          this.form.get('dates')?.value && this.form.get('dates')?.value[0]
            ? this.datePipe.transform(
                this.form.get('dates')?.value[0],
                'dd.MM.yyyy'
              )
            : null,
        dateTo:
          this.form.get('dates')?.value && this.form.get('dates')?.value[1]
            ? this.datePipe.transform(
                this.form.get('dates')?.value[1],
                'dd.MM.yyyy'
              )
            : null,
        guests: this.form.get('guests')?.value,
      },
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.typingInterval);
  }
}

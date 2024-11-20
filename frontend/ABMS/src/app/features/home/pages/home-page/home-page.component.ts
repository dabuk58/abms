import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
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
  minDate: Date = new Date(new Date().setDate(new Date().getDate() + 1));
  maxDate: Date = new Date(
    new Date().setFullYear(new Date().getFullYear() + 2)
  );

  dates!: string;
  form!: FormGroup;

  constructor(
    protected translation: TranslateService,
    private fb: FormBuilder
  ) {
    this.placeholders = [
      this.translation.instant('new_york'),
      this.translation.instant('masovia'),
      this.translation.instant('california'),
      this.translation.instant('warsaw'),
      this.translation.instant('london'),
      this.translation.instant('prague'),
      this.translation.instant('chile'),
      this.translation.instant('london'),
      this.translation.instant('italy'),
      this.translation.instant('san_francisco'),
    ];

    this.currentPlaceholder = this.placeholders[0];

    this.form = this.fb.group({
      query: [''],
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

  onInput(event: any): void {
    if (!this.didUserInteract) {
      this.currentPlaceholder =
        this.translation.instant('type_destination') + '...';
      clearInterval(this.typingInterval);
    }
    console.log(event.target.value);
  }

  onSearch(): void {
    console.log(this.form.value);
  }

  ngOnDestroy(): void {
    clearInterval(this.typingInterval);
  }
}

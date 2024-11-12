import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { HeaderComponent } from './core/components/header/header.component';
import translationsPL from './../../public/i18n/pl.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, TranslatePipe, TranslateDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['pl']);
    this.translate.setTranslation('pl', translationsPL);
    this.translate.setDefaultLang('pl');
    this.translate.use('pl');
  }
}

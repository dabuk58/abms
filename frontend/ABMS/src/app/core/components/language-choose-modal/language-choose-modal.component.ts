import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { GB, PL } from 'country-flag-icons/string/3x2';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-language-choose-modal',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './language-choose-modal.component.html',
  styleUrl: './language-choose-modal.component.scss',
})
export class LanguageChooseModalComponent {
  flagPL: SafeHtml;
  flagGB: SafeHtml;

  constructor(
    private translateService: TranslateService,
    private sanitizer: DomSanitizer,
    private ref: DynamicDialogRef
  ) {
    this.flagGB = this.sanitizer.bypassSecurityTrustHtml(GB);
    this.flagPL = this.sanitizer.bypassSecurityTrustHtml(PL);
  }

  switchLanguage(lang: string): void {
    this.translateService.use(lang);
  }

  close(): void {
    this.ref.close();
  }
}

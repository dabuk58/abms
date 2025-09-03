import { Component } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-site-info-modal',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './site-info-modal.component.html',
  styleUrl: './site-info-modal.component.scss',
})
export class SiteInfoModalComponent {
  constructor(private translateService: TranslateService) {}
}

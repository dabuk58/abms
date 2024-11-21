import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-accommodations-search-results',
  standalone: true,
  imports: [PanelModule],
  templateUrl: './accommodations-search-results.component.html',
  styleUrl: './accommodations-search-results.component.scss',
})
export class AccommodationsSearchResultsComponent {}

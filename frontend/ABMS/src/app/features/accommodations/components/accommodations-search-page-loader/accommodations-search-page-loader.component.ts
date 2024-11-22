import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-accommodations-search-page-loader',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './accommodations-search-page-loader.component.html',
  styleUrl: './accommodations-search-page-loader.component.scss',
})
export class AccommodationsSearchPageLoaderComponent {
  @Input() skeletonsAmount!: number;
}

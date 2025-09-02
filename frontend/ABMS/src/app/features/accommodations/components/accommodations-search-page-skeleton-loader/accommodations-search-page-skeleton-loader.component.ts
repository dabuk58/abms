import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-accommodations-search-page-skeleton-loader',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './accommodations-search-page-skeleton-loader.component.html',
  styleUrl: './accommodations-search-page-skeleton-loader.component.scss',
})
export class AccommodationsSearchPageSkeletonLoaderComponent {
  @Input() skeletonsAmount!: number;

  getSkeletonHeight(): string {
    const bpSmall = 640;
    return window.innerWidth < bpSmall ? '23.25rem' : '17.75rem';
  }
}

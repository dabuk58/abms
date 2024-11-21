import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { PanelModule } from 'primeng/panel';
import { Observable } from 'rxjs';
import { Accommodation } from '../../../../core/interfaces/accommodation';
import { AccommodationsService } from '../../services/accommodations.service';
import { LoaderComponent } from '../../../../core/components/loader/loader.component';

@Component({
  selector: 'app-accommodations-search-results',
  standalone: true,
  imports: [PanelModule, AsyncPipe, ImageModule, LoaderComponent],
  templateUrl: './accommodations-search-results.component.html',
  styleUrl: './accommodations-search-results.component.scss',
})
export class AccommodationsSearchResultsComponent implements OnInit {
  accommodations$!: Observable<Accommodation[]>;

  constructor(private accommodationsService: AccommodationsService) {}

  ngOnInit(): void {
    this.accommodations$ = this.accommodationsService.accommodations$;
  }

  onFavorite(id: number): void {
    console.log(id);
  }
}

import { Component, OnInit } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CarouselModule } from 'primeng/carousel';
import { Observable } from 'rxjs';
import { LoaderComponent } from '../../../../core/components/loader/loader.component';
import { Accommodation } from '../../../../core/interfaces/accommodation';
import { ProposalsService } from '../../services/proposals.service';

@Component({
  selector: 'app-proposals-carousel',
  standalone: true,
  imports: [CarouselModule, TranslatePipe, LoaderComponent],
  templateUrl: './proposals-carousel.component.html',
  styleUrl: './proposals-carousel.component.scss',
})
export class ProposalsCarouselComponent implements OnInit {
  responsiveOptions: any[] | undefined;
  accommodationProposals$!: Observable<Accommodation[]>;

  constructor(
    private translation: TranslateService,
    private proposalsService: ProposalsService
  ) {}

  ngOnInit() {
    this.setResponsiveOptions();

    this.accommodationProposals$ =
      this.proposalsService.getAccommodationProposals$();
  }

  setResponsiveOptions(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}

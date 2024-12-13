import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { Observable } from 'rxjs';
import { LoaderComponent } from '../../../../core/components/loader/loader.component';
import { ROUTES } from '../../../../core/constants/routes-constants';
import { Accommodation } from '../../../../core/interfaces/accommodation';
import { ProposalsService } from '../../services/proposals.service';

@Component({
  selector: 'app-proposals-carousel',
  standalone: true,
  imports: [CarouselModule, TranslatePipe, LoaderComponent, ButtonModule],
  templateUrl: './proposals-carousel.component.html',
  styleUrl: './proposals-carousel.component.scss',
})
export class ProposalsCarouselComponent implements OnInit {
  responsiveOptions: any[] | undefined;
  accommodationProposals$!: Observable<Accommodation[]>;

  constructor(
    private proposalsService: ProposalsService,
    private router: Router
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
        numVisible: 3,
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

  onProposal(id: number): void {
    this.router.navigate([ROUTES.ACCOMMODATIONS, id]);
  }
}

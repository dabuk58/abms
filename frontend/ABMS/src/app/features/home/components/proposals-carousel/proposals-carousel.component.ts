import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselModule } from 'primeng/carousel';
import { Accommodation } from '../../../../core/interfaces/accomodation';

@Component({
  selector: 'app-proposals-carousel',
  standalone: true,
  imports: [TranslatePipe, CarouselModule],
  templateUrl: './proposals-carousel.component.html',
  styleUrl: './proposals-carousel.component.scss',
})
export class ProposalsCarouselComponent implements OnInit {
  responsiveOptions: any[] | undefined;
  accommodations!: Accommodation[];

  constructor() {}

  ngOnInit() {
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

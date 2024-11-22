import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-accommodation-details-page',
  standalone: true,
  imports: [],
  templateUrl: './accommodation-details-page.component.html',
  styleUrl: './accommodation-details-page.component.scss',
})
export class AccommodationDetailsPageComponent implements OnInit, OnDestroy {
  accommodationId!: number;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    protected translation: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.setAccommodationId();
    console.log(this.accommodationId);
  }

  ngOnInit(): void {}

  setAccommodationId(): void {
    const id = this.router.url.split('/').pop();
    if (id) {
      this.accommodationId = +id;
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}

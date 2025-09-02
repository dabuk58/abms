import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationsSearchPageSkeletonLoaderComponent } from './accommodations-search-page-skeleton-loader.component';

describe('AccommodationsSearchPageSkeletonLoaderComponent', () => {
  let component: AccommodationsSearchPageSkeletonLoaderComponent;
  let fixture: ComponentFixture<AccommodationsSearchPageSkeletonLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccommodationsSearchPageSkeletonLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccommodationsSearchPageSkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationsBasicFiltersComponent } from './accommodations-basic-filters.component';

describe('AccommodationsBasicFiltersComponent', () => {
  let component: AccommodationsBasicFiltersComponent;
  let fixture: ComponentFixture<AccommodationsBasicFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccommodationsBasicFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccommodationsBasicFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

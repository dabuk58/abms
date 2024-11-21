import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationsAdvancedFiltersComponent } from './accommodations-advanced-filters.component';

describe('AccommodationsAdvancedFiltersComponent', () => {
  let component: AccommodationsAdvancedFiltersComponent;
  let fixture: ComponentFixture<AccommodationsAdvancedFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccommodationsAdvancedFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccommodationsAdvancedFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

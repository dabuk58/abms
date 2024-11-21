import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationsSearchResultsComponent } from './accommodations-search-results.component';

describe('AccommodationsSearchResultsComponent', () => {
  let component: AccommodationsSearchResultsComponent;
  let fixture: ComponentFixture<AccommodationsSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccommodationsSearchResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccommodationsSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

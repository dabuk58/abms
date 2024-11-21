import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationsSearchPageComponent } from './accommodations-search-page.component';

describe('AccommodationsSearchPageComponent', () => {
  let component: AccommodationsSearchPageComponent;
  let fixture: ComponentFixture<AccommodationsSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccommodationsSearchPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccommodationsSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

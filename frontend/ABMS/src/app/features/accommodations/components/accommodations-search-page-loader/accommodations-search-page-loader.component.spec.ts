import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationsSearchPageLoaderComponent } from './accommodations-search-page-loader.component';

describe('AccommodationsSearchPageLoaderComponent', () => {
  let component: AccommodationsSearchPageLoaderComponent;
  let fixture: ComponentFixture<AccommodationsSearchPageLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccommodationsSearchPageLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccommodationsSearchPageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

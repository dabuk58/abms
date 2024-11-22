import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationDetailsPageComponent } from './accommodation-details-page.component';

describe('AccommodationDetailsPageComponent', () => {
  let component: AccommodationDetailsPageComponent;
  let fixture: ComponentFixture<AccommodationDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccommodationDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccommodationDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingStatusBadgeComponent } from './booking-status-badge.component';

describe('BookingStatusBadgeComponent', () => {
  let component: BookingStatusBadgeComponent;
  let fixture: ComponentFixture<BookingStatusBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingStatusBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingStatusBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

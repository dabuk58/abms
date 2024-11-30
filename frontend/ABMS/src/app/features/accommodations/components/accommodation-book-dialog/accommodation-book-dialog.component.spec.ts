import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationBookDialogComponent } from './accommodation-book-dialog.component';

describe('AccommodationBookDialogComponent', () => {
  let component: AccommodationBookDialogComponent;
  let fixture: ComponentFixture<AccommodationBookDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccommodationBookDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccommodationBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

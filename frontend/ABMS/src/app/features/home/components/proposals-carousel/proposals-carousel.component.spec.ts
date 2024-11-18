import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsCarouselComponent } from './proposals-carousel.component';

describe('ProposalsCarouselComponent', () => {
  let component: ProposalsCarouselComponent;
  let fixture: ComponentFixture<ProposalsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalsCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

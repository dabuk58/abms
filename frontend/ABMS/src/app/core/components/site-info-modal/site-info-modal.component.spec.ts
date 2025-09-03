import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteInfoModalComponent } from './site-info-modal.component';

describe('SiteInfoModalComponent', () => {
  let component: SiteInfoModalComponent;
  let fixture: ComponentFixture<SiteInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteInfoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

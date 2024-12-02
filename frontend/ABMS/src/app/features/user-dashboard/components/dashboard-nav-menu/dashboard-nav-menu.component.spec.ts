import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNavMenuComponent } from './dashboard-nav-menu.component';

describe('DashboardNavMenuComponent', () => {
  let component: DashboardNavMenuComponent;
  let fixture: ComponentFixture<DashboardNavMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardNavMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardNavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

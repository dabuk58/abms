import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlErrorWrapperComponent } from './control-error-wrapper.component';

describe('ControlErrorWrapperComponent', () => {
  let component: ControlErrorWrapperComponent;
  let fixture: ComponentFixture<ControlErrorWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlErrorWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlErrorWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

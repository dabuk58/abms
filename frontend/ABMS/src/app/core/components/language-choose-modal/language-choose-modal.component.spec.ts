import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageChooseModalComponent } from './language-choose-modal.component';

describe('LanguageChooseModalComponent', () => {
  let component: LanguageChooseModalComponent;
  let fixture: ComponentFixture<LanguageChooseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageChooseModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageChooseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAccommodationPreviewComponent } from './map-accommodation-preview.component';

describe('MapAccommodationPreviewComponent', () => {
  let component: MapAccommodationPreviewComponent;
  let fixture: ComponentFixture<MapAccommodationPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapAccommodationPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapAccommodationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

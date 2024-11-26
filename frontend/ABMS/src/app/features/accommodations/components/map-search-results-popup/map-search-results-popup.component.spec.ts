import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSearchResultsPopupComponent } from './map-search-results-popup.component';

describe('MapSearchResultsPopupComponent', () => {
  let component: MapSearchResultsPopupComponent;
  let fixture: ComponentFixture<MapSearchResultsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapSearchResultsPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapSearchResultsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

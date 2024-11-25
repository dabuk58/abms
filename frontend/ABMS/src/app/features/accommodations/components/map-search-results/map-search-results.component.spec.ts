import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSearchResultsComponent } from './map-search-results.component';

describe('MapSearchResultsComponent', () => {
  let component: MapSearchResultsComponent;
  let fixture: ComponentFixture<MapSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapSearchResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseStoresComponent } from './browse-stores.component';

describe('BrowseStoresComponent', () => {
  let component: BrowseStoresComponent;
  let fixture: ComponentFixture<BrowseStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

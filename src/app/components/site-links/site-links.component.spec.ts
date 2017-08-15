import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteLinksComponent } from './site-links.component';

describe('SiteLinksComponent', () => {
  let component: SiteLinksComponent;
  let fixture: ComponentFixture<SiteLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

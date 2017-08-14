import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetaLaunchComponent } from './beta-launch.component';

describe('BetaLaunchComponent', () => {
  let component: BetaLaunchComponent;
  let fixture: ComponentFixture<BetaLaunchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetaLaunchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetaLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

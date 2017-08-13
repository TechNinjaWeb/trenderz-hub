import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MallPolicyComponent } from './mall-policy.component';

describe('MallPolicyComponent', () => {
  let component: MallPolicyComponent;
  let fixture: ComponentFixture<MallPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MallPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MallPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPolicyComponent } from './sell-policy.component';

describe('SellPolicyComponent', () => {
  let component: SellPolicyComponent;
  let fixture: ComponentFixture<SellPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixPayoutComponent } from './fix-payout.component';

describe('FixPayoutComponent', () => {
  let component: FixPayoutComponent;
  let fixture: ComponentFixture<FixPayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixPayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMasterDataComponent } from './edit-master-data.component';

describe('EditMasterDataComponent', () => {
  let component: EditMasterDataComponent;
  let fixture: ComponentFixture<EditMasterDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMasterDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMasterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

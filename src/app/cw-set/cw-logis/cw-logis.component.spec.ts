import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwLogisComponent } from './cw-logis.component';

describe('CwLogisComponent', () => {
  let component: CwLogisComponent;
  let fixture: ComponentFixture<CwLogisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwLogisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwLogisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

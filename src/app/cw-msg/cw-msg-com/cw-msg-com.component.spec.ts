import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwMsgComComponent } from './cw-msg-com.component';

describe('CwMsgComComponent', () => {
  let component: CwMsgComComponent;
  let fixture: ComponentFixture<CwMsgComComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwMsgComComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwMsgComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

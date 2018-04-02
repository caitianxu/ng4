import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwMsgQaComponent } from './cw-msg-qa.component';

describe('CwMsgQaComponent', () => {
  let component: CwMsgQaComponent;
  let fixture: ComponentFixture<CwMsgQaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwMsgQaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwMsgQaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

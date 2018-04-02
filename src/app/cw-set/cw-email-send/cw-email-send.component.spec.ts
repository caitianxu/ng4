import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwEmailSendComponent } from './cw-email-send.component';

describe('CwEmailSendComponent', () => {
  let component: CwEmailSendComponent;
  let fixture: ComponentFixture<CwEmailSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwEmailSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwEmailSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

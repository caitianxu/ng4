import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwQuesClassComponent } from './cw-ques-class.component';

describe('CwQuesClassComponent', () => {
  let component: CwQuesClassComponent;
  let fixture: ComponentFixture<CwQuesClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwQuesClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwQuesClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

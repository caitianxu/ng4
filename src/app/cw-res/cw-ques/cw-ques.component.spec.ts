import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwQuesComponent } from './cw-ques.component';

describe('CwQuesComponent', () => {
  let component: CwQuesComponent;
  let fixture: ComponentFixture<CwQuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwQuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwQuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

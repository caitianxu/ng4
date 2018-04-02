import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwReadComponent } from './cw-read.component';

describe('CwReadComponent', () => {
  let component: CwReadComponent;
  let fixture: ComponentFixture<CwReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

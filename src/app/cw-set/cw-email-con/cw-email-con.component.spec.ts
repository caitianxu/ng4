import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwEmailConComponent } from './cw-email-con.component';

describe('CwEmailConComponent', () => {
  let component: CwEmailConComponent;
  let fixture: ComponentFixture<CwEmailConComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwEmailConComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwEmailConComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

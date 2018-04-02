import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwInfoClassComponent } from './cw-info-class.component';

describe('CwInfoClassComponent', () => {
  let component: CwInfoClassComponent;
  let fixture: ComponentFixture<CwInfoClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwInfoClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwInfoClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

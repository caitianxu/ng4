import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwPrjClassComponent } from './cw-prj-class.component';

describe('CwPrjClassComponent', () => {
  let component: CwPrjClassComponent;
  let fixture: ComponentFixture<CwPrjClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwPrjClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwPrjClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

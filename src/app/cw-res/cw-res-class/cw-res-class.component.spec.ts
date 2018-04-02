import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwResClassComponent } from './cw-res-class.component';

describe('CwResClassComponent', () => {
  let component: CwResClassComponent;
  let fixture: ComponentFixture<CwResClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwResClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwResClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

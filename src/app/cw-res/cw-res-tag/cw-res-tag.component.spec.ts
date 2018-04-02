import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwResTagComponent } from './cw-res-tag.component';

describe('CwResTagComponent', () => {
  let component: CwResTagComponent;
  let fixture: ComponentFixture<CwResTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwResTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwResTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwInfoBookComponent } from './cw-info-book.component';

describe('CwInfoBookComponent', () => {
  let component: CwInfoBookComponent;
  let fixture: ComponentFixture<CwInfoBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwInfoBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwInfoBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

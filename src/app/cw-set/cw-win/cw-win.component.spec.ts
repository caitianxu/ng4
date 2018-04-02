import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwWinComponent } from './cw-win.component';

describe('CwWinComponent', () => {
  let component: CwWinComponent;
  let fixture: ComponentFixture<CwWinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwWinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

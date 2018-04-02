import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwPlayComponent } from './cw-play.component';

describe('CwPlayComponent', () => {
  let component: CwPlayComponent;
  let fixture: ComponentFixture<CwPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

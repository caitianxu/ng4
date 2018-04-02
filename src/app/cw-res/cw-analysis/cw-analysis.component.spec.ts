import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwAnalysisComponent } from './cw-analysis.component';

describe('CwAnalysisComponent', () => {
  let component: CwAnalysisComponent;
  let fixture: ComponentFixture<CwAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwTrainListComponent } from './cw-train-list.component';

describe('CwTrainListComponent', () => {
  let component: CwTrainListComponent;
  let fixture: ComponentFixture<CwTrainListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwTrainListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwTrainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

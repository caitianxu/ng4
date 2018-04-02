import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwTrainClassComponent } from './cw-train-class.component';

describe('CwTrainClassComponent', () => {
  let component: CwTrainClassComponent;
  let fixture: ComponentFixture<CwTrainClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwTrainClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwTrainClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

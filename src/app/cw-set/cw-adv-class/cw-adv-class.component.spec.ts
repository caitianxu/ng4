import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwAdvClassComponent } from './cw-adv-class.component';

describe('CwAdvClassComponent', () => {
  let component: CwAdvClassComponent;
  let fixture: ComponentFixture<CwAdvClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwAdvClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwAdvClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

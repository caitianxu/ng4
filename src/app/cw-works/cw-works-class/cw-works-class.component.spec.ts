import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwWorksClassComponent } from './cw-works-class.component';

describe('CwWorksClassComponent', () => {
  let component: CwWorksClassComponent;
  let fixture: ComponentFixture<CwWorksClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwWorksClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwWorksClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwResListComponent } from './cw-res-list.component';

describe('CwResListComponent', () => {
  let component: CwResListComponent;
  let fixture: ComponentFixture<CwResListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwResListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwResListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

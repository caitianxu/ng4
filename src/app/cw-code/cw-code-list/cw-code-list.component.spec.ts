import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwCodeListComponent } from './cw-code-list.component';

describe('CwCodeListComponent', () => {
  let component: CwCodeListComponent;
  let fixture: ComponentFixture<CwCodeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwCodeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

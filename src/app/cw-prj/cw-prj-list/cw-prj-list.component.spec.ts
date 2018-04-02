import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwPrjListComponent } from './cw-prj-list.component';

describe('CwPrjListComponent', () => {
  let component: CwPrjListComponent;
  let fixture: ComponentFixture<CwPrjListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwPrjListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwPrjListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

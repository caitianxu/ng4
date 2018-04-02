import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwOrdersListComponent } from './cw-orders-list.component';

describe('CwOrdersListComponent', () => {
  let component: CwOrdersListComponent;
  let fixture: ComponentFixture<CwOrdersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwOrdersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwMemberListComponent } from './cw-member-list.component';

describe('CwMemberListComponent', () => {
  let component: CwMemberListComponent;
  let fixture: ComponentFixture<CwMemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwMemberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

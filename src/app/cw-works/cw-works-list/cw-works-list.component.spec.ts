import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwWorksListComponent } from './cw-works-list.component';

describe('CwWorksListComponent', () => {
  let component: CwWorksListComponent;
  let fixture: ComponentFixture<CwWorksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwWorksListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwWorksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

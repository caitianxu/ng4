import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwAdvListComponent } from './cw-adv-list.component';

describe('CwAdvListComponent', () => {
  let component: CwAdvListComponent;
  let fixture: ComponentFixture<CwAdvListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwAdvListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwAdvListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

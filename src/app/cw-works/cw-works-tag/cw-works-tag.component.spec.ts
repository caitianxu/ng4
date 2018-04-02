import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwWorksTagComponent } from './cw-works-tag.component';

describe('CwWorksTagComponent', () => {
  let component: CwWorksTagComponent;
  let fixture: ComponentFixture<CwWorksTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwWorksTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwWorksTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

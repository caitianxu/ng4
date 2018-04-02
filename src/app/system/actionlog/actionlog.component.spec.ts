import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionlogComponent } from './actionlog.component';

describe('ActionlogComponent', () => {
  let component: ActionlogComponent;
  let fixture: ComponentFixture<ActionlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

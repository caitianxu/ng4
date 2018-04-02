import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwEmailModuleComponent } from './cw-email-module.component';

describe('CwEmailModuleComponent', () => {
  let component: CwEmailModuleComponent;
  let fixture: ComponentFixture<CwEmailModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwEmailModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwEmailModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

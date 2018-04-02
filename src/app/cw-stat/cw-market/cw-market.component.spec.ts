import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwMarketComponent } from './cw-market.component';

describe('CwMarketComponent', () => {
  let component: CwMarketComponent;
  let fixture: ComponentFixture<CwMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwMarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwGoodsClassComponent } from './cw-goods-class.component';

describe('CwGoodsClassComponent', () => {
  let component: CwGoodsClassComponent;
  let fixture: ComponentFixture<CwGoodsClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwGoodsClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwGoodsClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

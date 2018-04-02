import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwGoodsTagComponent } from './cw-goods-tag.component';

describe('CwGoodsTagComponent', () => {
  let component: CwGoodsTagComponent;
  let fixture: ComponentFixture<CwGoodsTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwGoodsTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwGoodsTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

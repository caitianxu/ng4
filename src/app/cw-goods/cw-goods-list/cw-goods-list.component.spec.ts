import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CwGoodsListComponent } from './cw-goods-list.component';

describe('CwGoodsListComponent', () => {
  let component: CwGoodsListComponent;
  let fixture: ComponentFixture<CwGoodsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwGoodsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwGoodsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

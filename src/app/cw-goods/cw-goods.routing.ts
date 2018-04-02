import { Routes } from '@angular/router';
//模块组件
import { CwGoodsListComponent } from './cw-goods-list/cw-goods-list.component';
import { CwGoodsClassComponent } from './cw-goods-class/cw-goods-class.component';
import { CwGoodsTagComponent } from './cw-goods-tag/cw-goods-tag.component';


export const routes: Routes = [
  { path: 'cw_goods_list', component: CwGoodsListComponent, data: { title: ' 商品列表', module: 'cw_goods_list', power: "SHOW" } },
  { path: 'cw_goods_class', component: CwGoodsClassComponent, data: { title: '商品分类', module: 'cw_goods_class', power: "SHOW" } },
  { path: 'cw_goods_tag', component: CwGoodsTagComponent, data: { title: '商品标签', module: 'cw_goods_tag', power: "SHOW" } },
];

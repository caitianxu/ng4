import { Routes } from '@angular/router';
//模块组件
import { CwOrdersListComponent } from './cw-orders-list/cw-orders-list.component';

export const routes: Routes = [
  { path: 'cw_orders_list', component: CwOrdersListComponent, data: { title: '订单管理', module: 'cw_orders_list', power: "SHOW" } },
];

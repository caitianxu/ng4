import { Routes } from '@angular/router';
//模块组件
import { CwCodeListComponent } from './cw-code-list/cw-code-list.component';

export const routes: Routes = [
  { path: 'cw_code_list', component: CwCodeListComponent, data: { title: '二维码管理', module: 'cw_code_list', power: "SHOW" } },
];

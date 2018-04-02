import { Routes } from '@angular/router';
//模块组件
import { CwPrjClassComponent } from './cw-prj-class/cw-prj-class.component';
import { CwPrjListComponent } from './cw-prj-list/cw-prj-list.component';

export const routes: Routes = [
  { path: 'cw_prj_class', component: CwPrjClassComponent, data: { title: '项目分类', module: 'cw_prj_class', power: "SHOW" } },
  { path: 'cw_prj_list', component: CwPrjListComponent, data: { title: '项目列表', module: 'cw_prj_list', power: "SHOW" } },
];

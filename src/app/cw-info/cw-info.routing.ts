import { Routes } from '@angular/router';
//模块组件
import { CwInfoBookComponent } from './cw-info-book/cw-info-book.component';
import { CwInfoClassComponent } from './cw-info-class/cw-info-class.component';

export const routes: Routes = [
  { path: 'cw_info_book', component: CwInfoBookComponent, data: { title: '图书管理', module: 'cw_info_book', power: "SHOW" } },
  { path: 'cw_info_class', component: CwInfoClassComponent, data: { title: '图书分类', module: 'cw_info_class', power: "SHOW" } },
  // { path: 'cw_res_class', component: CwResClassComponent, data: { title: '资源分类', module: 'cw_res_class', power: "SHOW" } },
  // { path: 'cw_analysis', component: CwAnalysisComponent, data: { title: '批量解析', module: 'cw_analysis', power: "SHOW" } },
  // { path: 'cw_ques', component: CwQuesComponent, data: { title: '题库管理', module: 'cw_ques', power: "SHOW" } },
  // { path: 'cw_ques_class', component: CwQuesClassComponent, data: { title: '试题分类', module: 'cw_ques_class', power: "SHOW" } },
  // { path: 'cw_res_list', component: CwResListComponent, data: { title: '资源列表', module: 'cw_res_list', power: "SHOW" } },
];

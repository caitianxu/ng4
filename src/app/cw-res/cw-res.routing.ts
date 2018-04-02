import { Routes } from '@angular/router';
//模块组件
import { CwResTagComponent } from './cw-res-tag/cw-res-tag.component';
import { CwResClassComponent } from './cw-res-class/cw-res-class.component';
import { CwQuesComponent } from './cw-ques/cw-ques.component';
import { CwQuesClassComponent } from './cw-ques-class/cw-ques-class.component';
import { CwAnalysisComponent } from './cw-analysis/cw-analysis.component';
import { CwResListComponent } from './cw-res-list/cw-res-list.component';


export const routes: Routes = [
  { path: 'cw_res_tag', component: CwResTagComponent, data: { title: '资源标签', module: 'cw_res_tag', power: "SHOW" } },
  { path: 'cw_res_class', component: CwResClassComponent, data: { title: '资源分类', module: 'cw_res_class', power: "SHOW" } },
  { path: 'cw_analysis', component: CwAnalysisComponent, data: { title: '批量解析', module: 'cw_analysis', power: "SHOW" } },
  { path: 'cw_ques', component: CwQuesComponent, data: { title: '题库管理', module: 'cw_ques', power: "SHOW" } },
  { path: 'cw_ques_class', component: CwQuesClassComponent, data: { title: '试题分类', module: 'cw_ques_class', power: "SHOW" } },
  { path: 'cw_res_list', component: CwResListComponent, data: { title: '资源列表', module: 'cw_res_list', power: "SHOW" } },
];

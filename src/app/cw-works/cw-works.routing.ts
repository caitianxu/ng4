import { Routes } from '@angular/router';
//模块组件
import { CwWorksClassComponent } from './cw-works-class/cw-works-class.component';
import { CwWorksTagComponent } from './cw-works-tag/cw-works-tag.component';
import { CwWorksListComponent } from './cw-works-list/cw-works-list.component';

export const routes: Routes = [
  { path: 'cw_works_class', component: CwWorksClassComponent, data: { title: '作品分类', module: 'cw_works_class', power: "SHOW" } },
  { path: 'cw_works_tag', component: CwWorksTagComponent, data: { title: '作品标签', module: 'cw_works_tag', power: "SHOW" } },
  { path: 'cw_works_list', component: CwWorksListComponent, data: { title: '作品列表', module: 'cw_works_list', power: "SHOW" } },
];

import { Routes } from '@angular/router';
//模块组件
import { CwTrainClassComponent } from './cw-train-class/cw-train-class.component';
import { CwTrainListComponent } from './cw-train-list/cw-train-list.component';

export const routes: Routes = [
  { path: 'cw_train_class', component: CwTrainClassComponent, data: { title: '视频分类', module: 'cw_train_class', power: "SHOW" } },
  { path: 'cw_train_list', component: CwTrainListComponent, data: { title: '视频列表', module: 'cw_train_list', power: "SHOW" } },
];

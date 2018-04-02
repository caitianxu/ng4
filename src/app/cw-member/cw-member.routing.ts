import { Routes } from '@angular/router';
//模块组件
import { CwMemberListComponent } from './cw-member-list/cw-member-list.component';

export const routes: Routes = [
  { path: 'cw_member_list', component: CwMemberListComponent, data: { title: '会员列表', module: 'cw_member_list', power: "SHOW" } },
];

import { Routes } from '@angular/router';
//模块组件
import { CwMsgComComponent } from './cw-msg-com/cw-msg-com.component';
import { CwMsgQaComponent } from './cw-msg-qa/cw-msg-qa.component';

export const routes: Routes = [
  { path: 'cw_msg_com', component: CwMsgComComponent, data: { title: '评论管理', module: 'cw_msg_com', power: "SHOW" } },
  { path: 'cw_msg_qa', component: CwMsgQaComponent, data: { title: '问答管理', module: 'cw_msg_qa', power: "SHOW" } },
];

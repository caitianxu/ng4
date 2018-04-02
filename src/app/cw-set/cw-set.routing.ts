import { Routes } from '@angular/router';
//模块组件
import { CwWinComponent } from './cw-win/cw-win.component';
import { CwAdvListComponent } from './cw-adv-list/cw-adv-list.component';
import { CwAdvClassComponent } from './cw-adv-class/cw-adv-class.component';
import { CwLogisComponent } from './cw-logis/cw-logis.component';
import { CwEmailConComponent } from './cw-email-con/cw-email-con.component';
import { CwEmailModuleComponent } from './cw-email-module/cw-email-module.component';
import { CwEmailSendComponent } from './cw-email-send/cw-email-send.component';

export const routes: Routes = [
  { path: 'cw_win', component: CwWinComponent, data: { title: '橱窗设置', module: 'cw_win', power: "SHOW" } },
  { path: 'cw_adv_list', component: CwAdvListComponent, data: { title: '广告设置', module: 'cw_adv_list', power: "SHOW" } },
  { path: 'cw_adv_class', component: CwAdvClassComponent, data: { title: '广告分类', module: 'cw_adv_class', power: "SHOW" } },
  { path: 'cw_logis', component: CwLogisComponent, data: { title: '物流设置', module: 'cw_logis', power: "SHOW" } },
  { path: 'cw_email_con', component: CwEmailConComponent, data: { title: '邮件配置', module: 'cw_email_con', power: "SHOW" } },
  { path: 'cw_email_module', component: CwEmailModuleComponent, data: { title: '邮件模版', module: 'cw_email_module', power: "SHOW" } },
  { path: 'cw_email_send', component: CwEmailSendComponent, data: { title: '发送邮件', module: 'cw_email_send', power: "SHOW" } },
];

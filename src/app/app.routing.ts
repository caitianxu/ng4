import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: '首页', module: 'home', power: "SHOW" } },
  { path: 'login', component: LoginComponent, data: { title: '登录', module: 'login', power: "SHOW" } },
  { path: 'error', component: ErrorComponent, data: { title: '404', module: 'error', power: "SHOW" } },
  { path: 'system', loadChildren: './system/system.module#SystemModule' },
  { path: 'cw_code', loadChildren: './cw-code/cw-code.module#CwCodeModule' },
  { path: 'cw_goods', loadChildren: './cw-goods/cw-goods.module#CwGoodsModule' },
  { path: 'cw_member', loadChildren: './cw-member/cw-member.module#CwMemberModule' },
  { path: 'cw_msg', loadChildren: './cw-msg/cw-msg.module#CwMsgModule' },
  { path: 'cw_orders', loadChildren: './cw-orders/cw-orders.module#CwOrdersModule' },
  { path: 'cw_prj', loadChildren: './cw-prj/cw-prj.module#CwPrjModule' },
  { path: 'cw_res', loadChildren: './cw-res/cw-res.module#CwResModule' },
  { path: 'cw_set', loadChildren: './cw-set/cw-set.module#CwSetModule' },
  { path: 'cw_stat', loadChildren: './cw-stat/cw-stat.module#CwStatModule' },
  { path: 'cw_tool', loadChildren: './cw-tool/cw-tool.module#CwToolModule' },
  { path: 'cw_train', loadChildren: './cw-train/cw-train.module#CwTrainModule' },
  { path: 'cw_works', loadChildren: './cw-works/cw-works.module#CwWorksModule' },
  { path: 'cw_info', loadChildren: './cw-info/cw-info.module#CwInfoModule' },
  //路由添加请在 ** 申明之前
  { path: '**', redirectTo: '/error', pathMatch: 'full' }
];

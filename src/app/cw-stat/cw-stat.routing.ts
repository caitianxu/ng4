import { Routes } from '@angular/router';
//模块组件
import { CwSearchComponent } from './cw-search/cw-search.component';
import { CwMarketComponent } from './cw-market/cw-market.component';
import { CwReadComponent } from './cw-read/cw-read.component';
import { CwPlayComponent } from './cw-play/cw-play.component';

export const routes: Routes = [
  { path: 'cw_search', component: CwSearchComponent, data: { title: '搜索统计', module: 'cw_search', power: "SHOW" } },
  { path: 'cw_market', component: CwMarketComponent, data: { title: '销售统计', module: 'cw_market', power: "SHOW" } },
  { path: 'cw_read', component: CwReadComponent, data: { title: '阅读统计', module: 'cw_read', power: "SHOW" } },
  { path: 'cw_play', component: CwPlayComponent, data: { title: '播放统计', module: 'cw_play', power: "SHOW" } },
];

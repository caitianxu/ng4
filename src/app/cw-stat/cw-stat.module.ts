import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CwSearchComponent } from './cw-search/cw-search.component';
import { CwMarketComponent } from './cw-market/cw-market.component';
import { CwReadComponent } from './cw-read/cw-read.component';
import { CwPlayComponent } from './cw-play/cw-play.component';

//web ui 
import { NgZorroAntdModule, NZ_MESSAGE_CONFIG, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';//引入NZ 使用的form核心
import { FormsModule, ReactiveFormsModule } from "@angular/forms";//引入NZ 使用的form核心
import { routes } from './cw-stat.routing';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule.forRoot(), //引入NZ
    CommonModule
  ],
  declarations: [CwSearchComponent, CwMarketComponent, CwReadComponent, CwPlayComponent],
  providers: [  //引入NZ
    { provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 3000 } },
    { provide: NZ_NOTIFICATION_CONFIG, useValue: { nzTop: '20px' } }
  ]
})
export class CwStatModule { }


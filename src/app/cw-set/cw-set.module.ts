import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CwWinComponent } from './cw-win/cw-win.component';
import { CwAdvListComponent } from './cw-adv-list/cw-adv-list.component';
import { CwAdvClassComponent } from './cw-adv-class/cw-adv-class.component';
import { CwLogisComponent } from './cw-logis/cw-logis.component';
import { CwEmailConComponent } from './cw-email-con/cw-email-con.component';
import { CwEmailModuleComponent } from './cw-email-module/cw-email-module.component';
import { CwEmailSendComponent } from './cw-email-send/cw-email-send.component';

//web ui 
import { NgZorroAntdModule, NZ_MESSAGE_CONFIG, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';//引入NZ 使用的form核心
import { FormsModule, ReactiveFormsModule } from "@angular/forms";//引入NZ 使用的form核心
import { routes } from './cw-set.routing';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule.forRoot(), //引入NZ
    CommonModule
  ],
  declarations: [CwWinComponent, CwEmailConComponent, CwEmailModuleComponent, CwEmailSendComponent, CwAdvListComponent,CwAdvClassComponent, CwLogisComponent],
  providers: [  //引入NZ
    { provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 3000 } },
    { provide: NZ_NOTIFICATION_CONFIG, useValue: { nzTop: '20px' } }
  ]
})
export class CwSetModule { }




import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//web ui 
import { NgZorroAntdModule, NZ_MESSAGE_CONFIG, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';//引入NZ 使用的form核心
import { FormsModule, ReactiveFormsModule } from "@angular/forms";//引入NZ 使用的form核心
import { routes } from './cw-info.routing';
import { RouterModule } from '@angular/router';


import { CwInfoBookComponent } from './cw-info-book/cw-info-book.component';
import { CwInfoClassComponent } from './cw-info-class/cw-info-class.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule.forRoot(), //引入NZ
    CommonModule
  ],
  declarations: [CwInfoBookComponent, CwInfoClassComponent],
  providers: [  //引入NZ
    { provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 3000 } },
    { provide: NZ_NOTIFICATION_CONFIG, useValue: { nzTop: '20px' } }
  ]
})
export class CwInfoModule { }


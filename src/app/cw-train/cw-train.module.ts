import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CwTrainClassComponent } from './cw-train-class/cw-train-class.component';
import { CwTrainListComponent } from './cw-train-list/cw-train-list.component';


//web ui 
import { NgZorroAntdModule, NZ_MESSAGE_CONFIG, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';//引入NZ 使用的form核心
import { FormsModule, ReactiveFormsModule } from "@angular/forms";//引入NZ 使用的form核心
import { routes } from './cw-train.routing';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule.forRoot(), //引入NZ
    CommonModule
  ],
  declarations: [CwTrainClassComponent, CwTrainListComponent],
  providers: [  //引入NZ
    { provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 3000 } },
    { provide: NZ_NOTIFICATION_CONFIG, useValue: { nzTop: '20px' } }
  ]
})
export class CwTrainModule { }




import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CwResTagComponent } from './cw-res-tag/cw-res-tag.component';
import { CwResClassComponent } from './cw-res-class/cw-res-class.component';
import { CwQuesComponent } from './cw-ques/cw-ques.component';
import { CwQuesClassComponent } from './cw-ques-class/cw-ques-class.component';
import { CwAnalysisComponent } from './cw-analysis/cw-analysis.component';
import { CwResListComponent } from './cw-res-list/cw-res-list.component';

//web ui 
import { NgZorroAntdModule, NZ_MESSAGE_CONFIG, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';//引入NZ 使用的form核心
import { FormsModule, ReactiveFormsModule } from "@angular/forms";//引入NZ 使用的form核心
import { routes } from './cw-res.routing';
import { RouterModule } from '@angular/router';




@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule.forRoot(), //引入NZ
    CommonModule
  ],
  declarations: [CwResTagComponent, CwResClassComponent, CwAnalysisComponent, CwQuesClassComponent, CwResListComponent, CwQuesComponent],
  providers: [  //引入NZ
    { provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 3000 } },
    { provide: NZ_NOTIFICATION_CONFIG, useValue: { nzTop: '20px' } }
  ]
})
export class CwResModule { }


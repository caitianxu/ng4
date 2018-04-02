import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CwWorksClassComponent } from './cw-works-class/cw-works-class.component';
import { CwWorksTagComponent } from './cw-works-tag/cw-works-tag.component';
import { CwWorksListComponent } from './cw-works-list/cw-works-list.component';

//web ui 
import { NgZorroAntdModule, NZ_MESSAGE_CONFIG, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';//引入NZ 使用的form核心
import { FormsModule, ReactiveFormsModule } from "@angular/forms";//引入NZ 使用的form核心
import { routes } from './cw-works.routing';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule.forRoot(), //引入NZ
    CommonModule,
  ],
  declarations: [CwWorksClassComponent, CwWorksTagComponent, CwWorksListComponent],
  providers: [  //引入NZ
    { provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 3000 } },
    { provide: NZ_NOTIFICATION_CONFIG, useValue: { nzTop: '20px' } }
  ]
})
export class CwWorksModule { }



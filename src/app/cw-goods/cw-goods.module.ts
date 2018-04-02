import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CwGoodsListComponent } from './cw-goods-list/cw-goods-list.component';
import { CwGoodsClassComponent } from './cw-goods-class/cw-goods-class.component';
import { CwGoodsTagComponent } from './cw-goods-tag/cw-goods-tag.component';

//web ui 
import { NgZorroAntdModule, NZ_MESSAGE_CONFIG, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';//引入NZ 使用的form核心
import { FormsModule, ReactiveFormsModule } from "@angular/forms";//引入NZ 使用的form核心
import { routes } from './cw-goods.routing';
import { RouterModule } from '@angular/router';

//富文本编辑器

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule.forRoot(), //引入NZ
    CommonModule
  ],
  declarations: [CwGoodsListComponent, CwGoodsClassComponent, CwGoodsTagComponent],
  providers: [  //引入NZ
    { provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 3000 } },
    { provide: NZ_NOTIFICATION_CONFIG, useValue: { nzTop: '20px' } }
  ]
})
export class CwGoodsModule { }



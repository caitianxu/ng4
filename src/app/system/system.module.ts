import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//web ui 
import { NgZorroAntdModule, NZ_MESSAGE_CONFIG, NZ_NOTIFICATION_CONFIG } from 'ng-zorro-antd';//引入NZ 使用的form核心
import { FormsModule, ReactiveFormsModule } from "@angular/forms";//引入NZ 使用的form核心
import { routes } from './system.routing';
import { RouterModule } from '@angular/router';

//富文本编辑器
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { ResourceComponent } from './resource/resource.component';
import { OutfitComponent } from './outfit/outfit.component';
import { OrgComponent } from './org/org.component';
import { MessageComponent } from './message/message.component';
import { AuthorityComponent } from './authority/authority.component';
import { ActionlogComponent } from './actionlog/actionlog.component';
import { SyslogComponent } from './syslog/syslog.component';
import { PersonalComponent } from './personal/personal.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule.forRoot()
  ],
  declarations: [
    UserComponent,
    ResourceComponent,
    OutfitComponent,
    OrgComponent,
    MessageComponent,
    AuthorityComponent,
    RoleComponent,
    ActionlogComponent,
    PersonalComponent,
    SyslogComponent,
  ],
  providers: [  //引入NZ
    { provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 3000 } },
    { provide: NZ_NOTIFICATION_CONFIG, useValue: { nzTop: '20px' } }
  ]
})
export class SystemModule { }

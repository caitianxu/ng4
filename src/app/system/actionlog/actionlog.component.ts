import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-actionlog',
  templateUrl: './actionlog.component.html',
  styleUrls: ['./actionlog.component.css']
})
export class ActionlogComponent implements OnInit {
  param: any = {
    total: 0,
    pageSize: 10,
    pageNum: 1,
    searchText:null,
    begin_time:null,
    end_time:null,
  };
  paramCol: any = {
    searchTime: [],
    searchText: null
  }

  constructor(public service : AppService) { }

  ngOnInit() {
    this.reload();
  }
   /**************************表格部分*************************/
   tableData: any = []; //数据列表
   _loading: boolean = true; //loading 状态
   //查询列表数据
   reload(reset?: any) {
     if (reset == true) {
       this.param.pageNum = 1;
       this.param.searchText = this.paramCol.searchText;
       this.param.begin_time = this.paramCol.searchTime[0];
       this.param.end_time = this.paramCol.searchTime[1];
     }
     this._loading = true;
     this.service.post('/api/system/action_log/list', this.param).then(success => {
       this._loading = false;
       if (success.code == 0) {
         this.tableData = success.data.rows;
         this.param.total = success.data.total;
       }
       else {
         this.tableData = [];
         this.param.total = 0;
         this.service.message.error(success.message);
       }
     })
   }
   /**************************表格部分*************************/

   //重置
   resetForm(){
     this.paramCol.searchText=null;
     this.paramCol.searchTime=[];
   }
}

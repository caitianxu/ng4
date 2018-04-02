import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-cw-member-list',
  templateUrl: './cw-member-list.component.html',
  styleUrls: ['./cw-member-list.component.css']
})
export class CwMemberListComponent implements OnInit {


  _allChecked = false;
  _indeterminate = false;
  _loading : boolean = false;
  param :any = {
    pageNum:1,
    pageSize:10
  }

  data : any = [];

  constructor(public service: AppService) { }


  load(reset?){
    if (reset == true) {
      this.param.pageNum = 1;
    }

    this._loading = true;

    this.service.post('/api/busiz/member/getlist',this.param).then(success => {
      this._loading = false;
      if(success.code==0){
        this.data = success.data.rows;
        this.param.total = success.data.total;
      }else{
        this.data = [];
        this.param.total = 0;
        this.service.message.error(success.message);
      }
    })
  
  }

  reload(rest ?){
    if(rest){
      this.load();
    }
  }
  resetForm(){
    this.param.searchText = null;
    this.load();
  }


  ngOnInit() {



    //加载会员列表
    this.load();
  }


// 全选
  _checkAll(value) {
    if (value) {
      this.data.forEach(data => {
        if (!data.disabled) {
          data.checked = true;
        }
      });
    } else {
      this.data.forEach(data => data.checked = false);
    }
    this._refreshStatus();
  }
  _refreshStatus() {
    const allChecked = this.data.every(value => value.disabled || value.checked);
    const allUnChecked = this.data.every(value => value.disabled || !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
  }
  
}

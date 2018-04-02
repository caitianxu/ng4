import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-cw-analysis',
  templateUrl: './cw-analysis.component.html',
  styleUrls: ['./cw-analysis.component.css']
})
export class CwAnalysisComponent implements OnInit {
  param: any ={
    total: 0,
    pageSize: 10,
    pageNum: 1,
    pages: 0,
    searchText: null
  }
  paramCol = {
    searchText: null
  }
  
  _loading: boolean = false;
  isVisibleMiddle: boolean = false;
  tableData: any = [];
  formBean: any = {
    upload_id: null,
    upload_name: null,
    upload_url: null
  }
  myForm: any;
  constructor(public service: AppService) { }

  ngOnInit() {
    this.myForm = this.service.fb.group({
      upload_name: [null, [this.service.validators.required]],
      upload_url: [null, [this.service.validators.required]]
    });
    this._reload();
  }
  //创建任务
  _cwAnalysisAdd(){
    this.isVisibleMiddle = true;
    for(let i in this.formBean){
      this.formBean[i] = null;
    }
  }
  //提交任务
  _submitForm(){
    for (const i in this.myForm.controls) {
      this.myForm.controls[i].markAsDirty();
    }
    if(!this.myForm.valid){
      return false;
    }
    this.service.post('/api/busiz/res/upload/save',this.formBean).then(success => {
      if(success.code == 0){
        this.isVisibleMiddle = false;
        this._reload(true);
      }
      else{
        this.service.message.error(success.message);
      }
    })
  }
  //取消编辑
  _cancelMiddle(event?:any){
    this.isVisibleMiddle = false;
  }
  //提交编辑
  _okMiddle(event?:any){
    this._submitForm();
  }
  //刷新列表
  _reload(event?: any){
    if(event){
      this.param.searchText = this.paramCol.searchText;
      this.param.pageNum = 1;
    }
    this._loading = true;
    this.service.post('/api/busiz/res/upload/getlist',this.param).then(success => {
      this._loading = false;
      this.tableData = success.data.rows;
      this.param.total = success.data.total;
      this.param.pages = success.data.pages;
    })
  }
  //修改任务
  _editRow(data){
    this.isVisibleMiddle = true;
    for(let i in data){
      this.formBean[i] = data[i];
    }
  }
  //开始解析
  _startRow(data){
    this.service.post('/api/busiz/res/upload/start',{
      upload_id: data.upload_id
    }).then(success => {
      this._reload(true);
    })
  }
}

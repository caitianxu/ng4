
import { Component, OnInit } from '@angular/core';

import { AppService } from '../../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';

declare let wangEditor: any;
@Component({
  selector: 'app-cw-ques',
  templateUrl: './cw-ques.component.html',
  styleUrls: ['./cw-ques.component.css']
})
export class CwQuesComponent implements OnInit {

  _allChecked = false;
  _indeterminate = false;
  param :any = {
    pageNum:1,
    pageSize:10
  }

  typeData : any = [{id:1,type_name:'单选题'},{id:2,type_name:'多选题'},{id:3,type_name:'判断题'}]
  myForm: FormGroup;
  data : any = [];
  _loading: boolean = true;
  formTitle : string; 

  isList : boolean = false;//新增与修改
  paperList : boolean = false;//预览
  isDetails : boolean = false;//详情
  seeList : boolean = false;//页面确定和取消按钮隐藏
  uploadList : boolean = false;//上传页面

  goods_data : any = [];//商品标签
  class_data : any = [];//商品分类
  now_data : any = {};//当前修改新增对象
  now_num :number = 1;
  
  constructor(public service: AppService,public msg: NzMessageService) { }

  ngOnInit() {
    this.myForm = this.service.fb.group({
      type: false,
      label_id:false,
      score:false,
      cat_id:false,
      opContext:false,
      upload_cat_id:false,
      upload_label_id:false,
      upload_id:false
    })

    //加载数据
    this.load();

    // this.get_all();

    //加载商品标签
    this.get_goods();
    // 加载商品分类
    this.get_class();
  }

  load(reset?){
    if (reset == true) {
      this.param.pageNum = 1;
    }

    this._loading = true;

    this.service.post('/api/busiz/question/getlist',this.param).then(success => {
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
  // 商品标签

  get_goods(){
    this.service.post('/api/busiz/goods/tag/list',{pageNum:1,pageSize:1000}).then(success => {
      if(success.code==0){
        this.goods_data = success.data.rows;
      }else{
        this.service.message.error(success.message);
      }
    })
  }


  // 商品分类
  get_class(){
    this.service.post('/api/busiz/goods/cat/tree').then(success => {
      if(success.code==0){
        console.log(success)
        this.class_data = success.data;

      }else{
        this.service.message.error(success.message);
      }
    })
  }


  reload(rest ?){
    if(rest){
      this.load();
    }
  }

  //关闭弹窗
handleCancelMiddle($event) {
  this.isList = false;
  this.myForm.reset();
}

//确定
handleOkMiddle($event) {
  this._submitForm();
}

// 试题发布
_enabled(data){
  console.log(this.service.validataAction('cw_ques_enable'))
  if(this.service.validataAction('cw_ques_enable')){
    let enabled = data.enabled ==1 ? 2 : 1;
    this.service.post('/api/busiz/question/audit',{id:data.id,enabled:enabled}).then(success => {
      if(success.code==0){
        this.load();
        this.service.message.success(success.message);
      }else{
        this.service.message.error(success.message);
      }
    })
  }

}
//新增
_add(){
  this.isList = true;
  this.formTitle = '新增试题';
  this.now_num =1;
  // this.now_data.opContext = `<p >【题干】</p><p >【答案】</p><p >【解析】</p>`;
  this.ngAfterViewInit();
    
  

}

// 修改
_edit(data){
  this.now_data = {};
  this.isList = true;
  this.formTitle = '修改试题';
  this.now_num =2;
  for(let i in data){
    this.now_data[i] = data[i];
  }
  this.now_data.label_ids = this.now_data.label_id;
  console.log(this.now_data)

  this.ngAfterViewInit();
  // this.now_data.opContext = `<p >【题干】</p>${this.now_data.title}<p >【答案】</p>${this.now_data.analysis}<p >【解析】</p>${this.now_data.parsing}`;
}

//删除
_del(data){
  this.service.post('/api/busiz/question/delete',{ids:[data.id]}).then(success => {
    if(success.code==0){
      this.load();
      this.service.message.success(success.message);
    }else{
      this.service.message.error(success.message);
    }
  })
}

upload_param : any = {};
fileList : any = [];
//上传
_upload(){
  this.upload_param = {};
  this.fileList = [];
  this.uploadList = true;
}

  //文件上传
  fileUpload(info): void {
    if (info.file.response && info.file.response.code == 0) {
      this.upload_param.id = info.file.response.data.id;
    }
  }
  //关闭弹窗
  uploadCancel($event) {
    this.uploadList = false;
    this.myForm.reset();
  }
  //上传确定
  uploadOk($event) {
    this._submitUpload();
}
_submitUpload(){
  if(!this.upload_param.cat_ids || this.upload_param.cat_ids.length==0){
    this.service.message.error('请选择分类');
    return false;
  }
  if(!this.upload_param.label_ids || this.upload_param.label_ids.length==0){
    this.service.message.error('请选择标签');
    return false;
  }
  this.upload_param.label_id = this.upload_param.label_ids.join(",");
  this.upload_param.cat_id = this.upload_param.cat_ids[this.upload_param.cat_ids.length-1];
  this.service.post('/api/busiz/question/save/file',this.upload_param).then(success => {
    if(success.code==0){
      this.load();
      this.uploadList = false;
      this.myForm.reset();
      this.service.message.success(success.message);
    }else{
      this.service.message.error(success.message);
    }
  })
}

// 提交
_submitForm() {
  this.now_num = 3;
  if(!this.now_data.label_ids){
    this.service.message.error('请选择标签');
    return false;
  }
  if(!this.now_data.cat_ids || this.now_data.cat_ids.length==0){
    this.service.message.error('请选择分类');
    return false;
  }
  let class_id = this.now_data.cat_ids[this.now_data.cat_ids.length-1];
    if(typeof(class_id)=='object'){
      this.now_data.cat_id = parseInt(class_id.cat_id);
    }else{
      this.now_data.cat_id = parseInt(class_id) == null ? '' : parseInt(class_id);
    }
  this.now_data.label_id = this.now_data.label_ids.join(",");
  
  this.now_data.opContext = this.editor.txt.html();
  console.log(this.now_data);
  this.service.post('/api/busiz/question/save',this.now_data).then(success => {
    if(success.code==0){
      this.load();
      this.isList = false;
      this.myForm.reset();
      this.now_num = 1;
      this.service.message.success(success.message);
    }else{
      this.service.message.error(success.message);
    }
  })
}


//查看
_show(data){
  data.select = !data.select
}


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
editor:any
ngAfterViewInit(){
    
  this.editor = new wangEditor('#editor');
  this.editor.customConfig.uploadImgShowBase64 = true;
  this.editor.create();
  this.editor.txt.clear();
  if(this.now_num == 1){
    this.editor.txt.html('<p >【题干】</p><p >【答案】</p><p >【解析】</p>');
  }else if(this.now_num == 2){
    this.editor.txt.html('<p >【题干】</p>'+this.now_data.title+'<p >【答案】</p>'+this.now_data.analysis+'<p >【解析】</p>'+this.now_data.parsing);
  }
  
  // editor.txt.html('<p>用 JS 设置的内容</p>');
  // editor.txt.append('<p>追加的内容</p>');
  // console.log(editor.txt.html())
  // console.log(editor.txt.text())
}

}

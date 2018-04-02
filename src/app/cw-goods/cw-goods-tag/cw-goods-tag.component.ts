import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-cw-goods-tag',
  templateUrl: './cw-goods-tag.component.html',
  styleUrls: ['./cw-goods-tag.component.css']
})
export class CwGoodsTagComponent implements OnInit {
  _loading : boolean = false;
  _allChecked : boolean = false;
  _indeterminate : boolean = false;
  isVisible : boolean = false;
  goods_isVisible : boolean = false;
  formTitle : string;
  myForm: FormGroup;
  data : any = [];//品牌列表
  goods_data : any = []; //商品列表
  selRow : any = {};
  goods_selRow : any = {};
  param : any = {
    pageNum:1,
    pageSize:10,
    searchText:null
  }
  goods_param : any = {
    pageNum:1,
    pageSize:10,
    searchText:null
  }

  constructor(public service: AppService) { }

  ngOnInit() {
    this.myForm = this.service.fb.group({
      brand_code: false,
      brand_name:false,
      remark:false,
      tag_name:false
    })


    // 加载品牌列表
    this.load();

    // 加载商品列表
    this.goods_load();
  }

  // 项目列表
  load(reset?){
    if (reset == true) {
      this.param.pageNum = 1;
    }
    console.log(this.param)
    this._loading = true;
    this.service.post('/api/busiz/brand/getlist',this.param).then(success => {
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
  goods_load(reset?){
    if (reset == true) {
      this.goods_param.pageNum = 1;
    }
    console.log(this.goods_param)
    this._loading = true;
    this.service.post('/api/busiz/goods/tag/list',this.goods_param).then(success => {
      this._loading = false;
      if(success.code==0){
        this.goods_data = success.data.rows;
        this.goods_param.total = success.data.total;
      }else{
        this.goods_data = [];
        this.goods_param.total = 0;
        this.service.message.error(success.message);
      }
    })
  }

  //品牌标签查询
  reload(reset?){
    if(reset){
        this.load();
    }

  }
  //品牌标签查询
  goods_reload(reset?){
    if(reset){
        this.goods_load();
    }

  }
  // 品牌搜索重置
  resetForm(){
    this.param.searchText = null;
    this.load();
  }
  // 商品搜索重置
  goods_resetForm(){
    this.goods_param.searchText = null;
    this.goods_load();
  }

  //品牌新增操作
  add(){
    this.selRow = {};
    this.isVisible = true;
    this.formTitle = '品牌标签新增'
  }
  //商品新增操作 
  goods_add(){
    this.goods_selRow = {};
    this.goods_isVisible = true;
    this.formTitle = '商品标签新增'
  }
  // 品牌修改操作
  edit(data){
    this.selRow = {};
    this.isVisible = true;
    this.formTitle = '品牌标签修改'

    for(let i in data){
      this.selRow[i] = data[i]
    }
  }

  // 商品修改操作
  goods_edit(data){
    this.goods_selRow = {};
    this.goods_isVisible = true;
    this.formTitle = '商品标签修改'

    for(let i in data){
      this.goods_selRow[i] = data[i]
    }
  }
  //品牌删除操作
  del(data){
    this.service.post('/api/busiz/brand/del',{ids:[data.brand_id]}).then(success => {
      if(success.code==0){
        this.load();
        this.service.message.success(success.message);
      }else{
        this.service.message.error(success.message);
      }
    })
  }
  //商品删除操作
  goods_del(data){
    this.service.post('/api/busiz/goods/tag/del',{ids:[data.tag_id]}).then(success => {
      if(success.code==0){
        this.goods_load();
        this.service.message.success(success.message);
      }else{
        this.service.message.error(success.message);
      }
    })
  }


  //关闭弹窗
  handleCancel($event) {
    this.isVisible = false;
    this.goods_isVisible = false
    this.myForm.reset();
  }

  //品牌确定
  handleOk($event) {
    this._submitForm();
  }
  //商品确定
  goods_handleOk($event) {
    this.goods_submitForm();
  }

  //品牌提交
  _submitForm(){
    if(!this.selRow.brand_code){
      this.service.message.error('请填写品牌编码');
      return false;
    }
    if(!this.selRow.brand_name){
      this.service.message.error('请选择品牌名称');
      return false;
    }
    this.service.post('/api/busiz/brand/save',this.selRow).then(success => {
        if(success.code==0){
          this.load();
          this.isVisible = false;
          this.myForm.reset();
          this.service.message.success(success.message);
        }else{
          this.service.message.error(success.message);
        }
    })
  }  
  //商品提交
  goods_submitForm(){
    if(!this.goods_selRow.tag_name){
      this.service.message.error('请填写商品名称');
      return false;
    }
    this.service.post('/api/busiz/goods/tag/save',{tag_name:this.goods_selRow.tag_name}).then(success => {
        if(success.code==0){
          this.goods_load();
          this.goods_isVisible = false;
          this.myForm.reset();
          this.service.message.success(success.message);
        }else{
          this.service.message.error(success.message);
        }
    })
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

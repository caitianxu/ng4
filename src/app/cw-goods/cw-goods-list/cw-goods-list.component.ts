import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-cw-goods-list',
  templateUrl: './cw-goods-list.component.html',
  styleUrls: ['./cw-goods-list.component.css']
})
export class CwGoodsListComponent implements OnInit {
  myForm: FormGroup;

  _loading : boolean = false;
  _allChecked : boolean = false;
  _indeterminate : boolean = false;
  isVisibleMiddle : boolean = false;
  formTitle : string;
  data : any = [];//商品列表
  selRow : any = {};//提交的对象
  classData : any = [];//商品分类列表
  tagData : any = [];//商品标签
  brandData : any = [];//品牌标签
  param : any = {
    pageNum:1,
    pageSize:10,
    goods_type:null,//商品名称
    tag_id:null,//标签id
    cat_id:null,//分类id
    enabled:null,//上架状态
    start_time:null,
    end_time:null
  }
  paramCol = {
    searchTime:[null,null]
  }

  constructor(public service: AppService) { }

  //文件上传
  fileUpload(info): void {
    if (info.file.response && info.file.response.code == 0) {
      this.selRow.goods_cover = info.file.response.data[0].url;
    }
  }

  // 项目列表
  load(reset?){
    if (reset == true) {
      this.param.pageNum = 1;
    }
    console.log(this.param)
    this._loading = true;
    this.service.post('/api/busiz/goods/getlist',this.param).then(success => {
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

  get_class(){
    this.service.post('/api/busiz/goods/cat/tree').then(success => {
      if(success.code==0){
        this.classData = success.data;
      }else{
        console.log('商品分类····error')
        this.service.message.error(success.message);
      }
    })
  }
  get_tag(){
    this.service.post('/api/busiz/goods/tag/list',{pageNum:1,pageSize:1000}).then(success => {
      if(success.code==0){
        this.tagData = success.data.rows;
      }else{
        
        this.service.message.error(success.message);
      }
    })
  }
  get_brand(){
    this.service.post('/api/busiz/brand/brandlist').then(success => {
      if(success.code==0){
        this.brandData = success.data;
      }else{
        
        this.service.message.error(success.message);
      }
    })
  }

  get_tagName(id ?){
    let name = '';
    if(id){
      for(let i in this.brandData){
          if(this.brandData[i].brand_id == id){
            name += this.brandData[i].brand_name;
          }
      }
    }
    return name;
  }

  //查询
  reload(reset?){
    if(reset){

    }

  }
  // 重置
  resetForm(){
    
  }


  //关闭弹窗
  handleCancelMiddle($event) {
    this.isVisibleMiddle = false;
    this.myForm.reset();
  }

  //确定
  handleOkMiddle($event) {
    this._submitForm();
  }

  // 新增操作
  add(){
    console.log(this.selRow.goods_type)
    this.isVisibleMiddle = true;
    this.selRow.real_price = 0;
    if(this.selRow.goods_type==1){
      this.formTitle = '新增纸质图书'
    }else if(this.selRow.goods_type==2){
      this.formTitle = '新增音视频'
    }else{
      this.formTitle = '新增电子书'
    }
  }
  // 修改操作
  edit(data){
    console.log(data)
    this.selRow = {};
    this.isVisibleMiddle = true;
    if(this.selRow.goods_type==1){
      this.formTitle = '新增纸质图书'
    }else if(this.selRow.goods_type==2){
      this.formTitle = '新增音视频'
    }else{
      this.formTitle = '新增电子书'
    }
    for(let i in data){
      this.selRow[i] = data[i];
    }
    this.selRow.goods_tag_ids = this.selRow.tag_ids;

  }
  // 删除操作
  del(data){
    this.service.post('/api/busiz/goods/del',{ids:[data.goods_id]}).then(success => {
      if(success.code==0){
        this.load();
        this.service.message.success(success.message);
      }else{
        this.service.message.error(success.message);
      }
  })
  }

  //上架状态
  _enabled(data ?){
    let status = data.enabled == 1 ? 2 : 1 ;
    this.service.post('/api/busiz/goods/shelves',{ids:[data.goods_id],enabled:status}).then(success => {
      if(success.code==0){
        this.load();
        this.service.message.success(success.message);
      }else{
        this.service.message.error(success.message);
      }
  })
  }


  // 折后价
  sum(){
    setTimeout(_=>{
      this.selRow.real_price = (parseInt(this.selRow.price))*(parseInt(this.selRow.discount))*0.1
    },50)
  }
  //提交
  _submitForm(){
    console.log(this.selRow);
    if(this.selRow.parent){
      let class_id = this.selRow.parent[this.selRow.parent.length-1];
      if(typeof(class_id)=='object'){
        this.selRow.goods_cat_id = parseInt(class_id.cat_id);
      }else{
        this.selRow.goods_cat_id = parseInt(class_id) == null ? '' : parseInt(class_id);
      }
    }
    this.selRow.goods_tag_ids = this.selRow.goods_tag_ids.split(",");
    // this.selRow.goods_cat_id = parseInt(this.selRow.parent[this.selRow.parent.length-1]);
    this.service.post('/api/busiz/goods/save',this.selRow).then(success => {
        if(success.code==0){
          this.load();
          this.isVisibleMiddle = false;
          this.myForm.reset();
          this.service.message.success(success.message);
        }else{
          this.service.message.error(success.message);
        }
    })
  } 

  ngOnInit() {
    this.myForm = this.service.fb.group({
      goods_name: false,
      goods_cat_id:false,
      goods_tag_ids:false,
      key_word:false,
      book_isbn:false,
      publisher:false,
      author_name:false,
      publish_date:false,
      price:false,
      discount:false,
      real_price:false,
      inventory:false,
      limit_buy:false,
      remark:false
    })


    // 加载商品列表
    this.load();

    //加载商品分类
    this.get_class();
    // 加载商品标签
    this.get_tag();
    // 加载品牌列表
    this.get_brand();
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

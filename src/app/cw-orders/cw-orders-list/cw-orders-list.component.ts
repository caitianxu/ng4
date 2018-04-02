import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-cw-orders-list',
  templateUrl: './cw-orders-list.component.html',
  styleUrls: ['./cw-orders-list.component.css']
})
export class CwOrdersListComponent implements OnInit {
  myForm: FormGroup;
  _allChecked : boolean = false;
  _indeterminate : boolean = false;
  param : any = {
    pageNum:1,
    pageSize:10,
    searchTime:[null,null],
    start_time:null,
    end_time:null,
    order_status:null
  }
  orderList : any = [
    {id:0,name:"取消订单"},
    {id:1,name:"待付款"},
    {id:2,name:"待发货"},
    {id:3,name:"待收货"},
    {id:4,name:"交易完成"}
  ]
  orderLists =["取消订单","待付款","待发货","待收货","交易完成"];
  _loading : boolean = false;
  data : any = [];

  seetingList : boolean = false;//配置显示 
  seeting_res : boolean = false;//是否更新配置
  settingRow : any = {};//配置对象
  seeOrder : boolean = false;//订单详情
  editRow : any = null;
  seeData : any = {};//详情对象
  orderData : any = [];//订单商品列表
  sendNow : any = {};//订单发货对象
  sendList : boolean = false;
  Row : any = {};
  enditList = null;
  constructor(public service: AppService) { }

  load(reset?){
    if (reset == true) {
      this.param.pageNum = 1;
    }
    console.log(this.param)
    this._loading = true;
    this.service.post('/api/busiz/order/list',this.param).then(success => {
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

  // 查询
  reload(rest ?){
    if(rest){
      this.param.start_time = this.param.searchTime[0];
      this.param.pageNum = 1;
    }
    if(this.param.searchTime.length>0){
      this.param.start_time = this.timeOut(this.param.searchTime[0]);
      this.param.end_time = this.timeOut(this.param.searchTime[1]);
    }
    this.load();
  }
  // 重置
  resetForm(){
    this.param = {
      pageSize:10,
      pageNum:1,
      searchText:null
    }
    this.param.searchTime = [];
    this.load();
  }

  ngOnInit() {
    this.myForm = this.service.fb.group({
      money_off:false,
      province_in:false,
      province_out:false,
      one_more:false,
      express:false,
      express_num:false
    })

    //加载交易列表
    this.load();

    //加载交易配置
    this.get_seeting();
  }

  //关闭弹窗
  Cancel($event) {
    this.seetingList = false;
    this.enditList = null;
    this.seeting_res = false;
    this.seeOrder = false;
    this.editRow = null;
    this.sendList = false;
    this.myForm.reset();
  }
  
  //确定
  Ok($event) {
    this._submit_seeting();
  }

  // 更新物流--打开页面
  edit(data){
    this.editRow = data.order_id;
  }
  //取消 
  cancel(data) {
    this.editRow = null;
  }

  save(data){
   if(!data.express){
      this.service.message.warning('请填快递公司');
      return false;
    }
    if(!data.express_num){
      this.service.message.warning('请填快递单号');
      return false;
    }
    this.service.post('/api/busiz/order/send',data).then(success => {
          if(success.code==0){
            this.load();
            this.editRow = null;
            this.myForm.reset();
            this.service.message.success(success.message);
          }else{
            this.service.message.error(success.message);
          }
    })
  }


  // 发货
  _send(data){
    this.sendList = true;
    for(let i in data){
      this.sendNow[i] = data[i]
    }
    this.service.post('/api/busiz/order/goods/list',{order_id:this.sendNow.order_id}).then(success => {
      if(success.code==0){
        this.orderData = success.data;
      }else{
        this.orderData = [];
        this.service.message.error(success.message);
      }
    })
  }

  //发货保存
  sendOk($event){
    this.service.post('/api/busiz/order/send',this.sendNow).then(success => {
      if(success.code==0){
        this.load();
        this.sendList = false;
            this.myForm.reset();
            this.service.message.success(success.message);
      }else{
        this.service.message.error(success.message);
      }
    })
  }

  //修改订单状态
  _edit(id,status){
    this.service.post('/api/busiz/order/status',{order_id:id,order_status:status}).then(success => {
      if(success.code==0){
        this.load();
        this.service.message.success(success.message);
      }else{
        this.service.message.error(success.message);
      }
    })

  } 
  // // 订单更新
  // sendOk($event){
  //   if(!this.sendData.express){
  //     this.service.message.warning('请填快递公司');
  //     return false;
  //   }
  //   if(!this.sendData.express_num){
  //     this.service.message.warning('请填快递单号');
  //     return false;
  //   }
  //   this.service.post('/api/busiz/order/send',this.sendData).then(success => {
  //         if(success.code==0){
  //           this.load();
  //           this.sendOrder = false;
  //           this.myForm.reset();
  //           this.service.message.success(success.message);
  //         }else{
  //           this.service.message.error(success.message);
  //         }
  //   })
  // }


  // 更新运费配置
  seetingRes(){
    this.enditList = this.settingRow.id;
    this.seeting_res = true;
    console.log(this.settingRow)
  }
  //提交
  _submit_seeting(){
    if(!this.Row.money_off){
      this.service.message.warning('请填写免运费价格');
      return false;
    }
    if(!this.Row.peovince_in){
      this.service.message.warning('请填写省内运费');
      return false;
    }
    if(!this.Row.province_out){
      this.service.message.warning('请填写省外运费');
      return false;
    }
    if(!this.Row.one_more){
      this.service.message.warning('请填写加件运费');
      return false;
    }
    this.service.post('/api/busiz/order/express/setting',this.Row).then(success => {
      if(success.code==0){
        this.seetingList = false;
        this.enditList = null;
        this.seeting_res = false;
        this.myForm.reset();
        this.get_seeting();
        this.service.message.success(success.message);
      }else{
        this.service.message.error(success.message);
      }
    })
  }

  get_seeting(){
    this.service.post('/api/busiz/order/express',this.param).then(success => {
      if(success.code==0){
        this.settingRow = success.data;
      }else{
        this.service.message.error(success.message);
      }
    })
  }

  //交易配置---页面打开
  _setting(){
    this.seetingList = true;
    for(let i in this.settingRow){
      this.Row[i] = this.settingRow[i];
    }
  }

  
  // 订单页面
  _see(data){
    this.seeOrder = true;
    for(let i in data){
      this.seeData[i] = data[i];
    }
    console.log(this.editRow);
    console.log(this.seeData);
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

  timeOut(d){
    let m = new Date(d);
    let M,D,H,mm,ss;
      M = (m.getMonth() + 1)<10 ? '0'+(m.getMonth() + 1) : (m.getMonth() + 1);
      D = m.getDate() <10 ? '0'+m.getDate() : m.getDate();
    //   H = m.getHours() <10 ? '0'+m.getHours() : m.getHours();
    //   mm = m.getMinutes() <10 ? '0'+m.getMinutes() : m.getMinutes();
    //   ss = m.getSeconds() <10 ? '0'+m.getSeconds() : m.getSeconds();
    // return m.getFullYear() + '-' + M + '-' + D + ' ' + H + ':' + mm + ':' + ss; 
    return m.getFullYear() + '-' + M + '-' + D ;
  }

}

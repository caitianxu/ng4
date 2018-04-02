import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-cw-adv-class',
  templateUrl: './cw-adv-class.component.html',
  styleUrls: ['./cw-adv-class.component.css']
})
export class CwAdvClassComponent implements OnInit {

  _allChecked = false;
  _indeterminate = false;
  tableData: any = []; //数据列表
  param: any = {
    total: 0,
    pageSize: 10,
    pageNum: 1
  };
  _loading: boolean = true;
  // 实例化一个对象
  constructor(public service: AppService) { }

  //表单
  myForm: any;
  formBean: any = {
    adv_cat_name: null,
    order_weight: null,
    adv_cat_remark: null,
    adv_cat_code: null,
    adv_cat_id: null,
    create_time: null,
    is_delete: null,
    update_time: null,
    org_id:this.service.loginUserInfo ? this.service.loginUserInfo.org_id : null
  };
  ngOnInit() {
    this.reload();
    this.myForm = this.service.fb.group({
      adv_cat_name: [null, [this.service.validators.required]],
      order_weight: [false],
      adv_cat_remark: [false],
      adv_cat_code: [false],
      adv_cat_id: [false],
      create_time: [false],
      is_delete: [false],
      update_time: [false],
    })
  }
  //表单
  isVisibleMiddle: boolean = false;
  formTitle: string;
  //打开
  showModalMiddle(bean?: any) {
    if (bean) {
      for (let i in bean) {
        this.formBean[i] = bean[i];
      }
      this.formTitle = "修改广告分类";
    }
    else {
      this.formTitle = "新增广告分类";
    }
    this.isVisibleMiddle = true;
    console.log(this.formBean)
    
  };
  //关闭
  handleCancelMiddle($event) {
    this.isVisibleMiddle = false;
    this.myForm.reset();
  }
  //确定
  handleOkMiddle($event) {
    this._submitForm();
  }
  //提交
  _submitForm() {
    for (const i in this.myForm.controls) {
      this.myForm.controls[i].markAsDirty();
    }
    if (this.myForm.valid) {
      this.service.post('/api/system/advcat/json/updateadvcat', this.formBean).then(success => {
        if (success.code == 0) {
          this.isVisibleMiddle = false;
          this.myForm.reset();
          this.reload();
        }
        else {
          this.service.message.error(success.message);
        }
      })
    }
  }
 
  //删除
  delRows() {
    if (this.tableData.filter(value => value.checked).length < 1) {
      this.service.message.warning('你没有选择需要删除的数据内容!');
    }
    else {
      let ids = [];
      this.tableData.filter(value => value.checked).forEach(item => { ids.push(item.adv_cat_id) })
      this.service.post('/api/system/advcat/json/deleteadvcats', {
        ids: ids, mark: 'del'
      }).then(success => {
        if (success.code == 0) {
          this.reload();
        }
        else {
          this.service.message.error(success.message);
        }
      })
    }
  }
  _delete(id){
    this.service.post('/api/system/advcat/json/deleteadvcats', {
      ids: [id], mark: 'del'
    }).then(success => {
      if (success.code == 0) {
        this.reload();
      }
      else {
        this.service.message.error(success.message);
      }
    })
  }

  //重新查询
  reload(reset?) {
    if (reset == true) {
      this.param.pageNum = 1;
    }
    this._loading = true;
    this.service.post('/api/system/advcat/json/advcatlist', this.param).then(success => {
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

  //全选
  _checkAll(value) {
    if (value) {
      this.tableData.forEach(data => {
        if (!data.disabled) {
          data.checked = true;
        }
      });
    } else {
      this.tableData.forEach(data => data.checked = false);
    }
    this._refreshStatus();
  }
  _refreshStatus() {
    const allChecked = this.tableData.every(value => value.disabled || value.checked);
    const allUnChecked = this.tableData.every(value => value.disabled || !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
  }
}

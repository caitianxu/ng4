import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-cw-adv-list',
  templateUrl: './cw-adv-list.component.html',
  styleUrls: ['./cw-adv-list.component.css']
})
export class CwAdvListComponent implements OnInit {

  _allChecked = false;
  _indeterminate = false;
  tableData: any = []; //数据列表
  param: any = {
    searchText: null,
    sort_name: null,
    sort_rule: null,
    total: 0,
    pageSize: 10,
    pageNum: 1
  };
  paramCol: any = {
    dept_id: null,
    state: null,
    date: null,
    searchText: null
  }
  sortMap = {
    create_time: null,
    enabled: null,
  };
  advClassRemark: string;
  _loading: boolean = true;
  // 实例化一个对象
  constructor(public service: AppService) { }

  //表单
  myForm: any;
  formBean: any = {
    role_id: null,
    adv_name: null,
    adv_cat_id: null,
    remark: null
  };
  //文件上传
  fileUpload(info): void {
    if (info.file.response && info.file.response.code == 0) {
      this.formBean.adv_img = info.file.response.data[0].url;
    }
  }
  //广告分类下拉
  advClassList: any = [];
  ngOnInit() {
    //获取广告分类
    this.service.post('/api/system/advcat/json/advcatlist', { pageNum: 1, pageSize: 1000 }).then(success => {
      if (success.code == 0) {
        this.advClassList = success.data.rows;
      }
    })

    this.reload();
    this.myForm = this.service.fb.group({
      adv_name: [null, [this.service.validators.required]],
      adv_cat_id: [null, [this.service.validators.required]],
      remark: [false],
      adv_url: [false]
    })
  }
  //表单
  isVisibleMiddle: boolean = false;
  formTitle: string;
  //打开
  showModalMiddle(bean?: any) {
    this.formBean = {};
    if (bean) {
      for (let i in bean) {
        this.formBean[i] = bean[i];
      }
      this.formTitle = "修改广告";
    }
    else {
      this.formTitle = "新增广告";
    }
    this.isVisibleMiddle = true;
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
      this.service.post('/api/system/adv/json/updateadv', this.formBean).then(success => {
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
      this.tableData.filter(value => value.checked).forEach(item => { ids.push(item.adv_id) })
      this.service.post('/api/system/adv/json/deleteadvs', {
        adv_ids: ids, mark: 'del'
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
  _delete(id) {
    this.service.post('/api/system/adv/json/deleteadvs', {
      adv_ids: [id], mark: 'del'
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
    this.service.post('/api/system/adv/json/getadvlist', this.param).then(success => {
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
  resetForm() {
    this.param.adv_cat_id = null;
    this.param.adv_cat_nmae = null;
    this.param.searchText = "";
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
  //排序
  sort(name, value) {
    if (value) {
      this.param.sort_name = name;
      this.param.sort_rule = value == 'ascend' ? 'asc' : 'desc';
    }
    else {
      this.param.sort_name = null;
      this.param.sort_rule = null;
    }
    Object.keys(this.sortMap).forEach(key => {
      if (key !== name) {
        this.sortMap[key] = null;
      } else {
        this.sortMap[key] = value;
      }
    });
    this.reload();
  }
  //启用停用
  _enabled(data) {
    if (this.service.validataAction('cw_adv_list_enable')) {
      this.service.post('/api/system/adv/json/updateenable', {
        adv_id: data.adv_id,
      }).then(success => {
        if (success.code == 0) {
          this.reload();
        } else {
          this.service.message.error(success.message);
        }
      })
    }

  }
  getAdvClassRemark() {
    setTimeout(_ => {
      this.advClassList.forEach(element => {
        if (element.adv_cat_id == this.formBean.adv_cat_id) {
          this.advClassRemark = element.adv_cat_remark
        }
      })
    }, 50)
  }
}

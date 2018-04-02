import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cw-prj-list',
  templateUrl: './cw-prj-list.component.html',
  styleUrls: ['./cw-prj-list.component.css']
})
export class CwPrjListComponent implements OnInit {
  
  data: any = [];
  listData: any = [];
  _allChecked: boolean = false;
  _indeterminate: boolean = false;
  _loading: boolean = true;
  editRow: any = null;
  isVisibleMiddle: boolean = false;
  isShow: boolean = false;
  switchValue: boolean = false;
  formTitle: string;
  myForm: FormGroup;
  param: any = {
    pageSize: 10,
    pageNum: 1,
    searchText: null,
    project_cat_id: null
  }
  paramCol: any = {
    searchTime: []
  }
  selRow: any = {};
  constructor(public service: AppService) { }


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

  //关闭弹窗
  handleCancelMiddle($event) {
    this.isVisibleMiddle = false;
    this.isShow = false;
    this.myForm.reset();
  }

  //确定
  handleOkMiddle($event) {
    this._submitForm();
  }


  ngOnInit() {
    this.myForm = this.service.fb.group({
      test: false,
      project_name: false,
      project_cat_id: false,
      org: false,
      org_address: false,
      link_man: false,
      link_phone: false,
      link_email: false,
      begin_time: false,
      end_time: false,
      remark: false
    })

    //加载列表
    this.load();

    this.get_list();
  }


  // 项目列表
  load(reset?) {
    if (reset == true) {
      this.param.pageNum = 1;
    }
    this._loading = true;
    this.service.post('/api/busiz/cooproject/getlist', this.param).then(success => {
      this._loading = false;
      if (success.code == 0) {
        this.data = success.data.rows;
        this.param.total = success.data.total;
      } else {
        this.data = [];
        this.param.total = 0;
        this.service.message.error(success.message);
      }
    })
  }

  //文件上传
  fileUpload(info): void {
    if (info.file.response && info.file.response.code == 0) {
      this.selRow.icon = info.file.response.data[0].url;
    }
  }

  //项目分类列表
  get_list() {
    this.service.post('/api/busiz/cat/Cooperation/gettree').then(success => {
      if (success.code == 0) {
        this.listData = this.data = [{
          cat_id: 0,
          cat_pid: 0,
          cat_name: '根节点',
          children: success.data
        }]
      } else {
        this.service.message.error(success.message);
      }
    })
  }

  // 查询
  reload(reset?: any) {

    if (reset == true) {
      this.param.pageNum = 1;
    }

    console.log(this.paramCol)
    if (this.paramCol.searchTime.length > 0) {

      this.param.begin_time = this.timeout(this.paramCol.searchTime[0]);
      this.param.end_time = this.timeout(this.paramCol.searchTime[1]);
    }

    if (this.param.parent) {
      let class_id = this.param.parent[this.param.parent.length - 1];
      if (typeof (class_id) == 'object') {
        this.param.project_cat_id = parseInt(class_id.cat_id);
      } else {
        this.param.project_cat_id = parseInt(class_id) == null ? '' : parseInt(class_id);
      }
    }

    console.log(this.param)
    this.load();
  }
  // 重置
  resetForm() {
    this.param = {
      pageSize: 10,
      pageNum: 1,
      searchText: null
    }
    this.paramCol.searchTime = [];
    this.load();
  }


  //新增
  add() {
    this.selRow = {};
    this.formTitle = "新增";
    this.isVisibleMiddle = true;


  }

  //修改
  edit(data) {
    console.log(data);
    this.selRow = {};
    this.formTitle = "修改"
    this.isVisibleMiddle = true;

    for (let i in data) {
      this.selRow[i] = data[i]
    }

  }

  // 查看
  show(data) {
    this.selRow = {};
    this.formTitle = "查看页面"
    this.isShow = true;
    for (let i in data) {
      this.selRow[i] = data[i]
    }
    console.log(data)
  }

  //删除
  del(data) {
    this.service.post('/api/busiz/cooproject/del', { ids: [data.project_id] }).then(success => {
      if (success.code == 0) {
        this.load();
        this.service.message.success(success.message);
      }
    })
  }
  // 一键删除
  delRows() {
    let arr = [];
    this.data.forEach(data => {
      if (data.checked) {
        arr.push(data.project_id)
      }
    })
    this.service.post('/api/busiz/cooproject/del', { ids: arr }).then(success => {
      if (success.code == 0) {
        this.load();
        this.service.message.success(success.message);
      }
    })
  }

  // 启用
  _enabled(data) {
    this.service.post('/api/busiz/cooproject/del', { project_id: data.project_id }).then(success => {
      if (success.code == 0) {
        this.load();
        this.service.message.success(success.message);
      }
    })
  }


  // 提交
  _submitForm() {
    console.log(this.selRow)
    this.selRow.project_cat_id = parseInt(this.selRow.parent[this.selRow.parent.length - 1])
    this.service.post('/api/busiz/cooproject/save', this.selRow).then(success => {
      if (success.code == 0) {
        this.isVisibleMiddle = false;
        this.myForm.reset();
        this.load();
        this.service.message.success(success.message);
      } else {
        this.service.message.error(success.message);
      }
    })
  }

  timeout(d) {
    let m = new Date(d);
    let M, D, H, mm, ss;
    M = (m.getMonth() + 1) < 10 ? '0' + (m.getMonth() + 1) : (m.getMonth() + 1);
    D = m.getDate() < 10 ? '0' + m.getDate() : m.getDate();
    //   H = m.getHours() <10 ? '0'+m.getHours() : m.getHours();
    //   mm = m.getMinutes() <10 ? '0'+m.getMinutes() : m.getMinutes();
    //   ss = m.getSeconds() <10 ? '0'+m.getSeconds() : m.getSeconds();
    // return m.getFullYear() + '-' + M + '-' + D + ' ' + H + ':' + mm + ':' + ss; 
    return m.getFullYear() + '-' + M + '-' + D;
  }




}

import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild("dept_idss") dept_idss;
  @ViewChild("searchDeptIds") searchDeptIds;
  param: any = {
    dept_id: null,
    enabled: null,
    searchText: null,
    sort_name: null,
    sort_rule: null,
    total: 0,
    pageSize: 10,
    pageNum: 1
  };
  paramCol: any = {
    dept_id: null,
    enabled: null,
    searchText: null,
    org_id: this.service.loginUserInfo ? this.service.loginUserInfo.org_id : null
  }
  userState: any = []; //用户状态
  roleList: any = []; //角色
  orgList: any = [];//机构
  // 实例化一个对象
  constructor(public service: AppService) { }

  ngOnInit() {
    //获取机构
    this.service.post('/api/system/organization/getList', {
      pageNum: 1,
      pageSize: 1000,
      enabled: 1,
    }).then(success => {
      this.orgList = success.data.rows;
    })
    //获取角色
    this.service.post('/api/system/role/list', {
      pageNum: 1,
      pageSize: 1000,
      org_id: this.paramCol.org_id
    }).then(success => {
      this.roleList = success.data.rows;
    })

    this.userState = [{
      id: 1,
      name: '启用'
    }, {
      id: 2,
      name: '停用'
    }];
    this.reload();

    this.myForm = this.service.fb.group({
      user_name: [null, [this.service.validators.required]],
      user_pwd: [null, [this.service.validators.required]],
      role_id: [null, [this.service.validators.required]],
      dept_idss: [null, [this.service.validators.required]],
      user_real_name: false,
      icon: [false],
      user_id: [false],
      email: [false],
      phone: [false]
    });
  }
  //加载部门
  loadDept(e: { option: any, index: number, resolve: Function, reject: Function }): void {
    if (e.index === -1) {
      this.service.post('/api/system/department/getList', {
        code: null
      }).then(success => {
        this.service._toisLeaf(success.data);
        e.resolve(success.data);
      })
      return;
    }
  }

  /**************************表单部分*************************/
  myForm: any;
  formBean: any = {
    user_name: null,
    user_pwd: null,
    user_real_name: null,
    dept_idss: null,
    role_idss: null,
    icon: null,
    user_id: null,
    email: null,
    phone: null
  };
  //表单提交
  _submitForm() {
    for (const i in this.myForm.controls) {
      this.myForm.controls[i].markAsDirty();
    }
    if (this.myForm.valid) {
      this.formBean.dept_ids_array = [];
      this.formBean.dept_idss.forEach(element => {
        if (typeof (element) == 'object') {
          this.formBean.dept_ids_array.push(element.dept_id);
        }
        else {
          this.formBean.dept_ids_array.push(element);
        }
      });
      this.formBean.role_names = [];
      this.formBean.role_ids_array = [];
      this.formBean.role_idss.forEach(element => {
        if (typeof (element) == 'object') {
          this.formBean.role_ids_array.push(element.role_id);
          this.formBean.role_names.push(element.role_name);
        }
        else {
          this.formBean.role_ids_array.push(element);
          this.roleList.forEach(el => {
            if (element == el.role_id) this.formBean.role_names.push(el.role_name);
          })
        }
      });
      this.formBean.role_names = this.formBean.role_names.toString();
      this.service.post('/api/system/user/save', this.formBean).then(success => {
        if (success.code == 0) {
          this.isVisibleMiddle = false;
          this.formClear();
          this.reload();
        }
        else {
          this.service.message.error(success.message);
        }
      })
    }
  }
  //文件上传
  fileUpload(info): void {
    if (info.file.response && info.file.response.code == 0) {
      this.formBean.icon = info.file.response.data[0].url;
    }
  }
  //表单
  isVisibleMiddle: boolean = false;
  formTitle: string;
  //打开
  showModalMiddle(bean?: any) {
    this.formBean = {}
    if (bean) {
      for (let i in bean) {
        this.formBean[i] = bean[i];
      }
      //部门
      if (this.formBean.dept_ids_array) {
        this.formBean.dept_idss = [];
        this.formBean.dept_ids_array.forEach((element, index) => {
          this.formBean.dept_idss.push({ dept_id: element, dept_name: this.formBean.dept_names.split(',')[index] })
        });
      }
      //角色
      if (this.formBean.role_ids_array) {
        this.formBean.role_idss = this.formBean.role_ids_array;
      }
      this.formBean.user_pwd = "123456";
      this.formTitle = "修改用户";
    }
    else {
      this.formTitle = "新增用户";
      this.formBean.org_id = this.paramCol.org_id
    }
    this.isVisibleMiddle = true;
  };
  //删除
  _delete(id) {
    this.service.post('/api/system/user/delete', { ids: [id] }).then(success => {
      if (success.code == 0) {
        this.reload();
      }
      else {
        this.service.message.error(success.message);
      }
    })
  }

  //关闭
  handleCancelMiddle($event) {
    this.isVisibleMiddle = false;
    this.formClear();
  }
  //确定
  handleOkMiddle($event) {
    this._submitForm();
  }
  formClear() {
    this.myForm.reset();
    this.dept_idss._lastValue = [];
  }
  /**************************表单部分*************************/

  /**************************表格部分*************************/
  _allChecked = false; //全选
  _indeterminate = false; //半选
  tableData: any = []; //数据列表
  sortMap = { //允许排序的字段
    user_real_name: null,
    user_name: null
  };
  _loading: boolean = true; //loading 状态
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
  //半选
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
  //查询列表数据
  reload(reset?: any) {
    if (reset == true) {
      this.param.pageNum = 1;
      this.param.searchText = this.paramCol.searchText;
      this.param.enabled = this.paramCol.enabled;
      this.param.dept_id = this.paramCol.dept_id && this.paramCol.dept_id.length != 0 ? this.paramCol.dept_id[this.paramCol.dept_id.length - 1].toString() : null;
      this.param.org_id = this.paramCol.org_id;
    }
    this._loading = true;
    this.service.post('/api/system/user/list', this.param).then(success => {
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

  //设置状态
  set_state(item) {
    if (item) {
      this.param.state_id = item.id;
      this.param.state_name = item.name;
    }
    else {
      this.param.state_id = null;
      this.param.state_name = '全部';
    }
  }
  //清空form
  resetForm() {
    this.paramCol.searchText = null;
    this.paramCol.dept_id = [];
    this.paramCol.enabled = null;
    this.searchDeptIds._lastValue = []
  }
  //启用、停用
  enabledUser(data?: any) {
    if (data) {
      this._enabled([data.user_id], data.enabled == 1 ? 2 : 1);
    } else {
      let ids = [];
      let bool = true;
      this.tableData.forEach(element => {
        if (element.checked) {
          ids.push(element.user_id)
          if (element.enabled == 2)
            bool = false;
        };
      });
      if (ids.length == 0) {
        this.service.message.warning('请选择你要启用停用的数据!');
        return false;
      }
      this._enabled(ids, (bool ? 2 : 1));
    }
  }
  _enabled(ids, enabled) {
    this.service.post('/api/system/user/enabled', { ids: ids, enabled: enabled }).then(success => {
      if (success.code == 0) {
        this.reload();
      }
      else {
        this.service.message.error(success.message);
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {


  param: any = {
    mod_id: null,
    searchText: null,
    sort_name: null,
    sort_rule: null,
    total: 0,
    pageSize: 10,
    pageNum: 1
  };
  paramCol: any = {
    searchText: null
  }
  sortMap = {
    code: null,
    message: null,
    update_time: null
  };
  _loading: boolean = true;
  _allChecked = false;
  _indeterminate = false;
  tableData: any = []; //数据列表
  //构造
  constructor(public service: AppService) { }
  //开始加载
  ngOnInit() {
    this.getMOduleList();
    this.reload();
    this.myForm = this.service.fb.group({
      module_name: [null, [this.service.validators.required]],
      module_short_name: [null, [this.service.validators.required]]
    })
  }
  //文档初始化
  ngAfterViewInit() {
  }
  //离开页面
  ngOnDestroy() {
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
  //重新查询
  reload(reset?: any) {
    if (reset == true) {
      this.param.pageNum = 1;
      this.param.searchText = this.paramCol.searchText;
    }
    this._loading = true;
    this.service.post('/api/system/msg/list', this.param).then(success => {
      this._loading = false;
      this.tableData = success.data.rows;
      this.param.total = success.data.total;
    })
  }

  //设置模块搜索
  set_mod_id(md) {
    this.param.mod_id = this.param.mod_id == md.mod_id ? null : md.mod_id;
    this.reload();
  }
  modeList: any = null;
  //获取模块列表
  getMOduleList() {
    this.service.post('/api/system/module/list', {}).then(success => {
      this.modeList = success.data;
    })
  }
  editModelBean: any = {
    module_name: null,
    module_short_name: null,
    isVisibleMiddle: false
  };
  myForm: any;
  //修改模块
  _editModel(data) {
    for (let i in data) {
      this.editModelBean[i] = data[i];
    }
    this.editModelBean.isVisibleMiddle = true;
  }
  //新增模块
  _addModel() {
    this.editModelBean = {
      module_name: null,
      module_short_name: null,
      isVisibleMiddle: true
    };
  }
  //删除模块
  _delModel(item,$event) {
    this.service.post('/api/system/module/del', {
      ids: [item.mod_id]
    }).then(success => {
      if (success.code == 0) {
        this.getMOduleList();
      }
      else {
        this.service.message.error(success.message);
      }
    })
  }
  //取消
  handleCancelMiddle(e?: any) {
    this.editModelBean.isVisibleMiddle = false;
  }
  //确定
  handleOkMiddle(e?: any) {
    for (const i in this.myForm.controls) {
      this.myForm.controls[i].markAsDirty();
    }
    if (this.myForm.valid) {
      this.service.post('/api/system/module/save', this.editModelBean).then(success => {
        if (success.code == 0) {
          this.editModelBean.isVisibleMiddle = false;
          this.myForm.reset();
          this.getMOduleList();
        }
        else {
          this.service.message.error(success.message);
        }
      })
    }
  }

  edieMessage = {};
  //新增消息
  _addMessage() {
    this.edieMessage = {
      msg_id: null,
      mod_id: null,
      code: null,
      message: null
    }
    this.tableData.unshift(this.edieMessage);
  }
  //消息编辑取消
  _cancel(data) {
    if (!data.msg_id) {
      this.tableData.splice(this.tableData.indexOf(data), 1);
    }
    this.edieMessage = {};
  }
  //编辑
  showModalMiddle(data) {
    this.edieMessage = [];
    for (let i in data) {
      this.edieMessage[i] = data[i];
    }
    this.modeList.forEach(element => {
      if (element.mod_id == data.mod_id)
        data.selectedOption = element;
    });
  }
  //保存消息
  _saveRow(data) {
    if (!data.selectedOption) {
      this.service.message.warning('请选择模块');
      return false;
    }
    else {
      data.mod_id = data.selectedOption.mod_id;
    }
    if (!data.code) {
      this.service.message.warning('请填写编号');
      return false;
    }
    if (!data.message) {
      this.service.message.warning('请填写消息内容');
      return false;
    }
    this.service.post('/api/system/msg/save', data).then(success => {
      if (success.code == 0) {
        this.edieMessage = {};
        this.service.message.success(success.message);
        this.reload();
      }
      else {
        this.service.message.error(success.message);
      }
    })
  }
  //删除数据
  delRows() {
    if (this.tableData.filter(value => value.checked).length < 1) {
      this.service.message.warning('你没有选择需要删除的数据内容!');
    }
    else {
      let ids = [];
      this.tableData.filter(value => value.checked).forEach(item => { ids.push(item.msg_id) })
      this.service.post('/api/system/msg/del', {
        ids: ids
      }).then(success => {
        if (success.code == 0) {
          this.service.message.success(success.message);
          this.reload();
        }
        else {
          this.service.message.error(success.message);
        }
      })
    }
  }

}

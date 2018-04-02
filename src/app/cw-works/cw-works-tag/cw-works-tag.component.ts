import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-cw-works-tag',
  templateUrl: './cw-works-tag.component.html',
  styleUrls: ['./cw-works-tag.component.css'],
  styles: [`
  :host ::ng-deep .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host ::ng-deep .vertical-center-modal .ant-modal {
    top: 0;
  }
` ]
})
export class CwWorksTagComponent implements OnInit {
  param: any = {
    searchText: null,
    pageNum: 1,
    pageSize: 10,
    total: 0,
    pages: 0
  }
  paramCol: any = {
    searchText: null
  }
  _allChecked = false; //全选
  _indeterminate = false; //半选
  tableData = [];
  _loading: boolean = false;
  isVisible: boolean = false;
  formBean: any = {};
  isConfirmLoading: boolean = false;
  constructor(public service: AppService) { }

  ngOnInit() {
    this._reload();
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
  //半选
  _refreshStatus() {
    const allChecked = this.tableData.every(value => value.disabled || value.checked);
    const allUnChecked = this.tableData.every(value => value.disabled || !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
  }
  //刷新
  _reload(bool?: any) {
    this._loading = true;
    if (bool) {
      this.param.pageNum = 1;
      this.param.searchText = this.paramCol.searchText;
    }
    this.service.post('/api/busiz/works/tag/list', this.param).then(success => {
      this.tableData = success.data.rows;
      this.param.pages = success.data.pages;
      this.param.total = success.data.total;
      this._loading = false;
    })
  }
  //新增
  _cwResTagAdd() {
    this.isVisible = true;
    this.formBean = {};
  }
  //关闭
  handleCancel(event?: any) {
    this.isVisible = false;
  }
  //提交
  handleOk(event?: any) {
    if (!this.formBean.tag_name) {
      this.service.message.warning('请填写标签名称');
      return false;
    }
    this.isConfirmLoading = true;
    this.service.post('/api/busiz/works/tag/save', this.formBean).then(success => {
      this.isConfirmLoading = false;
      if (success.code == 0) {
        this.isVisible = false;
        this._reload(true);
      }
      else {
        this.service.message.error(success.message);
      }
    })
  }
  //修改
  _editRow(row) {
    for (let i in row) {
      this.formBean[i] = row[i];
    }
    this.isVisible = true;
  }
  //删除
  _delRows() {
    if (this.tableData.filter(value => value.checked).length < 1) {
      this.service.message.warning('你没有选择需要删除的数据内容!');
    }
    else {
      let ids = [];
      this.tableData.filter(value => value.checked).forEach(item => { ids.push(item.tag_id) });
      this.service.post('/api/busiz/works/tag/del', {
        ids: ids
      }).then(success => {
        if (success.code == 0) {
          this._reload(true);
        }
        else {
          this.service.message.error(success.message);
        }
      })
    }
  }
}

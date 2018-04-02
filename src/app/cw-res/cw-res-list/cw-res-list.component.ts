import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cw-res-list',
  templateUrl: './cw-res-list.component.html',
  styleUrls: ['./cw-res-list.component.css']
})
export class CwResListComponent implements OnInit {

  param = {
    searchText: null,
    pageNum: 1,
    pageSize: 10,
    searchTime: null,
    res_class_id: null,
    res_tag_id: null,
    res_type: null,
    total: 0,
    pages: 0
  }
  paramCol = {
    searchText: null,
    searchTime: null,
    res_class_ids: null,
    res_cat_id: null,
    res_type: null
  }
  isCollapse: boolean = false;
  _loading: boolean = false;
  _upload: boolean = false;
  tableData: any = [];
  resClassList: any = []; //分类
  resTypeList: any = []; //标签

  _allChecked = false; //全选
  _indeterminate = false; //半选
  formBean: any = {
    res_id: null,
    res_name: null,
    res_cat_name: null
  };
  constructor(public service: AppService) { }

  ngOnInit() {
    this._getResClass();
    this._searchChange();
    this._reload();
  }
  //获取分类
  _getResClass() {
    this.service.post('/api/busiz/cat/list', {}).then(success => {
      this.service._toisLeaf(success.data);
      this.resClassList = success.data;
    })
  }
  //获取资源类型
  _searchChange(event?) {
    this.service.post('/api/busiz/res/type/getlist', {}).then(success => {
      this.resTypeList = success.data;
    })
  }
  //查询
  _reload(event?) {
    if (event) {
      for (let i in this.paramCol) {
        this.param[i] = this.paramCol[i];
      }
      if (this.paramCol['res_class_ids']) {
        this.param['res_cat_id'] = this.paramCol['res_class_ids'][this.paramCol['res_class_ids'].length - 1]
      }
      else {
        this.param['res_cat_id'] = null;
      }
      if (this.paramCol.searchTime) {
        this.param['upload_start'] = this.service.dateFormat(this.paramCol.searchTime[0], 'yyyy-MM-dd');
        this.param['upload_end'] = this.service.dateFormat(this.paramCol.searchTime[1], 'yyyy-MM-dd');
      }
      else {
        this.param['upload_start'] = null;
        this.param['upload_end'] = null;
      }
      this.param['searchTime'] = null;
      this.param['res_class_ids'] = null;
      this.param.pageNum = 1;
    }
    this.service.post('/api/busiz/res/getlist', this.param).then(success => {
      this.tableData = success.data.rows;
      this.param.total = success.data.total;
      this.param.pages = success.data.pages;
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
  //半选
  _refreshStatus() {
    const allChecked = this.tableData.every(value => value.disabled || value.checked);
    const allUnChecked = this.tableData.every(value => value.disabled || !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
  }
  //重置
  _resetForm() {
    this.paramCol.searchText = null;
    this.paramCol.searchTime = null;
    this.paramCol.res_class_ids = null;
    this.paramCol.res_cat_id = null;
    this.paramCol.res_type = null;
    this._reload(true);
  }
  //获取目录
  _getParentFile(row) {
    let arr = row.res_url.split('/');
    arr.pop();
    return arr.pop();
  }
  //删除
  _delRow(row) {
    this.service.post('/api/busiz/res/del', { ids: [row.res_id] }).then(success => {
      if (success.code == 0) {
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
    this.formBean['res_class_ids'] = [];
    if (row.cat_ids && row.cat_names) {
      let ids = row.cat_ids.split(',');
      let names = row.cat_names.split(',');
      for (let i = 0; i < ids.length; i++) {
        this.formBean['res_class_ids'].push({
          cat_id: ids[i],
          cat_name: names[i]
        });
      }
    }
    console.log(this.formBean)
  }
  _uploadDisabled: boolean = false;
  _loadingFile: any = null;
  //文件上传
  _uploadChange(res) {
    console.log(res.file.status)
    if (res.file.status == 'uploading') {
      if (!this._loadingFile) {
        this._loadingFile = this.service.message.loading('文件正在上传...', { nzDuration: 0 }).messageId;
        this._uploadDisabled = true;
      }
    }
    else {
      this.service.message.remove(this._loadingFile);
      this._uploadDisabled = false;
      if (res.file.status == 'done') {
        setTimeout(sc => {
          this.service.message.success('文件上传成功!');
          this._reload(true);
        }, 2000)
      }
      else {
        this.service.message.error('文件上传失败!');
      }
    }
  }
  //保存
  _saveRow() {
    if (!this.formBean.res_name) {
      this.service.message.warning('请填写文件名称!');
      return false;
    }
    if (!this.formBean.res_cat_id) {
      this.service.message.warning('请选择资源分类!');
      return false;
    }
    console.log(this.formBean)
    this.service.post('/api/busiz/res/update', this.formBean).then(success => {
      if (success.code == 0) {
        this.formBean = {
          res_id: null,
          res_name: null,
          res_cat_name: null
        };
        this._reload();
      }
      else {
        this.service.message.error(success.message);
      }
    })
  }
  //选项改变
  _selectChange(options) {
    let ids = [];
    let names = [];
    options.forEach(element => {
      ids.push(element.cat_id);
      names.push(element.cat_name);
    });
    if (names.length > 0) {
      this.formBean['res_cat_name'] = names[names.length - 1];
      this.formBean['res_cat_id'] = ids[ids.length - 1];
      this.formBean['cat_ids'] = ids.toString();
      this.formBean['cat_names'] = names.toString();
    }
    else {
      this.formBean['res_cat_name'] = null;
      this.formBean['res_cat_id'] = null;
      this.formBean['cat_ids'] = null;
      this.formBean['cat_names'] = null;
    }
  }
  //取消
  _cancelRow(row) {
    for (let i in this.formBean) {
      this.formBean[i] = null;
    }
  }
  isVisibleAudio: boolean = false;
  isVisibleVideo: boolean = false;
  isVisiblePdf: boolean = false;
  audioModel: any = null;
  videoModel: any = null;
  pdfModel: any = null;
  pdfMinNum: number = 1;
  //预览
  _fwRow(row) {
    console.log(row)
    if (row.res_type == '音频') {
      this.isVisibleAudio = true;
      this.audioModel = row;
    }
    else if (row.res_type == '视频') {
      this.isVisibleVideo = true;
      this.videoModel = row;
    }
    else {
      this.isVisiblePdf = true;
      this.pdfModel = row;
      this.pdfMinNum = 1;
    }
  }
  //关闭音频
  _handleCancelAudio(event?) {
    this.isVisibleAudio = false;
    this.audioModel = null;
    this.isVisibleVideo = false;
    this.videoModel = null;
    this.isVisiblePdf = false;
    this.pdfModel = null;
  }
  //上一页
  pdfMinNum1() {
    if (this.pdfMinNum > 1) {
      this.pdfMinNum -= 1;
    }
  }
  //上一页
  pdfMinNum2() {
    if (this.pdfMinNum < this.pdfModel.res_size) {
      this.pdfMinNum += 1;
    }
  }
}

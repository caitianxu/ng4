import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-cw-code-list',
  templateUrl: './cw-code-list.component.html',
  styleUrls: ['./cw-code-list.component.css']
})
export class CwCodeListComponent implements OnInit {
  paramCol: any = {
    searchText: null,
    tag_id: null
  }
  param: any = {
    pageNum: 1,
    pages: 0,
    pageSize: 16,
    total: 0
  }
  tagOptions: any = [];
  bookOptions: any = [];
  isVisible: boolean = false;
  tabs = [{
    active: true,
    name: '二维码列表',
    icon: 'anticon anticon-appstore'
  },
  {
    active: false,
    name: '二维码配置',
    icon: 'anticon anticon-qrcode'
  }];
  constructor(public service: AppService) { }

  ngOnInit() {
    this._reload();
    this.searchChange(null);
    this.searchChangeBook(null);
    this.myForm = this.service.fb.group({
      code_name: [null, [this.service.validators.required]],
      tag_ids: [null, [this.service.validators.required]],
      book_id: [null, [this.service.validators.required]],
      remark: [false]
    })
  }
  //页签切换
  _nzSelectedIndexChange(e?){
    if(e == 0){
    }
  }
  //标签搜索
  searchChange(key?) {
    this.service.post('/api/busiz/tag/list', {
      pageNum: 1,
      pageSize: 10,
      searchText: key
    }).then(success => {
      this.tagOptions = success.data.rows;
    })
  }
  //图书搜索
  searchChangeBook(key?) {
    this.service.post('/api/busiz/book/list', {
      pageNum: 1,
      pageSize: 10,
      searchText: key,
      book_type: 1
    }).then(success => {
      this.bookOptions = success.data.rows;
    })
  }
  formBean: any = {};
  myForm: any;
  _showIsVisible(data?) {
    if (data) {
      for (let i in data) {
        this.formBean[i] = data[i];
      }
      this.formBean['work'] = null;
      console.log(this.formBean)
    }
    this.isVisible = true;
  }
  handleCancel(e?) {
    this.isVisible = false;
    this.formBean = {};
  }
  //保存二维码
  handleOk(e?) {
    for (const i in this.myForm.controls) {
      this.myForm.controls[i].markAsDirty();
    }
    if (this.myForm.valid) {
      this.isVisible = false;
      if (typeof (this.formBean['tag_ids']) == "string")
        this.formBean['tag_ids'] = this.formBean['tag_ids'].split(',');
      console.log(this.formBean)
      this.formBean['publish'] = '崇文书局';
      this.service.post('/api/busiz/code/save', this.formBean).then(success => {
        if (success.code == 0) {
          this.formBean = {};
          this._reload();
        }
        else {
          this.service.message.error(success.message);
        }
      })
    }
  }
  tableData: any = [];
  //列表
  _reload(e?) {
    if (e) {
      for (let i in this.paramCol) {
        this.param[i] = this.paramCol[i];
      }
      this.param.pageNum = 1;
    }
    this.service.post('/api/busiz/code/list', this.param).then(success => {
      this.tableData = success.data.rows;
      this.param.total = success.data.total;
      this.param.pages = success.data.pages;
    })
  }
  //删除
  _delDataRow(row) {
    this.service.post('/api/busiz/code/del', {
      ids: [row.code_id]
    }).then(success => {
      if (success.code == 0) {
        this._reload();
      }
      else {
        this.service.message.error(success.message);
      }
    })
  }
  //配置的二维码对象
  formBeanObject: any;
  nzSelectedIndex: number = 0;
  //配置对象
  _settingBean(data?) {
    this.nzSelectedIndex = 1;
    this.formBeanObject = {};
    for (let i in data) {
      this.formBeanObject[i] = data[i];
    }
  }
  //作品列表
  workTableData: any = [];
  workClassData: any = [];
  workTagsData: any = [];
  workTypeData: any = ['问答', '试题', '资源包', '教育表格'];
  paramWork: any = {
    works_type: null,
    cat_id: null,
    tag_id: null,
    pageNum: 1,
    pageSize: 10,
    total: 0,
    pages: 0
  }
  isShowWorkAdd: boolean = false;
  _addWork() {
    this.isShowWorkAdd = true;
    this._workTagList();
    this.service.post('/api/busiz/works/cat/list', {}).then(success => {
      this.service._toisLeaf(success.data);
      this.workClassData = success.data;
    });
    this.searchWork();
  }
  workCancel(e?) {
    this.isShowWorkAdd = false;
  }
  _workTagList(e?) {
    this.service.post('/api/busiz/works/tag/list', {
      pageNum: 1,
      pageSize: 10,
      searchText: e
    }).then(success => {
      this.workTagsData = success.data.rows;
    })
  }
  searchWork(e?) {
    if (e) {
      if (this.paramWork.cat_ids && this.paramWork.cat_ids.length > 0) {
        this.paramWork.cat_id = this.paramWork.cat_ids[this.paramWork.cat_ids.length - 1];
      }
      this.paramWork.pageNum = 1;
    }
    console.log(this.paramWork)
    this.service.post('/api/busiz/works/list', this.paramWork).then(success => {
      this.workTableData = success.data.rows;
      this.paramWork.total = success.data.total;
      this.paramWork.pageNum = success.data.pageNum;
      this.paramWork.pages = success.data.pages;
    })
  }
  //二维码加作品
  addworkInfo(data) {
    this.service.post('/api/busiz/code/config', {
      code_id: this.formBeanObject.code_id,
      works_id: data.works_id
    }).then(success => {
      if (success.code == 0) {
        this.service.message.success(success.message);
        this._updateCodeInfo();
      }
      else {
        this.service.message.error(success.message);
      }
    })
  }
  //更新二维码详情
  _updateCodeInfo() {
    //更新详情
    this.service.post('/api/busiz/code/getcode', {
      code_id: this.formBeanObject.code_id
    }).then(success => {
      for (let i in success.data) {
        this.formBeanObject[i] = success.data[i];
      }
    })
  }
  //验证是否存在
  _viladateActionText(data) {
    let obj = this.formBeanObject.works.filter(value => value.works_id == data.works_id);
    return (obj && obj.length > 0) ? true : false;
  }
  //排序
  _workOrder(data, index) {
    let i = 0;
    if (index > 0) {
      i = index - 1;

      let obj = data;
      let old = this.formBeanObject.works[i];
      this.formBeanObject.works[i] = obj;
      this.formBeanObject.works[index] = old;
      for (let ii = 0; ii < this.formBeanObject.works.length; ii++) {
        this.service.post('/api/busiz/code/works/order', {
          code_id: this.formBean.code_id,
          works_id: this.formBeanObject.works[ii].works_id,
          order_weight: ii
        })
      }
    }
  }
  //删除
  _workDelete(data) {
    this.service.post('/api/busiz/code/rmworks', {
      code_id: this.formBeanObject.code_id,
      works_id: data.works_id
    }).then(success => {
      this._updateCodeInfo();
    })
  }
}

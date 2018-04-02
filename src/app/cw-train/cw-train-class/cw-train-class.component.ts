import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-cw-train-class',
  templateUrl: './cw-train-class.component.html',
  styleUrls: ['./cw-train-class.component.css']
})
export class CwTrainClassComponent implements OnInit {


  tableData: any = [];
  tableDataTree: any = [];
  editRow: any = {};
  param: any = {
    org_id: this.service.loginUserInfo ? this.service.loginUserInfo.org_id : null,
    org_name: this.service.loginUserInfo ? this.service.loginUserInfo.org_name : null
  }
  // 实例化一个对象
  constructor(public service: AppService) { }

  ngOnInit() {
    this.load();
  }
  load() {
    this._loading = true;
    this.service.post('/api/busiz/videoMenu/gettree', { org_id: this.param.org_id }).then(success => {
      this.tableData = [{
        org_id: this.service.loginUserInfo.org_id,
        menu_id: 0,
        menu_name:"视频分类",
        children: success.data
      }];
      this.service._toisLeaf(this.tableData);
      this._expanData();
      this._loading = false;
    })
  }
  expandDataCache = {};
  expandDataCacheCol = {};
  _expanData() {
    this.expandDataCacheCol = this.expandDataCache;
    this.expandDataCache = {};
    this.tableData.forEach(item => {
      this.expandDataCache[item.menu_id] = this.convertTreeToList(item);
    });
  }
  collapse(array, data, $event) {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.menu_id === d.menu_id);
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }
  convertTreeToList(root) {
    const stack = [], array = [], hashMap = {};
    stack.push({ ...root, level: 0, expand: true });
    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      const nodeCol = this.expandDataCacheCol[root.menu_id];
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          let expand = false;
          if (nodeCol) {
            let col = null;
            nodeCol.forEach(mm => {
              if (mm.menu_id == node.children[i].menu_id)
                col = mm;
            })
            if (col) {
              expand = col.expand;
            }
          }
          stack.push({ ...node.children[i], level: node.level + 1, expand: expand, parent: node });
        }
        //父级tree节点创建
        if (node.parent) {
          node.pname = [];
          if (node.parent.pname) {
            node.parent.pname.forEach(element => {
              node.pname.push({
                menu_id: element.menu_id,
                menu_name: element.menu_name
              });
            });
          }
          node.pname.push({
            menu_id: node.parent.menu_id,
            menu_name: node.parent.menu_name
          });
        }
      }
    }
    return array;
  }

  visitNode(node, hashMap, array) {
    if (!hashMap[node.menu_id]) {
      hashMap[node.menu_id] = true;
      array.push(node);
    }
  }

  //编辑
  _editRow(data) {
    console.log(data)
    for (let i in data) {
      this.editRow[i] = data[i];
    }
    data.disabled = true;
  }
  //取消编辑
  _cancel(data) {
    this.editRow = {};
    this.load();
  }
  _loading: boolean = false;
  //保存
  _saveRow() {
    if (!this.editRow.menu_name) {
      this.service.message.error('请填写组织名称');
      return false;
    }
    if (!this.editRow.pname) {
      this.service.message.error('请选择父级');
      return false;
    }
    else {
      let pid = this.editRow.pname[this.editRow.pname.length - 1];
      if (typeof (pid) == 'object') {
        pid = pid.menu_id;
      }
      this.editRow.pid = pid == 0 ? null : pid;
    }
    this._loading = true;
    this.editRow.parent = null;
    this.editRow.children = null;
    this.service.post('/api/busiz/videoMenu/save', this.editRow).then(success => {
      if (success.code == 0) {
        this.editRow = {};
        this.load();
      }
      else {
        this._loading = false;
        this.service.message.error(success.message);
      }
    })
  }
  //删除
  _delete(data) {
    this.service.post('/api/busiz/videoMenu/del', {
      mark: 'del',
      ids: [data.menu_id]
    }).then(success => {
      this.load();
    })
  }
  //新增同级
  _addAfter(parent: any) {
    this.editRow = {
      enabled: 1,
      remark: null,
      address: null,
      dept_code: null,
      dept_path: null,
      menu_id: null,
      org_id: parent.org_id,
      pname: parent.pname || [],
      menu_name: null,
      disabled: true,
      isLeaf: true
    }
    this.editRow.pname.push({ menu_id: parent.menu_id, menu_name: parent.menu_name })
    if (!parent.children) parent.children = [];
    parent.children.push(this.editRow)
    this._expanData();
  }
  //新增子级
  _addChildren(parent) {
    console.log(parent)
    parent.expand = true;
    this.editRow = {
      enabled: 1,
      remark: null,
      address: null,
      dept_code: null,
      dept_path: null,
      menu_id: null,
      org_id: parent.org_id,
      pname: parent.pname || [],
      menu_name: null,
      disabled: true,
      isLeaf: true
    }
    this.editRow.pname.push({ menu_id: parent.menu_id, menu_name: parent.menu_name })
    if (!parent.children) parent.children = [];
    parent.children.push(this.editRow);
    this._expanData();
  }

}

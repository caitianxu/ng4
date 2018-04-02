
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cw-goods-class',
  templateUrl: './cw-goods-class.component.html',
  styleUrls: ['./cw-goods-class.component.css']
})
export class CwGoodsClassComponent implements OnInit {

  data : any = [];
  _loading : boolean = false;
  expandDataCache = {};
  myForm: FormGroup;
  isVisibleMiddle: boolean = false;
  formTitle : string;
  selRow : any = {};

  constructor(public service: AppService) { }


  load(reset?){
    this._loading = true;
    this.service.post('/api/busiz/goods/cat/tree').then(success => {
      console.log(success)
      this._loading = false;
      if(success.code==0){
        this.data = [{
          cat_id: 0,
          cat_pid: 0,
          cat_name: '根节点',
          children: success.data
        }]
        this.data.forEach(item => {
          this.expandDataCache[ item.cat_id ] = this.convertTreeToList(item);
        });

      }else{
        this.data = [];
        this.service.message.error(success.message);
      }
    })
  
  }


  collapse(array, data, $event) {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.cat_id === d.cat_id);
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
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[ i ], level: node.level + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node, hashMap, array) {
    if (!hashMap[ node.cat_id ]) {
      hashMap[ node.cat_id ] = true;
      array.push(node);
    }
  }

  //关闭弹窗
  handleCancelMiddle($event) {
    this.isVisibleMiddle = false;
  
    this.myForm.reset();
  }

  //确定
  handleOkMiddle($event) {
    this._submitForm();
  }

  _submitForm(){
    let pid = this.selRow.parent[this.selRow.parent.length - 1];
    if(typeof(pid) == 'object'){
      this.selRow.cat_pid = parseInt(this.selRow.parent.cat_id);
    }else{
      this.selRow.cat_pid = parseInt(pid)
    }
    this.selRow.order_weight = parseInt(this.selRow.order_weight);
    console.log(this.selRow)
    if(!this.selRow.cat_name){
      this.service.message.error('请填写分类名称');
      return false;
    }
    if(!this.selRow.cat_pid){
      this.service.message.error('请选择父级分类');
      return false;
    }
    this.service.post('/api/busiz/goods/cat/save',this.selRow).then(success => {
        if(success.code==0){
          this.isVisibleMiddle = false;
          this.myForm.reset();
          this.load();
          this.service.message.success(success.message);
        }else{
          this.service.message.error(success.message);
        }
    })
  }

  ngOnInit() {
    this.myForm = this.service.fb.group({
      cat_name:false,
      order_weight:false,
      cat_pid:false,
      cat_remark:false
    })
    // 加载
    this.load();
    
  }

  // 新增
  add(){
    this.selRow = {};
    this.formTitle = "新增"
    this.isVisibleMiddle = true;
  }

  //修改
  edit(data){
    this.selRow = {};
    this.formTitle = "修改"
    this.isVisibleMiddle = true;
    for (let i in data) {
      this.selRow[i] = data[i]
    }
    console.log(this.selRow.parent.cat_id)
  }
  //删除
  del(data){
    this.service.post('/api/busiz/goods/cat/del',{ids:[data.cat_id]}).then(success => {
      if(success.code==0){
        this.load();
        this.service.message.success(success.message);
      }else{
        this.service.message.error(success.message);
      }
    })
  }

}

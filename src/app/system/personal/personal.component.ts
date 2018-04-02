import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  _loading: boolean = true;
  // 实例化一个对象
  constructor(public service: AppService, ) { }
  //表单
  myForm: FormGroup;
  myForm2: FormGroup;
  formBean: any = this.service.loginUserInfo
  formBean2: any = {
    old_pwd:null,
    new_pwd:null,
    confirm_new_pwd:null,
  }

  ngOnInit() {
    this.myForm = this.service.fb.group({
      user_name: [null, [this.service.validators.required]],
      user_real_name: false,
      email: false,
      phone: false,
    })
    this.myForm2 = this.service.fb.group({
      old_pwd: [null, [this.service.validators.required]],
      new_pwd: [null, [this.service.validators.required]],
      confirm_new_pwd: [null, [this.service.validators.required, this.confirmationValidator]],
    })
    console.log(this.formBean)
  }
  getFormControl(name) {
    return this.myForm2.controls[name];
  }
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.myForm2.controls['new_pwd'].value) {
      return { confirm: true, error: true };
    }
  };
  //提交
  _submitForm() {
    for (const i in this.myForm.controls) {
      this.myForm.controls[i].markAsDirty();
    }
    if (this.myForm.valid) {
      this.formBean.user_pwd = "123456";
      this.service.post("/api/system/user/save", this.formBean).then(success => {
        if (success.code == 0) {
          this.service.loginUserInfo = success.data
        }
        else {
          this.service.message.error(success.message);
        }
      })
    }
  }
  //提交
  _submitForm2() {
    for (const i in this.myForm.controls) {
      this.myForm2.controls[i].markAsDirty();
    }
    if (this.myForm.valid) {
      this.formBean.user_pwd = "123456";
      this.service.post("/api/system/user/save", this.formBean).then(success => {
        if (success.code == 0) {
          this.service.loginUserInfo = success.data
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
  isVisibleMiddle2: boolean = false;
  formTitle: string;
  //打开
  showModalMiddle(bean?: any) {
    console.log(bean)
    if (bean && bean === 'pwd') {
      this.isVisibleMiddle2 = true;
    } else {
      this.isVisibleMiddle = true;
    }
  }
  //关闭
  handleCancelMiddle($event) {
    this.isVisibleMiddle = false;
    this.isVisibleMiddle2 = false;
  }
  //确定
  handleOkMiddle($event) {
    this._submitForm();
  }
  //确定
  handleOkMiddle2($event) {
    this._submitForm2();
  }
  updateConfirmValidator() {
    setTimeout(_ => {
      this.myForm2.controls['confirm_new_pwd'].updateValueAndValidity();
    });
  }
}

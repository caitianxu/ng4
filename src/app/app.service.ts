import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
//表单 绑定规则、控件组、响应式表单验证（驱动式表单验证）
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
//消息提示
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
declare let window: any;
declare let Date: any;
@Injectable()
export class AppService {
    ctxPath: string; //服务器地址
    token: string; //用户登录标识
    loginUserInfo: any; //用户登录信息
    loginUserMenus: any; //用户菜单
    public validators: any = Validators;
    public formGroup: any = FormGroup;
    public formControl: any = FormControl;
    public menuItemArray: any = [];
    public menuActionArray: any = [];
    private status = {
        "status.400": "错误的请求。由于语法错误，该请求无法完成。",
        "status.401": "未经授权。服务器拒绝响应。",
        "status.403": "已禁止。服务器拒绝响应。",
        "status.404": "未找到。无法找到请求的位置。",
        "status.405": "方法不被允许。使用该位置不支持的请求方法进行了请求。",
        "status.406": "不可接受。服务器只生成客户端不接受的响应。",
        "status.407": "需要代理身份验证。客户端必须先使用代理对自身进行身份验证。",
        "status.408": "请求超时。等待请求的服务器超时。",
        "status.409": "冲突。由于请求中的冲突，无法完成该请求。",
        "status.410": "过期。请求页不再可用。",
        "status.411": "长度必需。未定义“内容长度”。",
        "status.412": "前提条件不满足。请求中给定的前提条件由服务器评估为 false。",
        "status.413": "请求实体太大。服务器不会接受请求，因为请求实体太大。",
        "status.414": "请求 URI 太长。服务器不会接受该请求，因为 URL 太长。",
        "status.415": "不支持的媒体类型。服务器不会接受该请求，因为媒体类型不受支持。",
        "status.416": "HTTP 状态代码 {0}",
        "status.500": "内部服务器错误。",
        "status.501": "未实现。服务器不识别该请求方法，或者服务器没有能力完成请求。",
        "status.503": "服务不可用。服务器当前不可用(过载或故障)。",
        "status.600": "token失效，请重新登录。"
    };
    constructor(private http: Http, public router: Router, public routerInfo: ActivatedRoute,
        public message: NzMessageService, public confirm: NzModalService,
        public fb: FormBuilder) {
        this.ctxPath = 'http://cw.cjszyun.net';
        // this.ctxPath = 'http://192.168.2.30:8080';
        // this.ctxPath = 'http://192.168.2.41:8080';
    }
    //系统初始化
    init(callback?: any) {
        let token = localStorage.getItem('token');
        let userInfo = localStorage.getItem('userInfo');
        let menus = localStorage.getItem('userMenus');
        if (token && userInfo && token != '' && userInfo != '' && menus && menus != '') {
            this.token = token;
            this.loginUserInfo = JSON.parse(userInfo);
            this.loginUserMenus = JSON.parse(menus);
            this.parsonMenu(this.loginUserMenus);
            if (callback) {
                callback();
            }
        }
        else if (token && token != '') {
            localStorage.setItem('token', token);
            this.post('/api/system/login', {
                token: token
            }).then(success => {
                this.loginTo(success, callback);
            })
        }
    }
    //用户成功登录
    loginTo(success: any, callback?: any) {
        if (success.code == 0) {
            this.token = success.data.token;
            this.loginUserInfo = success.data;
            localStorage.setItem('userInfo', JSON.stringify(success.data));
            localStorage.setItem('token', success.data.token);
            this.post('/api/system/resource/menus').then(res => {
                if (res.code == 0) {
                    localStorage.setItem('userMenus', JSON.stringify(res.data));
                    this.loginUserMenus = res.data;
                    this.parsonMenu(this.loginUserMenus);
                }
                if (callback) {
                    callback();
                }
            })
        }
        else {
            if (callback) {
                callback();
            }
        }
    }
    //解析菜单元素
    parsonMenu(array) {
        array.forEach(element => {
            if (element.res_type == 1) {
                if (element.res_key != "") {
                    this.menuItemArray.push({
                        res_key: element.res_key,
                        res_url: element.res_url
                    });
                }
                if (element.children) {
                    this.parsonMenu(element.children);
                }
            }
            else if (element.res_type == 2) {
                this.menuActionArray.push({
                    res_key: element.res_key,
                    res_url: element.res_url
                });
            }
        });
    }
    //验证是否具有菜单权限
    validataMenu(key): boolean {
        let v = this.menuItemArray.filter(element => element.res_key == key);
        return v && v.length > 0;
    }
    //验证是否具有功能权限
    validataAction(key): boolean {
        let v = this.menuActionArray.filter(element => element.res_key == key);
        return v && v.length > 0;
    }
    //注销
    sessionOut() {
        this.token = null;
        this.loginUserInfo = null;
        this.loginUserMenus = null;
        localStorage.clear();
    }
    //post请求
    post(url: string, body?: any): Promise<any> {
        body = body ? body : { token: this.token };
        url = url.indexOf('http://') == -1 && url.indexOf('https://') == -1 ? this.ctxPath + url : url;
        let pos = this.http.post(url, body).toPromise();
        //异常就 设置为没有网络
        pos.catch(error => {
            this.message.error('【' + error.status + '】 ' + this.status['status.' + error.status], { nzDuration: 5000 });
        })
        pos.then(res => {
            if (res['code'] == 600) {
                this.sessionOut();
            }
        })
        return pos;
    }
    //get请求
    get(url: string, body?: any): Promise<any> {
        body = body ? body : { token: this.token };
        url = url.indexOf('http://') == -1 && url.indexOf('https://') == -1 ? this.ctxPath + url : url;
        let get = this.http.get(url, body).toPromise();
        //异常就 设置为没有网络
        get.catch(error => {
            this.message.error('【' + error.status + '】 ' + this.status['status.' + error.status], { nzDuration: 5000 });
        })
        get.then(res => {
            if (res['code'] == 600) {
                this.sessionOut();
            }
        })
        return get;
    }
    //isLeaf转换
    _toisLeaf(root) {
        root.forEach(element => {
            if (element.children && element.children.length > 0) {
                element.isLeaf = false;
                this._toisLeaf(element.children);
            }
            else {
                element.isLeaf = true;
            }
        });
    }
    //日期格式转换
    dateFormat (obj, format) {
        var date = {
            "M+": obj.getMonth() + 1,
            "d+": obj.getDate(),
            "h+": obj.getHours(),
            "m+": obj.getMinutes(),
            "s+": obj.getSeconds(),
            "q+": Math.floor((obj.getMonth() + 3) / 3),
            "S+": obj.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (obj.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    }
}

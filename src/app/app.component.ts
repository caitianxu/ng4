import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //路由列表
  menuList: Array<{ title: string, module: string, power: string, select: boolean }> = [];
  activeMenu: any;//当前页面
  showLeftMenu: boolean = false; //显示左侧菜单
  fiterMenu: any = ['login','personal','error', 'home']; //需要过滤权限的模块
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title, public service: AppService) {
    //检测当前是否登录
    this.service.init(() => {
      if (this.service.loginUserMenus && this.service.loginUserMenus.length > 0 && !window.location.hash) {
        this.router.navigate(['/home']);
      }
      else if (window.location.hash.indexOf('#/home') == -1) {
        this.menuList.push({
          module: "home",
          power: "SHOW",
          select: false,
          title: "首页"
        })
      }
    });
    //路由事件
    this.router.events.filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => {
        //路由data的标题
        if (!event['title']) {
          event = { title: '首页', module: 'home', power: "SHOW" };
        }
        let title = event['title'];
        this.menuList.forEach(p => p.select = false);
        var menu = { title: title, module: event['module'], power: event['power'], select: true };
        this.titleService.setTitle(title);
        let exitMenu = this.menuList.find(info => info.title == title);
        this.activeMenu = menu;
        console.log(menu)
        if (menu.module != 'login' && (!this.service.token || this.service.token == '')) {
          this.router.navigate(['/login']);
          this.menuList = [];
        }
        else if (menu.module == 'login') {
          this.service.token = null;
          this.service.loginUserInfo = null;
          this.service.loginUserMenus = null;
          localStorage.clear();
        }
        else if (this.fiterMenu.filter(el => el == menu.module).length == 0 && !this.service.validataMenu(menu.module)) {
          this.router.navigate(['/error']);
        }
        else {
          //菜单选中
          if (menu.module && menu.module != 'login' && menu.module != 'home') {
            this.service.loginUserMenus.forEach(one => {
              one.children.forEach(two => {
                if (two.res_key == menu.module) {
                  this.openTwoMenu(two, true);
                }
                else {
                  two.children.forEach(element => {
                    if (element.res_key == menu.module) {
                      this.openTwoMenu(element, true);
                    }
                  });
                }
              })
            })
          }
          if (exitMenu || menu.module == 'login') {//如果存在不添加，当前表示选中  登录页面不存储
            this.menuList.forEach(p => p.select = p.title == title);
            return;
          }
          this.menuList.push(menu);
        }
      });
  }
  //是否需要显示X
  isMain(module) {
    if (module == '' || !module || module == 'home')
      return false;
    else
      return true;
  }
  //关闭选项标签
  closeUrl(module: string, select: boolean) {
    //当前关闭的是第几个路由
    let index = this.menuList.findIndex(p => p.module == module);
    //如果只有一个不可以关闭
    if (this.menuList.length == 1) return;

    this.menuList = this.menuList.filter(p => p.module != module);
    //删除复用
    if (!select) return;
    //显示上一个选中
    let menu = this.menuList[index - 1];
    if (!menu) {//如果上一个没有下一个选中
      menu = this.menuList[index + 1];
    }
    this.menuList.forEach(p => p.select = p.module == menu.module);
    //显示当前路由信息
    this.router.navigate(['/' + menu.module]);
  }
  //处理一级菜单
  openTwoMenu(item: any, rt?: boolean) {
    this.service.loginUserMenus.forEach(one => {
      one.select = false;
      one.children.forEach(two => {
        if (two.res_id == item.res_id) {
          one.select = rt ? rt : !one.select;
        }
        else {
          two.select = false;
          two.children.forEach(element => {
            if (element.res_id == item.res_id) {
              one.select = true;
              two.select = true;
            }
          });
        }
      })
    })
  }
  //控制菜单缩进
  isCollapsed = false;
  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
  //注销
  loginOut() {
    this.service.confirm.confirm({
      title: '系统提示',
      content: '你确定要注销用户信息并退出系统吗?',
      okText: '确定',
      cancelText: '取消',
      maskClosable: false,
      onOk: () => {
        this.sessionOut();
      }
    });
  }
  //监控菜单点击
  menuOpenChange(event, arr, node) {
    arr.forEach(element => {
      if (element != node)
        element.select = false;
    });
  }
  ngDoCheck() {
    if (!this.service.token && !this.service.loginUserInfo && this.activeMenu && this.activeMenu.module && this.activeMenu.module != 'login') {
      this.sessionOut();
    }
  }
  sessionOut() {
    this.service.post('/api/system/logout');
    this.service.token = null;
    this.service.loginUserInfo = null;
    this.service.loginUserMenus = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  //判断子级是否菜单
  getChildrenType(data) {
    let bool = true
    data.children.forEach(element => {
      if (element.res_type == 2) {
        bool = false;
      }
    })
    return bool
  }

  //获取用户头像
  getUserHead(){
    console.log(this.service.loginUserInfo.icon)
    return '<img src="/assets/img/footer-logo.png" class="head-uName-img">';
  }
}

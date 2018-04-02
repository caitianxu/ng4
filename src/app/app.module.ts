import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//hash url
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
//form组建
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//页面动画
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//http
import { HttpClientModule } from '@angular/common/http';
//web ui
import { NgZorroAntdModule} from 'ng-zorro-antd';
//基础组建
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
//路由
import { routes } from './app.routing';
//公共服务
import { Http, HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { AppService } from './app.service';
import { HttpService } from './http.service';


export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions) {
  let service = new HttpService(xhrBackend, requestOptions);
  return service;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot()
  ],
  providers: [
    HttpService, AppService,
    { provide: Http, useFactory: interceptorFactory, deps: [XHRBackend, RequestOptions]},
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

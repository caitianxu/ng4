import { Injectable } from '@angular/core';
import { Http, Request, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
declare let returnCitySN: any;
@Injectable()
export class HttpService extends Http {  
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    //根据不同的生产环境配置http前缀
    typeof url == 'string' ? url : url.url;
    return this.intercept(super.request(url, options));
  }
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url, options)).map(res => res.json());
  }
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options))).map(res => res.json());
  }
  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
  }
  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, this.getRequestOptionArgs(options)));
  }
  getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    options = options == null ? new RequestOptions() : options;
    options.headers = options.headers == null ? new Headers() : options.headers;
    let token = localStorage.getItem('token');
    options.headers.append('Content-Type', 'text/plain;charset=UTF-8');
    options.headers.set('token', token);
    if(returnCitySN){
      options.headers.set('IP', returnCitySN['cip']);
      options.headers.set('Address', encodeURI(returnCitySN['cname']));
    }
    return options;
  }
  intercept(observable: Observable<Response>): Observable<Response> {
    return observable.catch((err, source) => {
      return Observable.throw(err);
    });
  }

}
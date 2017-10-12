import {XHRBackend, Http, RequestOptions} from '@angular/http';
import {InterceptedHttp} from './http.interceptor';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router, toastrService: ToastrService): Http {
  return new InterceptedHttp(xhrBackend, requestOptions, router, toastrService);
}

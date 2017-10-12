import {Injectable} from '@angular/core';
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class InterceptedHttp extends Http {

  lastUnauthorizedResponseTime: number;

  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private router: Router,
    private toastrService: ToastrService) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, options));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url, options));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(url, body, options));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(url, options));
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.patch(url, body, options));
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.head(url, options));
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.options(url, options));
  }

  private intercept(response: Observable<Response>): Observable<Response> {

    response.do(
      resp => {},
      error => {

        if (error.status === 401) {
          // Unauthorized

          const now = new Date().getTime();

          if (!this.lastUnauthorizedResponseTime || (now - this.lastUnauthorizedResponseTime) > 5000) {

            this.router.navigateByUrl('/login');
            this.toastrService.warning('Your session has expired. Please login again');
            this.lastUnauthorizedResponseTime = now;

          }

        }

      }
    );

    return response;
  }
}

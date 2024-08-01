import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { req } from '../interfaces/req-map';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  request<T = any>(
    reqParams: req,
    body: any = '',
    urlParam: string = '',
    urlQuery: string = ''
  ): Observable<T> {
    let reqUrl = this.url + reqParams.url;

    reqUrl = reqUrl.replace(':param', urlParam) + urlQuery;

    switch (reqParams.method) {
      case 'POST':
        return this.postHttp<T>(reqUrl, body);
      case 'GET':
        return this.getHttp<T>(reqUrl);
      case 'DELETE':
        return this.deleteHttp<T>(reqUrl, body);
      case 'PUT':
        return this.putHttp<T>(reqUrl, body);
      default:
        return this.getHttp<T>(reqUrl);
    }
  }

  private postHttp<T>(url: string, data: any) {
    return this.http.post<T>(url, data);
  }

  private getHttp<T>(url: string) {
    return this.http.get<T>(url);
  }

  private putHttp<T>(url: string, data: Record<string, any>) {
    return this.http.put<T>(url, data);
  }

  private deleteHttp<T>(url: string, data?: Record<string, any>) {
    return this.http.delete<T>(url, { body: data });
  }
}

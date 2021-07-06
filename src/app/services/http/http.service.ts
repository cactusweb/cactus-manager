import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Drop } from 'src/app/interfaces/drop';
import { License } from 'src/app/interfaces/license';
import { Owner } from 'src/app/interfaces/owner';
import { Plan } from 'src/app/interfaces/plan';
import { environment } from 'src/environments/environment';
import { req } from 'src/app/const'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = environment.apiUrl;
  headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) { }

  setHeaders() {
    let token = localStorage.getItem('accessToken');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }


  request( reqParams: req, body: any = '', urlParam: string = '', urlQuery: string = '' ): Observable<any>{
    let reqUrl = this.url + reqParams.url;

    reqUrl = reqUrl.replace( ':param', urlParam ) + urlQuery;

    switch ( reqParams.method ){
      case "POST": return this.postHttp( reqUrl, body );
      case "GET": return this.getHttp( reqUrl );
      case "DELETE": return this.deleteHttp( reqUrl );
      case "PUT": return this.putHttp( reqUrl, body );
      default: return this.getHttp( reqUrl )
    }
  }

  private postHttp( url: string, data: Record< string, any > ){
    return this.http.post( url, data );
  }

  private getHttp( url: string ){
    return this.http.get( url );
  }

  private putHttp( url: string, data: Record< string, any > ){
    return this.http.put( url, data );
  }

  private deleteHttp( url: string, data?: Record< string, any > ){
    return this.http.delete( url );
  }











}

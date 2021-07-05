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




  //license fetching
  async postNewLicense(data: License) {
    this.setHeaders();
    return await this.http.post(`${this.url}/license`, data, { headers: this.headers }).toPromise();
  }

  async getLicenses() {
    this.setHeaders();
    return await this.http.get(`${this.url}/license`, { headers: this.headers }).toPromise();
  }

  async deleteLicense(id: string) {
    this.setHeaders();
    return await this.http.delete(`${this.url}/license/${id}`, { headers: this.headers }).toPromise();
  }

  async putLicense(data: License) {
    this.setHeaders();
    return await this.http.put(`${this.url}/license/${data.id}`, data, { headers: this.headers }).toPromise();
  }

  async renewLicense( id: string ){
    this.setHeaders();
    return await this.http.get( `${this.url}/license/${id}/renew`, { headers: this.headers } ).toPromise()
  }





  // owner profile
  async getSelf() {
    this.setHeaders();
    return await this.http.get(`${this.url}/@me`, { headers: this.headers }).toPromise();
  }

  async putSelf(data: Owner) {
    this.setHeaders();
    return await this.http.put(`${this.url}`, data, { headers: this.headers }).toPromise();
  }






  //files
  async postFile(formData: FormData, dirname: String) {
    this.setHeaders();
    return await this.http.post(`${this.url}/upload/${dirname}`, formData, { headers: this.headers }).toPromise();
  }








  // drops fetching
  async postDrop(data: Drop) {
    this.setHeaders();
    return await this.http.post(`${this.url}/drop`, data, { headers: this.headers }).toPromise();
  }

  async getDrops() {
    this.setHeaders();
    return await this.http.get(`${this.url}/drop`, { headers: this.headers }).toPromise();
  }

  async deleteDrop(id: string) {
    this.setHeaders();
    return await this.http.delete(`${this.url}/drop/${id}`, { headers: this.headers }).toPromise();
  }

  async stopDrop(id: string) {
    this.setHeaders();
    return await this.http.get(`${this.url}/drop/${id}/stop`, { headers: this.headers }).toPromise();
  }





  // plans fetching
  async getPlans() {
    this.setHeaders();
    return await this.http.get(`${this.url}/plan`, { headers: this.headers }).toPromise();
  }

  async deletePlan(id: string) {
    this.setHeaders();
    return await this.http.delete(`${this.url}/plan/${id}`, { headers: this.headers }).toPromise();
  }

  async postPlan(data: Plan) {
    this.setHeaders();
    return await this.http.post(`${this.url}/plan`, data, { headers: this.headers }).toPromise();
  }



  async getLogs() {
    this.setHeaders();
    return await this.http.get(`${this.url}/log`, { headers: this.headers }).toPromise();
  }

}
